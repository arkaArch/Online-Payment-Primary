const Input = ({ value, placeholder, onChange }) => {
    return <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-transparent border-b border-gray-200 outline-none pt-4 pb-1.5 text-sm placeholder-gray-500 font-normal text-gray-700 focus:outline-0 mb-6"
    />
}

export default Input;