import { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  slug: string;
  component: string;
  tags: string[];
  usageCount?: number;
}
export type ToolCategory =
  | "text"
  | "developer"
  | "image"
  | "calculator"
  | "utility"
  | "file"
  | "seo"
  | "ai";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;

  // CHANGE THIS
  icon: LucideIcon;

  slug: string;
  component: string;
  tags: string[];
  usageCount?: number;
  createdAt?: Date;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  toolId: string;
  createdAt: Date;
}

export interface Analytics {
  id: string;
  toolId: string;
  userId?: string;
  action: "view" | "use" | "share" | "copy";
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
