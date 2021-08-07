import React from 'react'
import './Navbar.css'
import { Container } from 'react-bootstrap';
import logo from '../../Assets/to-do-list.png'

const Navbar = () => {

    const logOut = () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
    }

    return (
        <div className="nav__outer__div">
            <Container>
                <div className="nav__inner__div">
                    <div className="nav__inner__logo__div">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nav__inner__button__div">
                        <button onClick={logOut}>Logout</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar
