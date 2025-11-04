# LMS Project - Phase 12: Collaboration & Community Features
**Date:** March 2026 (Planned)  
**Branch:** feature/collaboration  
**Status:** 📋 Planned  
**Prerequisites:** Phases 1-11 completed

---

## 📋 Phase Overview

This phase will transform the LMS into a comprehensive collaborative learning platform by implementing real-time communication features, community tools, and social learning capabilities. Students and teachers will be able to interact, collaborate on projects, and build a vibrant learning community.

## 🎯 Objectives
- Implement real-time messaging and video conferencing
- Create collaborative workspaces and project management
- Build community features (forums, groups, events)
- Add social learning elements (peer review, study groups)
- Develop live streaming capabilities for lectures
- Create mentorship and networking features
- Enable collaborative content creation

---

## 🔧 Technical Implementation Plan

### **1. Real-Time Communication Architecture**

#### **WebSocket Server Setup**
```typescript
// lib/websocket/server.ts
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

interface AuthenticatedWebSocket extends WebSocket {
  userId: string;
  user: any;
}

export class LMSWebSocketServer {
  private wss: WebSocketServer;
  private connections: Map<string, AuthenticatedWebSocket> = new Map();
  private rooms: Map<string, Set<string>> = new Map();

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });
    this.setupConnectionHandling();
  }

  private setupConnectionHandling() {
    this.wss.on('connection', async (ws: WebSocket, request) => {
      try {
        // Authenticate connection
        const token = this.extractTokenFromRequest(request);
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
        
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
          },
        });

        if (!user) {
          ws.close(1008, 'User not found');
          return;
        }

        const authenticatedWs = ws as AuthenticatedWebSocket;
        authenticatedWs.userId = user.id;
        authenticatedWs.user = user;

        this.connections.set(user.id, authenticatedWs);

        // Set up message handling
        authenticatedWs.on('message', (data) => {
          this.handleMessage(authenticatedWs, data);
        });

        authenticatedWs.on('close', () => {
          this.handleDisconnection(authenticatedWs);
        });

        // Send connection confirmation
        this.sendToUser(user.id, {
          type: 'CONNECTED',
          data: { user },
        });

      } catch (error) {
        console.error('WebSocket authentication failed:', error);
        ws.close(1008, 'Authentication failed');
      }
    });
  }

  private extractTokenFromRequest(request: any): string {
    const url = new URL(request.url, 'http://localhost');
    return url.searchParams.get('token') || '';
  }

  private handleMessage(ws: AuthenticatedWebSocket, data: any) {
    try {
      const message = JSON.parse(data.toString());
      
      switch (message.type) {
        case 'JOIN_ROOM':
          this.joinRoom(ws.userId, message.roomId);
          break;
        case 'LEAVE_ROOM':
          this.leaveRoom(ws.userId, message.roomId);
          break;
        case 'SEND_MESSAGE':
          this.handleChatMessage(ws, message);
          break;
        case 'VIDEO_CALL_OFFER':
          this.handleVideoCallOffer(ws, message);
          break;
        case 'VIDEO_CALL_ANSWER':
          this.handleVideoCallAnswer(ws, message);
          break;
        case 'ICE_CANDIDATE':
          this.handleIceCandidate(ws, message);
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  }

  private joinRoom(userId: string, roomId: string) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    
    this.rooms.get(roomId)!.add(userId);
    
    // Notify others in the room
    this.broadcastToRoom(roomId, {
      type: 'USER_JOINED',
      data: { userId, roomId },
    }, userId);
  }

  private leaveRoom(userId: string, roomId: string) {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId)!.delete(userId);
      
      // Notify others in the room
      this.broadcastToRoom(roomId, {
        type: 'USER_LEFT',
        data: { userId, roomId },
      }, userId);
    }
  }

  private async handleChatMessage(ws: AuthenticatedWebSocket, message: any) {
    const { roomId, content, messageType = 'TEXT' } = message.data;

    // Save message to database
    const savedMessage = await prisma.message.create({
      data: {
        content,
        type: messageType,
        senderId: ws.userId,
        roomId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Broadcast to room members
    this.broadcastToRoom(roomId, {
      type: 'NEW_MESSAGE',
      data: savedMessage,
    });
  }

  private handleVideoCallOffer(ws: AuthenticatedWebSocket, message: any) {
    const { targetUserId, offer, callId } = message.data;
    
    this.sendToUser(targetUserId, {
      type: 'VIDEO_CALL_OFFER',
      data: {
        callerId: ws.userId,
        caller: ws.user,
        offer,
        callId,
      },
    });
  }

  private handleVideoCallAnswer(ws: AuthenticatedWebSocket, message: any) {
    const { callerId, answer, callId } = message.data;
    
    this.sendToUser(callerId, {
      type: 'VIDEO_CALL_ANSWER',
      data: {
        answerer: ws.user,
        answer,
        callId,
      },
    });
  }

  private handleIceCandidate(ws: AuthenticatedWebSocket, message: any) {
    const { targetUserId, candidate, callId } = message.data;
    
    this.sendToUser(targetUserId, {
      type: 'ICE_CANDIDATE',
      data: {
        senderId: ws.userId,
        candidate,
        callId,
      },
    });
  }

  public sendToUser(userId: string, message: any) {
    const connection = this.connections.get(userId);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }

  public broadcastToRoom(roomId: string, message: any, excludeUserId?: string) {
    const roomUsers = this.rooms.get(roomId);
    if (roomUsers) {
      roomUsers.forEach(userId => {
        if (userId !== excludeUserId) {
          this.sendToUser(userId, message);
        }
      });
    }
  }

  private handleDisconnection(ws: AuthenticatedWebSocket) {
    this.connections.delete(ws.userId);
    
    // Remove from all rooms
    this.rooms.forEach((users, roomId) => {
      if (users.has(ws.userId)) {
        users.delete(ws.userId);
        this.broadcastToRoom(roomId, {
          type: 'USER_DISCONNECTED',
          data: { userId: ws.userId, roomId },
        });
      }
    });
  }
}
```

