import { getMe } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetMe = () => {
    const router = useRouter();
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await getMe();
                if (response.status != 200) {
                    console.log("No token found");
                    toast.warning("No active session found. Please login.");
                    router.push("/login");
                    return;
                }
                
                const data = response?.data;
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchMe();
    }, [router]);   
}

export default useGetMe;

