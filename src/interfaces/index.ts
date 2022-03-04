// Todos are kept with this interface
export interface todo {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  statusId: number;
  userId: number;
}

// Request related to todos uses this interface
export interface todoInput {
  title: string;
  categoryId: number;
  statusId: number;
}

// Categories are kept with this interface
export interface category {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  statuses: number[];
}

// Request related to categories uses this interface
export interface categoryInput {
  title: string;
  statuses: statusInput[];
}

// Statuses are kept with this interface
export interface status {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

// Request related to statuses uses this interface
export interface statusInput {
  title: string;
  color: string;
}

export interface AppConfig {
  [key: string]: string;
  base: string;
  register: string;
  login: string;
  category: string;
  status: string;
  todo: string;
}