#### **WebRTC Video Conferencing**
```tsx
// components/collaboration/VideoCall.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

interface VideoCallProps {
  callId: string;
  participants: string[];
  isInitiator: boolean;
}

export const VideoCall: React.FC<VideoCallProps> = ({
  callId,
  participants,
  isInitiator,
}) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection>();
  const localStream = useRef<MediaStream>();
  
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    initializeWebRTC();
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (lastMessage) {
      handleWebSocketMessage(lastMessage);
    }
  }, [lastMessage]);

  const initializeWebRTC = async () => {
    try {
      // Initialize peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:your-turn-server.com:3478',
            username: 'your-username',
            credential: 'your-password',
          },
        ],
      });

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendMessage({
            type: 'ICE_CANDIDATE',
            data: {
              targetUserId: participants[0], // Simplified for 1-on-1 calls
              candidate: event.candidate,
              callId,
            },
          });
        }
      };

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Get user media
      const stream = await getUserMedia();
      localStream.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Add tracks to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.current?.addTrack(track, stream);
      });

      // If initiator, create offer
      if (isInitiator) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        
        sendMessage({
          type: 'VIDEO_CALL_OFFER',
          data: {
            targetUserId: participants[0],
            offer,
            callId,
          },
        });
      }
    } catch (error) {
      console.error('Error initializing WebRTC:', error);
    }
  };

  const getUserMedia = async (): Promise<MediaStream> => {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 30 },
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  };

  const handleWebSocketMessage = async (message: any) => {
    const { type, data } = message;

    switch (type) {
      case 'VIDEO_CALL_OFFER':
        await handleOffer(data.offer);
        break;
      case 'VIDEO_CALL_ANSWER':
        await handleAnswer(data.answer);
        break;
      case 'ICE_CANDIDATE':
        await handleIceCandidate(data.candidate);
        break;
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) return;

    await peerConnection.current.setRemoteDescription(offer);
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    sendMessage({
      type: 'VIDEO_CALL_ANSWER',
      data: {
        callerId: participants[0],
        answer,
        callId,
      },
    });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) return;
    await peerConnection.current.setRemoteDescription(answer);
  };

  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnection.current) return;
    await peerConnection.current.addIceCandidate(candidate);
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // Replace video track
      const videoTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection.current?.getSenders().find(s =>
        s.track?.kind === 'video'
      );

      if (sender) {
        await sender.replaceTrack(videoTrack);
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setIsScreenSharing(true);

      // Handle screen share end
      videoTrack.onended = async () => {
        await stopScreenShare();
      };
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopScreenShare = async () => {
    try {
      // Get camera stream again
      const cameraStream = await getUserMedia();
      const videoTrack = cameraStream.getVideoTracks()[0];
      
      const sender = peerConnection.current?.getSenders().find(s =>
        s.track?.kind === 'video'
      );

      if (sender) {
        await sender.replaceTrack(videoTrack);
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = cameraStream;
      }

      localStream.current = cameraStream;
      setIsScreenSharing(false);
    } catch (error) {
      console.error('Error stopping screen share:', error);
    }
  };

  const endCall = () => {
    cleanup();
    // Navigate back or close call interface
  };

  const cleanup = () => {
    localStream.current?.getTracks().forEach(track => track.stop());
    peerConnection.current?.close();
  };

  return (
    <div className="video-call-container">
      <div className="video-grid">
        <div className="video-wrapper local">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="video-element"
          />
          <div className="video-label">You</div>
        </div>
        
        <div className="video-wrapper remote">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="video-element"
          />
          <div className="video-label">Participant</div>
        </div>
      </div>

      <div className="call-controls">
        <button
          onClick={toggleVideo}
          className={`control-btn ${!isVideoEnabled ? 'disabled' : ''}`}
        >
          {isVideoEnabled ? '📹' : '📹❌'}
        </button>
        
        <button
          onClick={toggleAudio}
          className={`control-btn ${!isAudioEnabled ? 'disabled' : ''}`}
        >
          {isAudioEnabled ? '🎤' : '🎤❌'}
        </button>
        
        <button
          onClick={isScreenSharing ? stopScreenShare : startScreenShare}
          className="control-btn"
        >
          {isScreenSharing ? '🖥️❌' : '🖥️'}
        </button>
        
        <button onClick={endCall} className="control-btn end-call">
          📞❌
        </button>
      </div>
    </div>
  );
};
```

