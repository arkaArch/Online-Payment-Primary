import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'

const PasswordInput = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toogleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return <div className="flex item-center border-b border-gray-200 pb-1.5">
        <input
            value={value}
            type={showPassword ? "text" : "password"}
            placeholder={"new password"}
            onChange={onChange}
            className="w-full bg-transparent outline-none pt-4 text-sm placeholder-gray-500 font-normal text-gray-700 focus:outline-0"
        />

        {showPassword
            ? <EyeIcon onClick={() => toogleShowPassword()} className="icon-primary mt-3" />
            : <EyeSlashIcon onClick={() => toogleShowPassword()} className="icon-primary mt-3" />
        }
    </div>
}

export default PasswordInput