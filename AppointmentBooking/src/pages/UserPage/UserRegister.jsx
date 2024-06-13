// UserRegister.js
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


function UserRegister() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [image, setImage] = useState(null); // State to store selected image
    const navigate = useNavigate();
    const onFinish = async () => {
        const userData = {
            name,
            email,
            password,
            phone,
            image: image ? image : '' // Ensure image is not null before sending to backend
        };
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/user/register", userData);
            setLoading(false);
            if (response.data.success) {
                toast.success(response.data.message);
                console.log("Success")
                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            {loading && (<h1>Loading</h1>)}

            <h2>Register</h2>
            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type="text" className="form-control" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type="text" className="form-control" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <input type="number" className="form-control" placeholder="Enter Phone No" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            <input type="text" className="form-control" placeholder="Enter Image Url" value={image} onChange={(e) => { setImage(e.target.value) }} />


            {/* Pass setImage function to onImageSelect prop */}
            {/* <input type="file" name="image" id="image" class="form-control" accept="image/png,image/gif,image/jpg,image/jpeg" onChange={handleImageChange}/> */}

            <button className='btn btn-primary' onClick={onFinish}>Register</button>
            <Link to="/login" className="anchor mt-2">
                Already Have an Account
            </Link>
        </div>
    );
}

export default UserRegister;

