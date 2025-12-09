import { prisma } from './prisma';
import { ContactFormData, DatabaseContact, AdminUser } from '@/types/contact';
import bcrypt from 'bcryptjs';

// ContactRepository using Prisma
export class ContactRepository {
  static async getContacts({ page, limit, status, search }: {
    page: number;
    limit: number;
    status?: string;
    search?: string;
  }): Promise<{ contacts: DatabaseContact[]; total: number; totalPages: number }> {
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }
    const [contacts, total] = await Promise.all([
      prisma.contacts.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contacts.count({ where }),
    ]);
    return {
      contacts: contacts.map(this.mapRowToContact),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async create(
    contactData: ContactFormData,
    captchaScore?: number,
    ipAddress?: string,
    userAgent?: string
  ): Promise<DatabaseContact> {
    const contact = await prisma.contacts.create({
      data: {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        country_code: contactData.countryCode,
        company: contactData.company || null,
        subject: contactData.subject,
        service_interest: contactData.serviceInterest || null,
        budget_range: contactData.budgetRange || null,
        message: contactData.message,
        is_verified: captchaScore ? captchaScore >= 0.5 : false,
        captcha_score: captchaScore || null,
        ip_address: ipAddress || null,
        user_agent: userAgent || null,
        status: 'new',
      },
    });
    return this.mapRowToContact(contact);
  }

  static async getById(id: number): Promise<DatabaseContact | null> {
    const contact = await prisma.contacts.findUnique({ where: { id } });
    return contact ? this.mapRowToContact(contact) : null;
  }

  static async updateStatus(
    id: number,
    status: DatabaseContact['status'],
    adminNotes?: string,
    repliedBy?: string
  ): Promise<DatabaseContact | null> {
    const contact = await prisma.contacts.update({
      where: { id },
      data: {
        status,
        admin_notes: adminNotes ?? undefined,
        replied_at: status === 'replied' ? new Date() : undefined,
        replied_by: repliedBy ?? undefined,
        updated_at: new Date(),
      },
    });
    return contact ? this.mapRowToContact(contact) : null;
  }

  static async emailExists(email: string): Promise<boolean> {
    const contact = await prisma.contacts.findFirst({ where: { email } });
    return !!contact;
  }

  static async getStats(): Promise<{
    total: number;
    new: number;
    inProgress: number;
    replied: number;
    closed: number;
    spam: number;
  }> {
    const [total, newCount, inProgress, replied, closed, spam] = await Promise.all([
      prisma.contacts.count(),
      prisma.contacts.count({ where: { status: 'new' } }),
      prisma.contacts.count({ where: { status: 'in_progress' } }),
      prisma.contacts.count({ where: { status: 'replied' } }),
      prisma.contacts.count({ where: { status: 'closed' } }),
      prisma.contacts.count({ where: { status: 'spam' } }),
    ]);
    return { total, new: newCount, inProgress, replied, closed, spam };
  }

  private static mapRowToContact(row: any): DatabaseContact {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      countryCode: row.country_code,
      company: row.company,
      subject: row.subject,
      serviceInterest: row.service_interest,
      budgetRange: row.budget_range,
      message: row.message,
      isVerified: row.is_verified,
      captchaScore: row.captcha_score ? parseFloat(row.captcha_score) : undefined,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      status: row.status,
      adminNotes: row.admin_notes,
      repliedAt: row.replied_at ? new Date(row.replied_at) : undefined,
      repliedBy: row.replied_by,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

// AdminRepository using Prisma
export class AdminRepository {
  static async findByUsername(username: string): Promise<AdminUser | null> {
    const admin = await prisma.admin_users.findFirst({ where: { username, is_active: true } });
    return admin ? this.mapRowToAdmin(admin) : null;
  }

  static async verifyPassword(username: string, password: string): Promise<AdminUser | null> {
    const admin = await prisma.admin_users.findFirst({ where: { username, is_active: true } });
    if (!admin) return null;
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) return null;
    await this.updateLastLogin(admin.id);
    return this.mapRowToAdmin(admin);
  }

  static async updateLastLogin(adminId: number): Promise<void> {
    await prisma.admin_users.update({
      where: { id: adminId },
      data: { last_login: new Date() },
    });
  }

  static async createAdmin(
    username: string,
    email: string,
    password: string,
    fullName: string,
    role: 'admin' | 'super_admin' = 'admin'
  ): Promise<AdminUser | null> {
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin_users.create({
      data: {
        username,
        email,
        password_hash: passwordHash,
        full_name: fullName,
        role,
      },
    });
    return this.mapRowToAdmin(admin);
  }

  private static mapRowToAdmin(row: any): AdminUser {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      fullName: row.full_name,
      role: row.role,
      isActive: row.is_active,
      lastLogin: row.last_login ? new Date(row.last_login) : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

// ChatRepository using Prisma
export class ChatRepository {
  static async saveConversation(data: {
    sessionId: string;
    userMessage: string;
    botResponse: string;
    keywords?: string[];
    actionTaken?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<boolean> {
    await prisma.chat_conversations.create({
      data: {
        session_id: data.sessionId,
        user_message: data.userMessage,
        bot_response: data.botResponse,
        keywords: data.keywords || null,
        action_taken: data.actionTaken || null,
        user_ip: data.ipAddress || null,
        user_agent: data.userAgent || null,
      },
    });
    return true;
  }

  static async getChatHistory(
    page: number = 1,
    limit: number = 50,
    filters?: {
      sessionId?: string;
      isResolved?: boolean;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ chats: any[]; total: number; totalPages: number }> {
    const where: any = {};
    if (filters?.sessionId) where.session_id = filters.sessionId;
    if (filters?.isResolved !== undefined) where.is_resolved = filters.isResolved;
    if (filters?.startDate) where.created_at = { gte: new Date(filters.startDate) };
    if (filters?.endDate) where.created_at = { lte: new Date(filters.endDate) };
    const [chats, total] = await Promise.all([
      prisma.chat_conversations.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.chat_conversations.count({ where }),
    ]);
    return {
      chats,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getAnalytics(days: number = 30): Promise<any[]> {
    return prisma.chat_analytics.findMany({
      where: {
        date: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      },
      orderBy: { date: 'desc' },
    });
  }

  static async updateChatStatus(
    id: number,
    isResolved: boolean,
    adminNotes?: string
  ): Promise<boolean> {
    const chat = await prisma.chat_conversations.update({
      where: { id },
      data: {
        is_resolved: isResolved,
        admin_notes: adminNotes ?? undefined,
        updated_at: new Date(),
      },
    });
    return !!chat;
  }
}
