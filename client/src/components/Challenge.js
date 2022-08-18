import React, { useContext, useState } from "react";
import { CableContext } from "../context/cable";
import { GameContext } from "../context/game";
import { UserContext } from "../context/user";
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ErrorMsg from "./ErrorMsg";

function Challenge({ challenge }) {
    const cableContext = useContext(CableContext)
    const gameContext = useContext(GameContext)
    const userContext = useContext(UserContext)
    const [error, setError] = useState(null)

    function handleError() {
        setError("You don't have enough points to match those stakes!")
        setTimeout(() => setError(null), 3000)
    }

    function handleAccept() {
        if (userContext.user.points < challenge.stakes) {
            handleError()
        } else {
            const newChannel = cableContext.cable.subscriptions.create({
                channel: 'StartChallengeChannel',
                user_id: challenge.user_id
            },
            {
                received: (data) => {
                    if (data.gameId) {
                        gameContext.getAndSetGame(data.gameId)
                        newChannel.unsubscribe()
                    }
                }
            })

            newChannel.send({player_2_id: userContext.user.id})
        }
    }
    return (
        <>
        <ListItem
        secondaryAction={
            <Button onClick={handleAccept}>Accept</Button>
        }
        >
            <ListItemAvatar>
                <Avatar alt={challenge.user_username} src={challenge.user_avatar}/>
            </ListItemAvatar>
            <ListItemText
                primary={`Stakes: ${challenge.stakes}`}
                secondary={
                    <>
                    <Typography variant="body">{`User: ${challenge.user_username}`}</Typography>
                    <br/>
                    <Typography variant="body">{`Win/Loss Record: ${challenge.user_record}`}</Typography>
                    </>
                }
            />
        </ListItem>
        {error ? <ErrorMsg error={error} /> : null}
        </>
    )
}

export default Challenge