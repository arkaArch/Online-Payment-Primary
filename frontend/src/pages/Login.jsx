import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setWarning("Please enter your email");
            return;
        } else if (!password) {
            setWarning("Please enter your password");
            return;
        }
        setWarning("");
        
        /* Login API Call */
        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
            email: email.trim(),
            password
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
    }

    return <div className="h-screen flex flex-col justify-center bg-slate-100">
        <div className="w-96 mx-auto px-14 py-10 rounded-xl shadow-xl bg-stone-100">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">Login</h1>
                <Input value={email} placeholder="email address" onChange={(e) => { setEmail(e.target.value) }} />
                <PasswordInput value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />

                <div className="mt-8">
                    <p className="text-xs text-center text-red-500 pb-2">{warning}</p>
                    <button type="submit" className="btn-primary">login</button>
                </div>

                <p className="text-sm text-center mt-6 text-gray-500">
                    Not registered yet?{" "}
                    <Link to="/signup" className="text-gray-600 hover:text-gray-800 underline">Create an account</Link>
                </p>
            </form>
        </div>
    </div>
}

export default Login;