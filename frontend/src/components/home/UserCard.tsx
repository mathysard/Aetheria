interface PropsInterface {
    username: string;
    profilePicture?: string;
}

function UserCard({username, profilePicture}: PropsInterface) {
  return (
    <div className="w-40 h-40">
        <div className="rounded-full overflow-hidden mb-2">
            <img className="w-full h-full object-cover cursor-pointer" src={profilePicture} />
        </div>
        <p className="text-center font-light cursor-pointer hover:font-semibold">@{username}</p>
    </div>
  )
}

export default UserCard