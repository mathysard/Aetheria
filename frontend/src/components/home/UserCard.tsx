interface PropsInterface {
    id: number;
    username: string;
    profilePicture?: string;
}

const UserCard = ({id, username, profilePicture}: PropsInterface) => {
  return (
    <div className="w-40 h-40">
        <a href={`/user/${id}`}>
            <div className="rounded-full overflow-hidden mb-2">
                <img className="w-full h-full object-cover cursor-pointer" src={profilePicture} />
            </div>
            <p className="text-center font-light cursor-pointer hover:font-semibold">@{username}</p>
        </a>
    </div>
  )
}

export default UserCard