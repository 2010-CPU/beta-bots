import React, {useState} from 'react'

import {useHistory} from 'react-router-dom'

import {confirmPasswordReset} from '../api'

const ResetPassword = (props) => {

    const {token, user, setUser} = props

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const history = useHistory()

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        try {
            if(password != confirmPassword) {
                alert("Passwords do not match.")
                return
            } else {
                const response = await confirmPasswordReset(user.id, token, password)
                if(response) {
                    alert("Thank you for resetting your password.")
                    history.push('/')
                    const updateUser = await fetchUser(token)
                    setUser(updateUser)
                } else {
                    alert("Error resetting your password.")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" minLength={8} required={true} value={password} placeholder={"New Password"} onChange={(ev) => {
                setPassword(ev.target.value)
            }}></input>
            <input type="password" minLength={8} required={true} value={confirmPassword} placeholder={"Confirm Password"} onChange={(ev) => {
                setConfirmPassword(ev.target.value)
            }}></input>
            <button>Reset Passowrd</button>
        </form>
    )
}

export default ResetPassword;