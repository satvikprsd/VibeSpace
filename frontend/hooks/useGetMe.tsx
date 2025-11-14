import { getMe } from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetMe = () => {
    const router = useRouter();
    const {setUser, setIsLoggedIn} = useUserStore();
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await getMe();
                if (response.status != 200) {
                    console.log("No token found");
                    toast.warning("No active session found. Please login.");
                    router.push("/login");
                    setIsLoggedIn(false);
                    return;    
                }
                
                const data = response?.data;
                if (data.success) {
                    setUser(data.user);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    toast.error(data.message || "Failed to fetch user data. Please login again.");
                    router.push("/login");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchMe();
    }, [router]);   
}

export default useGetMe;

