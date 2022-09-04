import React, { useState } from "react";

const QuestionsContext = React.createContext()

function QuestionsProvider({ children }) {
    const [questions, setQuestions] = useState([])

    const questionsObj = {questions, setQuestions}

    return <QuestionsContext.Provider value={questionsObj}>{children}</QuestionsContext.Provider>
}

export {QuestionsContext, QuestionsProvider }