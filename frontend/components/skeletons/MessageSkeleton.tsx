
import { Skeleton } from "@/components/ui/skeleton"; 

const MessageSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 p-4 max-h-[calc(100vh-160px)] min-h-[calc(100vh-160px)]">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="w-1/4 h-4 rounded" />
                        <Skeleton className="w-full h-4 rounded" />
                        <Skeleton className="w-3/4 h-4 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageSkeleton;