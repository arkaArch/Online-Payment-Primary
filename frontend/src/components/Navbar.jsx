import { useNavigate } from "react-router-dom";
import rupee_logo from "../assets/rupeeLogo.png";
import ProfileInfo from "./ProfileInfo";

const Navbar = ({username}) => {
    const navigate = useNavigate();
    const onLogout = () => { 
        navigate("/login");
        localStorage.removeItem("token")
    }

    return <div className="bg-white flex justify-between px-6 py-2 drop-shadow fixed inset-x-0 top-0">
        <div className="flex cursor-pointer" onClick={() => navigate("/dashboard")}>
            <img src={rupee_logo} className="h-8 mt-2" alt="Note Logo" />
            <span className="text-2xl font-black px-6 py-2 text-gray-700">paytcd</span>
        </div>

        <ProfileInfo username={"Ramesh Talwar"} onLogout={onLogout} />
    </div>
}

export default Navbar