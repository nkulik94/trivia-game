import React, { useContext, useState, useEffect } from 'react';
import { CableContext } from '../context/cable';

function ShowBroadcast() {
    const cableContext = useContext(CableContext)

    const [questions, setQuestions] = useState([])
    const [channel, setChannel] = useState(null)

    useEffect(() => {
        setChannel(cableContext.cable.subscriptions.create({
            channel: 'TestChannel'
        },
        {
            received: (list) => console.log(list)
        }))
    }, [])
    console.log(channel)

    console.log(questions)

    return (
        <ul>
            {questions.map(question => <li key={question.id}>{question.question}</li>)}
        </ul>
    )
}

export default ShowBroadcast