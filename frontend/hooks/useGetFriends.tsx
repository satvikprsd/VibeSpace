import { getFriends } from "@/services/userService";
import { useFriendsStore } from "@/store/useFriendsStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


const useGetFriends = () => {
    const router = useRouter();
    const {setFriends} = useFriendsStore();
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await getFriends();
                const data = response?.data;
                if (data.success) {
                    setFriends(data.friends);
                } else {
                    toast.error(data.message || "Failed to fetch friends. Please try again.");
                }

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        fetchFriends();
    }, [router]);   
}

export default useGetFriends;

