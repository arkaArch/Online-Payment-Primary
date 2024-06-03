import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import Input from './Input'
import UserInitial from './UserInitial'
import axios from 'axios'

const SendMoney = ({ receipentName, recipientId, onClose }) => {
    const [senderAmount, setSenderAmount] = useState()

    return <>
        <div className="relative">
            <button
                onClick={onClose}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-500 rounded-full flex items-center justify-center absolute -right-6 -top-7 text-slate-700 hover:text-slate-50">
                <XMarkIcon className="w-6 h-6"/>
            </button>
        </div>

        <div className="flex flex-col  items-center justify-between gap-4">
            <div className="text-2xl font-black text-center text-gray-500 mb-6">
                SEND MONEY
            </div>

            <UserInitial username={receipentName} />
            <p className="text-lg font-bold text-gray-500 mb-6">{receipentName}</p>

            <Input
                value={senderAmount}
                placeholder="Enter Amount"
                onChange={(e) => { setSenderAmount(e.target.value) }}
            />

            <button onClick={() => {
                axios.post("http://localhost:3000/api/v1/account/transfer", {
                    senderAmount, 
                    recipientId
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }}className="btn-primary hover:text-gray-100 hover:bg-gray-700">Transfer</button>
        </div>
    </>
}

export default SendMoney