import UserInitial from "./UserInitial"

const ProfileInfo = ({ username, onLogout }) => {

    const firstname = (u_name) => {
        if(!u_name) return "user"
        return u_name.split(" ")[0].toLowerCase()
    };

    return <div className="flex items-center gap-3">
        <UserInitial username={username} />
        <div>
            <p className="text-sm font-medium">{firstname(username)}</p>
            <button className="text-sm text-slate-700 underline" onClick={onLogout}>Logut</button>
        </div>
    </div>
}

export default ProfileInfo