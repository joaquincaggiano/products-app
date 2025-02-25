import { User } from '@/core/auth/interfaces/user';
import { create } from 'zustand';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        return true
    },
    checkStatus: async () => {},
    logout: async () => {}
}))