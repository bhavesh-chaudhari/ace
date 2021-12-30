import React from 'react'
import { useMatch } from 'react-router-dom'

const ResetPassword = () => {

    const match = useMatch("/reset-password/:id/:token")

    const {id, token} = match.params

    // const secret 

    console.log(match)
    
    return (
        <div>
            <h1>Reset Password lol</h1>
        </div>
    )
}

export default ResetPassword
