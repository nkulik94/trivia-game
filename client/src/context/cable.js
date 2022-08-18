import React from "react";
import ActionCable from "actioncable";

const CableContext = React.createContext();

function CableProvider({ children }) {
    const actionCableUrl = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? 'ws://localhost:3000/cable' : 'wss://backward-jeopardy.herokuapp.com/cable'

    const CableApp = {}
    CableApp.cable = ActionCable.createConsumer(actionCableUrl)

    return <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>;
}

export { CableContext, CableProvider };