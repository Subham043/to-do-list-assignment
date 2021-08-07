import React from 'react'
import './Dashboard.css'
import Navbar from '../../Components/Navbar/Navbar'
import Main from '../../Components/Main/Main'

const Dashboard = () => {
    return (
        <div className="dashboard__outer__div">
            <Navbar />
            <Main />
        </div>
    )
}

export default Dashboard
