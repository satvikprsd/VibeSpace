import { ActiveNow } from '@/components/main/ActiveNow'
import DMList from '@/components/main/DMList'
import { FriendsList } from '@/components/main/FriendsList'
import useGetFriends from '@/hooks/useGetFriends';
import useGetMe from '@/hooks/useGetMe';
import useGetPendingRequests from '@/hooks/useGetPendingRequests';
import { useUIStore } from '@/store/useUIStore';
import { useEffect } from 'react';

const Me = () => {
  useGetMe();
  useGetFriends();
  useGetPendingRequests();
  const {setTopBarText} = useUIStore();
  useEffect(() => {
    setTopBarText("Friends"); 
  }, []);
  return (
    <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
        <DMList />
        <div className="flex-1 bg-background p-4 overflow-y-auto">
            <FriendsList />
        </div>
        <ActiveNow />
    </div>
  )
}

export default Me
