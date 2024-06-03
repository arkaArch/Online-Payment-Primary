import {MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/16/solid'
const SearchBar = ({ value, onChange, onClearSearch }) => {
    return <div className="w-full my-2 flex justify-between bg-slate-200 rounded-md">
        
        {<MagnifyingGlassIcon className="icon-primary mt-3 ml-3 mr-1"/>}

        <input
            type="text"
            placeholder="Search users"
            value={value}
            onChange={onChange}
            className="w-full text-sm py-3 px-2 bg-transparent outline-none"
        />

        {/* If value is provided then <XMarkIcon /> is rendered else not */}
        {value && <XMarkIcon className="icon-primary mt-3 mr-3" onClick={onClearSearch}/>}
    </div>
}

export default SearchBar;