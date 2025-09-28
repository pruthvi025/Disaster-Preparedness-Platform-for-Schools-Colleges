// Simple local authentication system without database
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@demo.com',
    fullName: 'Demo Student',
    role: 'student',
    avatar: '/images/avatar-student.png'
  },
  {
    id: '2',
    email: 'teacher@demo.com',
    fullName: 'Demo Teacher',
    role: 'teacher',
    avatar: '/images/avatar-teacher.png'
  },
  {
    id: '3',
    email: 'admin@demo.com',
    fullName: 'Demo Admin',
    role: 'admin',
    avatar: '/images/avatar-admin.png'
  }
];

// Simple auth functions
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user by email (demo: any password works)
  const user = mockUsers.find(u => u.email === email);
  return user || null;
};

export const signUpWithEmail = async (email: string, password: string, fullName: string, role: string = 'student'): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    fullName,
    role: role as 'student' | 'teacher' | 'admin',
    avatar: '/images/avatar-default.png'
  };
  
  mockUsers.push(newUser);
  return newUser;
};

export const signOut = async (): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would clear tokens/sessions
};

export const getCurrentUser = (): User | null => {
  // In a real app, this would get user from localStorage/sessionStorage
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};
