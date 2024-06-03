const UserInitial = ({ username }) => {

    const getInitial = (u_name) => {
        const f_name = u_name.split(" ")[0];
        const l_name = u_name.split(" ")[1];

        if (!f_name && !l_name) return "";
        return (f_name[0] + l_name[0]);
    }
    
    return <div className="flex w-12 h-12 items-center justify-center rounded-full bg-slate-200 text-slate-900 font-medium">
        {getInitial(username)}
    </div>
}

export default UserInitial;