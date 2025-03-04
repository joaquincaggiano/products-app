import {
  authCheckStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapaters/secure-storage";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },
  register: async (fullName: string, email: string, password: string) => {
    const resp = await authRegister(fullName, email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },
  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    return get().changeStatus(resp?.token, resp?.user);
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();
    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    await SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
