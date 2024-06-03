import { useState } from "react";
import Modal from "react-modal";
import UserInitial from "./UserInitial";
import SendMoney from "./SendMoney";

const RecieverInfo = ({ firstname, lastname, id }) => {
    const [sendMoneyModal, setSendMoneyModal] = useState({
        isShown: false
    })
    
    const name = firstname[0].toUpperCase() + firstname.slice(1)
    + " " 
    + lastname[0].toUpperCase() + lastname.slice(1);

    return <div className="flex justify-between mt-6">
        <div className="flex gap-3">
            <UserInitial username={name} />
            <p className="text-lg font-bold text-gray-500 mt-2">{name}</p>
        </div>

        <Modal
            isOpen={sendMoneyModal.isShown}
            onRequestClose={() => { }}
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.6)"
                }
            }}
            className="w-1/5 max-h-3/4 bg-white rounded-lg mx-auto mt-72 px-8 py-10"
        >
            <SendMoney 
            receipentName={name}
            recipientId={id}
            onClose={() => setSendMoneyModal({ isShown: false })} />
        </Modal>

        <div>
            <button onClick={() => setSendMoneyModal({ isShown: true })} className="btn-primary">Send</button>
        </div>
    </div>
}

export default RecieverInfo;