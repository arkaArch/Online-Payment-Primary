import { useEffect, useState } from "react";
import SearchBar from "../components/Searchbar";
import { CurrencyRupeeIcon } from "@heroicons/react/16/solid";
import RecieverInfo from "../components/RecieverInfo";
import axios from "axios";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [recipients, setRecipients] = useState([]);

    const onClearSearch = () => { setSearchQuery("") };


    /* Todo: Debouncing */
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + searchQuery.toLowerCase())
            .then(res => { setRecipients(res.data.user) })
    }, [searchQuery]);


    return <div className="h-screen flex flex-col justify-center bg-slate-100">
        <div className="w-5/6 mx-auto px-14 py-10 rounded-xl shadow-xl bg-stone-100">

            <div className="">
                <h1 className="flex gap-2 text-2xl font-bold text-gray-700 mb-6">
                    Your balance:
                    <CurrencyRupeeIcon className="icon-primary mt-0.5" />
                    1000
                </h1>
            </div>

            <div className="max-h-[32rem] bg-slate-50 my-10 p-10 border rounded-md shadow overflow-scroll">
                <SearchBar
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value) }}
                    onClearSearch={onClearSearch}
                />
                <div className="mt-16">
                    {recipients.map(recipient => <RecieverInfo
                        firstname={recipient.firstname}
                        lastname={recipient.lastname}
                        id={recipient.id} />)}
                </div>
            </div>
        </div>

    </div>
}

export default Dashboard;