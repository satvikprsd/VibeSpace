import { ActiveNow } from '@/components/main/ActiveNow'
import DMList from '@/components/main/DMList'
import { FriendsList } from '@/components/main/FriendsList'

const Me = () => {
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
