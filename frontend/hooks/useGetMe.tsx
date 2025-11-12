import { getMe } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const useGetMe = () => {
    const router = useRouter();
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await getMe();
                if (response.status != 200) {
                    console.log("No token found");
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

