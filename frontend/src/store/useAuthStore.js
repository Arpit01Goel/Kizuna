import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false, 
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoading: false,
    listUsers: [],
    listMessages: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error in signup:", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
        } catch (error) {
            console.error("Error in logout:", error);
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true }); // Fixed typo
            const res = await axiosInstance.post("/auth/login", data); // Added await
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error in login:", error);
        } finally {
            set({ isLoggingIn: false }); // Fixed typo
        }
    },

    users: async(data) =>{
        try {
            set({isLoading: true})
            const users = await axiosInstance.get("/message/users", data)
            set({listUsers: users.data})

            
        }catch(err) {
            console.log(err)
        } finally {
            set({isLoading: false})
        }
    },
    messages: async(data) =>{
        try{
            set({isLoading: true})
            const listMessage_ = await axiosInstance.get(`/message/${data.receiver}`)
            set({listMessages: listMessage_.data})
        }catch(err) {
            console.log(err)
        }finally{
            set({isLoading: false})
        }
    },
    sendMessage: async (data) =>{
        try {
            await axiosInstance.post(`/message/send/${data.receiver}`,data)
        }catch(err) {
            console.log(err)
        }
    },
    sendMail: async (data) =>{
        try{
            //send mail data to backend 
        }catch(err) {
            console.log(err)
        }
    },
    sendReview: async (data) =>{
        try{
            //send mail data to backend 
        }catch(err) {
            console.log(err)
        }
    }
}));