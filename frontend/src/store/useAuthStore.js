import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {io} from "socket.io-client"
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false, 
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoading: false,
    listUsers: [],
    listMessages: [],
    socket: null,
    onlineUsers: [],
    selectedUser: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket() 
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
            get().connectSocket() 
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
            get().disconnectSocket()
        } catch (error) {
            console.error("Error in logout:", error);
        }
    },

    login: async (data) => {
        try {
            set({ isLoggingIn: true }); // Fixed typo
            const res = await axiosInstance.post("/auth/login", data); // Added await
            set({ authUser: res.data });
            get().connectSocket()
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
        const {listMessages} = get()
        try {
            const res = await axiosInstance.post(`/message/send/${data.receiver}`,data)
            set({listMessages: [...listMessages,res.data]})
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
    },
    updateProfile: async (data) =>{
        try {
            await axiosInstance.put("/auth/update_profile", data)
            
        } catch(err) {
            console.log(err)
        }
    },
    connectSocket: () =>{
        try {
            const {authUser} = get()
            if (!authUser || get().socket?.connected) return;
            const  socket = io(import.meta.env.VITE_BACKEND_URL, {
                query : {
                    userId: authUser._id
                }
            })

            socket.connect()
            set({socket: socket})
            socket.on("getOnlineUsers", (userIds)=>{
                set({onlineUsers: userIds})
            })
        }catch(err) {
            console.log(err)
        }
    }, 
    disconnectSocket : () =>{
        try {
            if (get().socket?.connected) get().socket.disconnect()
        }catch (err) {
            console.log(err)
        }
    },
    subscribeToMessages:  () =>{
        try {

            const {selectedUser, socket}=  get()
            
            if (!selectedUser) return;

            socket.on("newMessage", (newMessage) =>{
                console.log(newMessage)
                console.log(selectedUser)
                if (newMessage.sender!== selectedUser._id) return;
                set({
                    listMessages:[...get().listMessages, newMessage]
                })
            })
            
        } catch(err) {
            console.log(err)
        }
    }, 
    unsubscribeFromMessages: () =>{
        const socket = get().socket;
        
        socket.off("newMessage")
        
    },
    setSelectedUser: (selectedUser) =>{
        set({selectedUser})
    }
}));