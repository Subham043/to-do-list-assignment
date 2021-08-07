import React, {useState, useEffect} from 'react'
import './Login.css'
import userImage from '../../Assets/user.png'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userList, setUserList] = useState([])

    useEffect(() => {
        let localUserList = JSON.parse(localStorage.getItem("userList"));
        if (localUserList !== null) {
            setUserList([...localUserList])
        }
    }, [])

    //error notification toast
    const notifyError = (message) => toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        toastId: Date().toLocaleString()
    });

    //checking email exists for login
    const checkUserEmail = (email) => {
        let users = userList.filter(item=>{
            return item.email === email;
        })
        if(users.length === 0){
            return true;
        }else{
            return false;
        }
    }

    //checking email exists for login
    const checkAuth = (email,password) => {
        let users = userList.filter(item=>{
            return item.email === email && item.password === password;
        })
        if(users.length === 0){
            return true;
        }else{
            return false;
        }
    }

    const getAuthDetails = (email,password) => {
        let users = userList.filter(item=>{
            return item.email === email && item.password === password;
        })
        return users;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (email === "") {
            notifyError("Email is required")
        }else if (password === "") {
            notifyError("Password is required")
        }else if(checkUserEmail(email)){
            notifyError("This Email does not exists")
        }else if(checkAuth(email,password)){
            notifyError("Invalid Password")
        }else{
            let userData = getAuthDetails(email,password);
            let [loggedInUser] = userData
            let localLoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (localLoggedInUser !== null) {
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            } else {
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            }
            setEmail("")
            setPassword("")
            window.location.reload();
        }
    }

    return (
        <div className="login__outer__div">
                <div className="login__inner__div">
                    <div className="login__inner__img">
                        <img src={userImage} alt="login" />
                    </div>
                    <div className="login__form__div">
                        <form onSubmit={submitHandler}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label" style={{color: '#a233ff'}}>Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label" style={{color: '#a233ff'}}>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"  value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 submit__btn__div">
                                <button type="submit">Login</button>
                            </div>
                            <div className="mb-3 link__div">
                                <Link to="/register">Register</Link>
                                <Link to="/forgot-password">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
        </div>
    )
}

export default Login
