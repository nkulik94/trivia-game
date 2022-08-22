import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory()
    return <button onClick={() => history.push('/sign-in')}>login</button>
}

export default Home