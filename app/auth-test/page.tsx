"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthTestPage() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        const res = await fetch('/api/auth/debug');
        const data = await res.json();
        setDebugInfo(data);
      } catch (error) {
        console.error('Debug fetch error:', error);
      }
    };

    fetchDebugInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>
        
        <div className="grid gap-6">
          {/* Session Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Session Status</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Has Session:</strong> {session ? 'Yes' : 'No'}</p>
              {session?.user && (
                <div className="mt-4">
                  <h3 className="font-medium">User Info:</h3>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-sm">
                    {JSON.stringify(session.user, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Debug Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            {debugInfo ? (
              <pre className="p-3 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            ) : (
              <p>Loading debug info...</p>
            )}
          </div>

          {/* Environment Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Environment</h2>
            <div className="space-y-2">
              <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
              <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}