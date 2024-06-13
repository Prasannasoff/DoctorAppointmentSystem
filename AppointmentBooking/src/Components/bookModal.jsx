import React, { useState } from 'react'
import ModalPage from '../Components/modal'
import './bookModal.css'
function bookModal({ closeModal, DoctorDetails }) {
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(null);
    const [reason,setReason]=useState('');
    return (

        <div className="bookModal">
            {modal && <ModalPage close={setModal} DocDetails={DoctorDetails} Date={date} Reason={reason}/>}
            <div className="containerbookModal">
                <button className="close" onClick={() => closeModal(false)}>X</button>
                <div className="mainbookContent">
                    Select Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    Enter the Purpose:<input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
                    <div className='modalButton'>
                        <button className='btn btn-primary' onClick={() => setModal(true)}>Book</button>
                        <button className='btn btn-danger' onClick={() => closeModal(false)}>Cancel</button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default bookModal