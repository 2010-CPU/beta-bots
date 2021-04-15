import React, {useState} from 'react'

import {useHistory} from 'react-router-dom'

const ResetPassword = (props) => {

    const {token, user} = props

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" minLength={8} required={true} placeholder={"New Password"}></input>
            <input type="password" minLength={8} required={true} placeholder={"Confirm Password"}></input>
            <button>Reset Passowrd</button>
        </form>
    )
}

export default ResetPassword;