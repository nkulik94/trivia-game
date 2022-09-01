import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [upvoteIds, setUpvoteIds] = useState({})

    useEffect(() => {
        if (user) {
            const ids = {}
            user.upvotes.map(upvote => ids[upvote.submission_id] = true)
            setUpvoteIds(ids)
        }
    }, [user])

    const currentUser = {
        user,
        setUser,
        upvoteIds,
        setUpvoteIds
    }

    return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };