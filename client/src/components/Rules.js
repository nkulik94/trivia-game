import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Rules() {
    return (
        <Box sx={{marginTop: '2rem'}}>
            <Typography variant="h3">Rules</Typography>
            <br/>
            <Typography variant='h6'>Challenges:</Typography>
            <Typography variant="body">
                Challenges can be initiated by users by clicking on the "Start a Challenge" button at
                the top of the challenge list on the user dashboard page. Upon clicking the button the user will
                be prompted to choose the stakes for the match, after which the user will be directed to await
                acceptance of the challenge. Leaving the dashboard will result in the challenge automatically being withdrawn.
                Upon acceptance of the challenge the user will be automatically redirected to the game page. Alternately, a
                user can choose to accept the challenge of another user, upon which the the game will be initiated with the stakes chosen
                by the initiator of the challenge.
            </Typography>
            <br/>
            <br/>
            <Typography variant='h6'>Stakes:</Typography>
            <Typography variant='/body'>
                In the context of initiating a game, the stakes refer to an equal amount of points contributed by each
                user to the points pool used for the game. For instance, an accepted challenge with stakes of 100 will result in
                a match with a 200 point pool. The game is played until the pool is emptied (more on how that works in a moment).
                There are also in-game stakes, which will be covered in the section on the game rules.
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">Game Start:</Typography>
            <Typography variant="body">
                Upon initiation of a match a ten-second timer will begin, after which the turn of the player
                who initiated the challenge will begin
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">Turns:</Typography>
            <Typography variant="body">
                During a player's turn, the player will be prompted to choose the stakes and the difficulty of the next question.
                The stakes represent the potential winnings for answering the next question, and therefore must not exceed the
                amount of points in the pool. If 45 seconds pass before the player takes action, the player will lose their turn
                and the next player's turn begins.
            </Typography>
            <br/>
            <br/>
            <Typography variant="h6">Answering Questions:</Typography>
            <Typography variant="body">
                Once the stakes and difficulty have been chosen, a question will be displayed on the screen with four possible answers.
                A ten second timer will start during which either player will have the opportunity to click the red buzzer under their name. If neither player hits
                their buzzer before time runs out, the turn ends and the next turn begins. The first player to hit their buzzer will have the opportunity
                to answer the question within ten seconds. If the question is answered correctly, the player is awarded points from the pool equal to the stakes for that round.
                If the question is answered incorrectly, or if time runs out, the second player will have the opportunity to answer and gain the points. (Keep in mind that the second
                player will have had one incorrect answer eliminated due to the incorrect attempt by the first player, and will have a better chance of guessing correctly. Don't hit
                that buzzer unless you're sure that you know the answer!)
            </Typography>
        </Box>
    )
}

export default Rules