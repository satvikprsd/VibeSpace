import DMList from "./DMList"
import ServerRepoList from "./ServerRepoList"

const SideBar = () => {
  return (
    <div className="flex min-h-screen">
        <ServerRepoList />
        <DMList />
    </div>
  )
}

export default SideBar