### **2. Collaborative Workspaces**

#### **Project Management System**
```tsx
// components/collaboration/ProjectWorkspace.tsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useWebSocket } from '@/hooks/useWebSocket';

interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  tags: string[];
  comments: Comment[];
  attachments: Attachment[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  members: ProjectMember[];
  tasks: Task[];
  courseId: string;
}

export const ProjectWorkspace: React.FC<{ projectId: string }> = ({
  projectId,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    loadProject();
    joinProjectRoom();
  }, [projectId]);

  useEffect(() => {
    if (lastMessage) {
      handleRealtimeUpdate(lastMessage);
    }
  }, [lastMessage]);

  const loadProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const projectData = await response.json();
      setProject(projectData);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const joinProjectRoom = () => {
    sendMessage({
      type: 'JOIN_ROOM',
      roomId: `project-${projectId}`,
    });
  };

  const handleRealtimeUpdate = (message: any) => {
    const { type, data } = message;

    switch (type) {
      case 'TASK_CREATED':
        setProject(prev => prev ? {
          ...prev,
          tasks: [...prev.tasks, data.task],
        } : null);
        break;
      case 'TASK_UPDATED':
        setProject(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === data.task.id ? data.task : task
          ),
        } : null);
        break;
      case 'TASK_MOVED':
        setProject(prev => prev ? {
          ...prev,
          tasks: prev.tasks.map(task =>
            task.id === data.taskId
              ? { ...task, status: data.newStatus }
              : task
          ),
        } : null);
        break;
    }
  };

  const createTask = async () => {
    if (!newTaskTitle.trim() || !project) return;

    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          status: 'TODO',
          priority: 'MEDIUM',
        }),
      });

      const newTask = await response.json();
      
      // Send realtime update
      sendMessage({
        type: 'SEND_MESSAGE',
        data: {
          roomId: `project-${projectId}`,
          content: JSON.stringify({
            type: 'TASK_CREATED',
            task: newTask,
          }),
          messageType: 'SYSTEM',
        },
      });

      setNewTaskTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      // Send realtime update
      sendMessage({
        type: 'SEND_MESSAGE',
        data: {
          roomId: `project-${projectId}`,
          content: JSON.stringify({
            type: 'TASK_MOVED',
            taskId,
            newStatus,
          }),
          messageType: 'SYSTEM',
        },
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination || !project) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    
    updateTaskStatus(draggableId, newStatus);
  };

  const getTasksByStatus = (status: string) => {
    return project?.tasks.filter(task => task.status === status) || [];
  };

  const renderTaskCard = (task: Task, index: number) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          onClick={() => setSelectedTask(task)}
        >
          <div className="task-header">
            <h4 className="task-title">{task.title}</h4>
            <span className={`priority-badge ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-footer">
            <div className="task-assignee">
              {/* Show assignee avatar */}
            </div>
            <div className="task-due-date">
              {task.dueDate && new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
          
          {task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  const renderColumn = (title: string, status: string) => (
    <div className="kanban-column">
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">
          {getTasksByStatus(status).length}
        </span>
      </div>
      
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          >
            {getTasksByStatus(status).map((task, index) =>
              renderTaskCard(task, index)
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  if (isLoading) {
    return <div className="loading-spinner">Loading project...</div>;
  }

  if (!project) {
    return <div className="error-message">Project not found</div>;
  }

  return (
    <div className="project-workspace">
      <div className="project-header">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        
        <div className="project-actions">
          <div className="new-task-form">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new task..."
              onKeyPress={(e) => e.key === 'Enter' && createTask()}
            />
            <button onClick={createTask}>Add Task</button>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {renderColumn('To Do', 'TODO')}
          {renderColumn('In Progress', 'IN_PROGRESS')}
          {renderColumn('Review', 'REVIEW')}
          {renderColumn('Done', 'DONE')}
        </div>
      </DragDropContext>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updatedTask) => {
            setProject(prev => prev ? {
              ...prev,
              tasks: prev.tasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
              ),
            } : null);
          }}
        />
      )}
    </div>
  );
};
```

### **3. Community Features**

#### **Discussion Forums**
```tsx
// components/collaboration/DiscussionForum.tsx
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isSolved: boolean;
}

interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  upvotes: number;
  downvotes: number;
  createdAt: string;
  isAccepted: boolean;
}

export const DiscussionForum: React.FC<{ courseId: string }> = ({
  courseId,
}) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  
  const { user } = useAuth();

  const categories = [
    { id: 'all', name: 'All Posts', color: '#6B7280' },
    { id: 'general', name: 'General Discussion', color: '#3B82F6' },
    { id: 'help', name: 'Help & Support', color: '#EF4444' },
    { id: 'announcements', name: 'Announcements', color: '#10B981' },
    { id: 'resources', name: 'Resources', color: '#F59E0B' },
    { id: 'projects', name: 'Projects', color: '#8B5CF6' },
  ];

  useEffect(() => {
    loadPosts();
  }, [courseId, selectedCategory, sortBy, searchQuery]);

  const loadPosts = async () => {
    try {
      const params = new URLSearchParams({
        courseId,
        category: selectedCategory,
        sort: sortBy,
        search: searchQuery,
      });

      const response = await fetch(`/api/forum/posts?${params}`);
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const loadReplies = async (postId: string) => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/replies`);
      const data = await response.json();
      setReplies(data.replies);
    } catch (error) {
      console.error('Error loading replies:', error);
    }
  };

  const createPost = async (postData: any) => {
    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...postData,
          courseId,
        }),
      });

      if (response.ok) {
        setIsCreatingPost(false);
        loadPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const voteOnPost = async (postId: string, voteType: 'UP' | 'DOWN') => {
    try {
      await fetch(`/api/forum/posts/${postId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      });

      loadPosts();
    } catch (error) {
      console.error('Error voting on post:', error);
    }
  };

  const markAsSolved = async (postId: string) => {
    try {
      await fetch(`/api/forum/posts/${postId}/solve`, {
        method: 'PATCH',
      });

      loadPosts();
      if (selectedPost) {
        setSelectedPost({ ...selectedPost, isSolved: true });
      }
    } catch (error) {
      console.error('Error marking as solved:', error);
    }
  };

  const renderPostCard = (post: ForumPost) => (
    <div
      key={post.id}
      className={`forum-post-card ${post.isPinned ? 'pinned' : ''} ${
        post.isSolved ? 'solved' : ''
      }`}
      onClick={() => {
        setSelectedPost(post);
        loadReplies(post.id);
      }}
    >
      <div className="post-header">
        <div className="post-title-section">
          {post.isPinned && <span className="pin-icon">📌</span>}
          {post.isSolved && <span className="solved-icon">✅</span>}
          <h3 className="post-title">{post.title}</h3>
        </div>
        
        <div className="post-category">
          <span
            className="category-badge"
            style={{
              backgroundColor: categories.find(c => c.id === post.category)?.color,
            }}
          >
            {categories.find(c => c.id === post.category)?.name}
          </span>
        </div>
      </div>

      <div className="post-content-preview">
        {post.content.substring(0, 200)}
        {post.content.length > 200 && '...'}
      </div>

      <div className="post-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="post-footer">
        <div className="post-author">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="author-avatar"
          />
          <div className="author-info">
            <span className="author-name">{post.author.name}</span>
            <span className="author-role">{post.author.role}</span>
          </div>
        </div>

        <div className="post-stats">
          <div className="vote-section">
            <button
              className="vote-btn upvote"
              onClick={(e) => {
                e.stopPropagation();
                voteOnPost(post.id, 'UP');
              }}
            >
              ↑ {post.upvotes}
            </button>
            <button
              className="vote-btn downvote"
              onClick={(e) => {
                e.stopPropagation();
                voteOnPost(post.id, 'DOWN');
              }}
            >
              ↓ {post.downvotes}
            </button>
          </div>
          
          <div className="reply-count">
            💬 {post.replyCount} replies
          </div>
          
          <div className="post-time">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="discussion-forum">
      <div className="forum-header">
        <h1>Discussion Forum</h1>
        
        <button
          className="create-post-btn"
          onClick={() => setIsCreatingPost(true)}
        >
          Create New Post
        </button>
      </div>

      <div className="forum-filters">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-filter ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="sort-options">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Popular</option>
            <option value="solved">Solved First</option>
            <option value="unanswered">Unanswered</option>
          </select>
        </div>
      </div>

      <div className="forum-content">
        <div className="posts-list">
          {posts.map(renderPostCard)}
        </div>

        {selectedPost && (
          <PostDetailView
            post={selectedPost}
            replies={replies}
            onClose={() => setSelectedPost(null)}
            onMarkSolved={() => markAsSolved(selectedPost.id)}
            canMarkSolved={
              user?.id === selectedPost.authorId ||
              user?.role === 'TEACHER' ||
              user?.role === 'ADMIN'
            }
          />
        )}
      </div>

      {isCreatingPost && (
        <CreatePostModal
          categories={categories.filter(c => c.id !== 'all')}
          onSubmit={createPost}
          onClose={() => setIsCreatingPost(false)}
        />
      )}
    </div>
  );
};
```

### **4. Live Streaming & Virtual Classrooms**

#### **Live Streaming Component**
```tsx
// components/collaboration/LiveStream.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

