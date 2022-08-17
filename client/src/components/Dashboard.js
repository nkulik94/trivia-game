import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import ChallengeHandler from "./ChallengeHandler";

function Dashboard() {
    const userContext = useContext(UserContext)
    const history = useHistory()

    if (!userContext.user) return <div></div>

    return (
        <ChallengeHandler />
    )
}

export default Dashboard