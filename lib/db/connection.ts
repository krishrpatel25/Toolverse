// Database Connection Module
// This module provides in-memory data storage for development
// In production, replace with MongoDB Atlas or similar database

interface ToolData {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  slug: string;
  tags: string[];
  usageCount: number;
  createdAt: Date;
}

interface UserData {
  id: string;
  email: string;
  password?: string;
  name?: string;
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage (will be replaced with MongoDB)
let tools: Map<string, ToolData> = new Map();
let users: Map<string, UserData> = new Map();
let favorites: Map<string, string[]> = new Map(); // userId -> toolIds
let analytics: Array<any> = [];

export const db = {
  tools: {
    async findAll() {
      return Array.from(tools.values());
    },
    async findById(id: string) {
      return tools.get(id);
    },
    async findBySlug(slug: string) {
      return Array.from(tools.values()).find(t => t.slug === slug);
    },
    async findByCategory(category: string) {
      return Array.from(tools.values()).filter(t => t.category === category);
    },
    async search(query: string) {
      const q = query.toLowerCase();
      return Array.from(tools.values()).filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    },
    async create(tool: ToolData) {
      tools.set(tool.id, tool);
      return tool;
    },
    async incrementUsage(id: string) {
      const tool = tools.get(id);
      if (tool) {
        tool.usageCount++;
      }
      return tool;
    },
  },

  users: {
    async findAll() {
      return Array.from(users.values());
    },
    async findById(id: string) {
      return users.get(id);
    },
    async findByEmail(email: string) {
      return Array.from(users.values()).find(u => u.email === email);
    },
    async create(user: UserData) {
      users.set(user.id, user);
      return user;
    },
    async update(id: string, data: Partial<UserData>) {
      const user = users.get(id);
      if (user) {
        Object.assign(user, data, { updatedAt: new Date() });
      }
      return user;
    },
  },

  favorites: {
    async getByUser(userId: string) {
      return favorites.get(userId) || [];
    },
    async addFavorite(userId: string, toolId: string) {
      const userFavs = favorites.get(userId) || [];
      if (!userFavs.includes(toolId)) {
        userFavs.push(toolId);
        favorites.set(userId, userFavs);
      }
      return userFavs;
    },
    async removeFavorite(userId: string, toolId: string) {
      const userFavs = favorites.get(userId) || [];
      const filtered = userFavs.filter(id => id !== toolId);
      if (filtered.length === 0) {
        favorites.delete(userId);
      } else {
        favorites.set(userId, filtered);
      }
      return filtered;
    },
    async isFavorite(userId: string, toolId: string) {
      const userFavs = favorites.get(userId) || [];
      return userFavs.includes(toolId);
    },
  },

  analytics: {
    async log(event: any) {
      analytics.push({ ...event, timestamp: new Date() });
      return event;
    },
    async getToolStats(toolId: string) {
      const toolEvents = analytics.filter(e => e.toolId === toolId);
      return {
        totalUses: toolEvents.filter(e => e.action === 'use').length,
        totalViews: toolEvents.filter(e => e.action === 'view').length,
        totalCopies: toolEvents.filter(e => e.action === 'copy').length,
        totalShares: toolEvents.filter(e => e.action === 'share').length,
      };
    },
  },

  // Seed initial tools data
  async seed() {
    // This will be populated by tool implementation phase
  },
};

export default db;