interface LiveStreamProps {
  streamId: string;
  isStreamer: boolean;
  courseId: string;
}

export const LiveStream: React.FC<LiveStreamProps> = ({
  streamId,
  isStreamer,
  courseId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [streamQuality, setStreamQuality] = useState('720p');
  
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    if (isStreamer) {
      initializeStreaming();
    } else {
      initializeViewing();
    }

    joinStreamRoom();
    
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (lastMessage) {
      handleStreamMessage(lastMessage);
    }
  }, [lastMessage]);

  const initializeStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Initialize WebRTC for streaming
      await setupWebRTCStreaming(stream);
    } catch (error) {
      console.error('Error initializing streaming:', error);
    }
  };

  const initializeViewing = async () => {
    try {
      // Initialize WebRTC for viewing
      await setupWebRTCViewing();
    } catch (error) {
      console.error('Error initializing viewing:', error);
    }
  };

  const setupWebRTCStreaming = async (stream: MediaStream) => {
    // Implementation for WebRTC streaming setup
    // This would involve setting up peer connections for each viewer
    // and managing the stream distribution
  };

  const setupWebRTCViewing = async () => {
    // Implementation for WebRTC viewing setup
    // This would connect to the streamer's peer connection
  };

  const joinStreamRoom = () => {
    sendMessage({
      type: 'JOIN_ROOM',
      roomId: `stream-${streamId}`,
    });
  };

  const handleStreamMessage = (message: any) => {
    const { type, data } = message;

    switch (type) {
      case 'STREAM_STARTED':
        setIsStreaming(true);
        break;
      case 'STREAM_ENDED':
        setIsStreaming(false);
        break;
      case 'VIEWER_COUNT_UPDATE':
        setViewerCount(data.count);
        break;
      case 'NEW_CHAT_MESSAGE':
        setChatMessages(prev => [...prev, data.message]);
        break;
      case 'STREAM_QUALITY_CHANGED':
        setStreamQuality(data.quality);
        break;
    }
  };

  const startStream = async () => {
    try {
      const response = await fetch(`/api/streams/${streamId}/start`, {
        method: 'POST',
      });

      if (response.ok) {
        setIsStreaming(true);
        
        sendMessage({
          type: 'SEND_MESSAGE',
          data: {
            roomId: `stream-${streamId}`,
            content: JSON.stringify({
              type: 'STREAM_STARTED',
              streamId,
            }),
            messageType: 'SYSTEM',
          },
        });
      }
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const endStream = async () => {
    try {
      const response = await fetch(`/api/streams/${streamId}/end`, {
        method: 'POST',
      });

      if (response.ok) {
        setIsStreaming(false);
        
        sendMessage({
          type: 'SEND_MESSAGE',
          data: {
            roomId: `stream-${streamId}`,
            content: JSON.stringify({
              type: 'STREAM_ENDED',
              streamId,
            }),
            messageType: 'SYSTEM',
          },
        });
      }
    } catch (error) {
      console.error('Error ending stream:', error);
    }
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    sendMessage({
      type: 'SEND_MESSAGE',
      data: {
        roomId: `stream-${streamId}`,
        content: newMessage,
        messageType: 'CHAT',
      },
    });

    setNewMessage('');
  };

  const changeStreamQuality = (quality: string) => {
    setStreamQuality(quality);
    
    sendMessage({
      type: 'SEND_MESSAGE',
      data: {
        roomId: `stream-${streamId}`,
        content: JSON.stringify({
          type: 'STREAM_QUALITY_CHANGED',
          quality,
        }),
        messageType: 'SYSTEM',
      },
    });
  };

  const cleanup = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="live-stream-container">
      <div className="stream-main">
        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            muted={isStreamer}
            playsInline
            className="stream-video"
          />
          
          <div className="stream-overlay">
            <div className="stream-info">
              <span className={`live-indicator ${isStreaming ? 'live' : ''}`}>
                {isStreaming ? '🔴 LIVE' : '⚫ OFFLINE'}
              </span>
              <span className="viewer-count">
                👥 {viewerCount} viewers
              </span>
            </div>
            
            <div className="stream-quality">
              <select
                value={streamQuality}
                onChange={(e) => changeStreamQuality(e.target.value)}
                disabled={!isStreaming}
              >
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
              </select>
            </div>
          </div>
        </div>

        {isStreamer && (
          <div className="stream-controls">
            {!isStreaming ? (
              <button onClick={startStream} className="start-stream-btn">
                Start Stream
              </button>
            ) : (
              <button onClick={endStream} className="end-stream-btn">
                End Stream
              </button>
            )}
          </div>
        )}
      </div>

      <div className="stream-chat">
        <div className="chat-header">
          <h3>Live Chat</h3>
        </div>
        
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              <span className="message-author">{message.author}</span>
              <span className="message-content">{message.content}</span>
            </div>
          ))}
        </div>
        
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
          />
          <button onClick={sendChatMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
```

---

## 📊 Key Features to Deliver

### ✅ **Communication Features**
- [ ] Real-time messaging system
- [ ] Video conferencing (1-on-1 and group)
- [ ] Voice calls and screen sharing
- [ ] File sharing and collaboration
- [ ] Presence indicators (online/offline)

### ✅ **Collaboration Tools**
- [ ] Project workspaces with Kanban boards
- [ ] Collaborative document editing
- [ ] Shared whiteboards and drawing tools
- [ ] Group assignments and peer review
- [ ] Team formation and management

### ✅ **Community Features**
- [ ] Discussion forums with categories
- [ ] Q&A sections with voting
- [ ] Student groups and clubs
- [ ] Event planning and scheduling
- [ ] Mentorship program matching

### ✅ **Live Learning**
- [ ] Live streaming for lectures
- [ ] Virtual classroom environments
- [ ] Interactive polling during sessions
- [ ] Breakout rooms for group work
- [ ] Recording and playback

### ✅ **Social Learning**
- [ ] Study buddy matching
- [ ] Learning leaderboards
- [ ] Achievement badges and rewards
- [ ] Peer tutoring system
- [ ] Knowledge sharing marketplace

---

## 📈 Success Metrics

### **Engagement Metrics**
- Daily active users increase by 40%
- Average session duration increase by 30%
- User retention rate > 80% after collaboration features
- Message volume > 1000 per day

### **Collaboration Metrics**
- Project completion rate increase by 25%
- Peer interaction frequency > 5 per user per week
- Forum participation rate > 60%
- Live session attendance rate > 70%

---

## 🔄 Performance Optimization

### **Real-time Performance**
- WebSocket connection latency < 100ms
- Video call quality maintenance at 720p minimum
- Chat message delivery < 500ms
- File sharing speed > 10MB/s

### **Scalability Targets**
- Support 1000+ concurrent connections
- Handle 10+ simultaneous video calls
- Manage 100+ active project workspaces
- Process 10,000+ messages per hour

---

**Phase 12 Status: 📋 PLANNED**  
**Estimated Duration:** 8-10 weeks  
**Prerequisites:** Complete Phases 1-11  
**Next Phase:** Integration and ecosystem expansion