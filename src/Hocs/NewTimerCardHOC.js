import React from 'react';
import NewTimerCard from "../Components/NewTimerCard";

const NewTimerCardHOC = React.memo((props) => {
    return <NewTimerCard {...props} />
}, () => {
    return false;
})

export default NewTimerCardHOC;