import React from 'react'
import "./Team.css"
import Card from './card/Card'

import teamData from "./teamMemberData"
import teamMemberData from './teamMemberData'

const Team = () => {
    return (
        <div className="team-container" >
            <div className="team-content">
                {
                    teamMemberData.map((member)=>{
                       return <Card key={member.id} {...member} ></Card>
                    })
                }
            </div>
        </div>
    )
}

export default Team
