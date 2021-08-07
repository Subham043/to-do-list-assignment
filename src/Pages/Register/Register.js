import React, {useState, useEffect} from 'react'
import './Register.css'
import userImage from '../../Assets/registered.png'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [userList, setUserList] = useState([])

    useEffect(() => {
        let localUserList = JSON.parse(localStorage.getItem("userList"));
        if (localUserList !== null) {
            setUserList([...localUserList])
        }
    }, [])


    //success notification toast
    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: Date().toLocaleString()
    });

    //error notification toast
    const notifyError = (message) => toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: Date().toLocaleString()
    });

    //checking duplicated email for registration
    const checkUser = (email) => {
        let users = userList.filter(item=>{
            return item.email === email;
        })
        if(users.length > 0){
            return true;
        }else{
            return false;
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === "") {
            notifyError("Name is required")
        }else if (phone === "") {
            notifyError("Phone is required")
        }else if (email === "") {
            notifyError("Email is required")
        }else if (password === "") {
            notifyError("Password is required")
        }else if (cPassword === "") {
            notifyError("Confirm Password is required")
        }else if (cPassword !== password) {
            notifyError("Both Password should be equal")
        }else if(checkUser(email)){
            notifyError("This Email is already in use")
        }else{
            let formData = {
                id: uuidv4(),
                name,
                email,
                phone,
                password
            }
            setUserList([...userList, formData])
            let localUserList = JSON.parse(localStorage.getItem("userList"));
            if (localUserList !== null) {
                let newLocalUserList = [...localUserList, formData];
                localStorage.setItem("userList", JSON.stringify(newLocalUserList));

            } else {
                let userListArr = [];
                userListArr.push(formData)
                localStorage.setItem("userList", JSON.stringify(userListArr));
            }
            notifySuccess("User Registered Successfully")
            setName("")
            setEmail("")
            setPhone("")
            setPassword("")
            setCPassword("")
        }
    }

    return (
        <div className="register__outer__div">
                <div className="register__inner__div">
                    <div className="register__inner__img">
                        <img src={userImage} alt="register" />
                    </div>
                    <div className="register__form__div">
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label" style={{color: '#a233ff'}}>Name</label>
                                <input type="text" className="form-control" id="" value={name} onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label" style={{color: '#a233ff'}}>Phone</label>
                                <input type="text" className="form-control" id="" aria-describedby="emailHelp" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label" style={{color: '#a233ff'}}>Email address</label>
                                <input type="email" className="form-control" id="" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label" style={{color: '#a233ff'}}>Password</label>
                                <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{color: '#a233ff'}}>Confirm Password</label>
                                <input type="password" className="form-control" value={cPassword} onChange={(e)=>setCPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 submit__btn__div">
                                <button type="submit">Register</button>
                            </div>
                            <div className="mb-3 link__div">
                                <Link to="/">Login</Link>
                                <Link to="/forgot-password">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
        </div>
    )
}

export default Register
