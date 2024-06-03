import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!firstname) {
            setWarning("Please enter your firstname");
            return;
        } else if (!lastname) {
            setWarning("Please enter your lastname");
            return;
        } else if (!email) {
            setWarning("Please enter your email");
            return;
        } else if (!password) {
            setWarning("Please enter your password");
            return;
        }
        setWarning("");

        /* Send data to backend */
        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    }

    return <div className="h-screen flex flex-col justify-center bg-slate-100">
        <div className="w-96 mx-auto px-14 py-10 rounded-xl shadow-xl bg-stone-100">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">Signup</h1>
                <Input value={firstname} placeholder={"first name"} onChange={(e) => { setFirstname(e.target.value) }} />
                <Input value={lastname} placeholder={"last name"} onChange={(e) => { setLastname(e.target.value) }} />
                <Input value={email} placeholder={"email"} onChange={(e) => { setEmail(e.target.value) }} />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="mt-8">
                    <p className="text-xs text-center text-red-500 pb-2">{warning}</p>
                    <button type="submit" className="btn-primary">create a new account</button>
                </div>

                <p className="text-sm text-center mt-6 text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gray-600 hover:text-gray-800 underline">Login</Link>
                </p>
            </form>
        </div>
    </div>
}

export default Signup;