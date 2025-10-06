import  {create} from 'zustand';

export const useAuthState = create((set)=>({
    authUser : null,
    isRegistering : false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth : true,

    checkAuth: async()=>{
        try {
            const url = 'http://localhost:1601/auth/check';
            const options = {
                credentials:'include'
            }

            const response = await fetch(url, options);
            const result = await response.json();

            set({authUser:result.data});

        } catch (error) {
            set({authUser:null});
        } finally{
            set({isCheckingAuth:false});
        }
    }
}))