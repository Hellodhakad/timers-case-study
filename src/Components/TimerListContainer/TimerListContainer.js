import { NewTimerCardHOC } from '../../Hocs';

export default function TimerListContainer({ timersData, addNewTimerData }) {

    const renderTimersList = timersData.map((item) => {
        return <NewTimerCardHOC data={item} key={item.id} addNewTimerData={addNewTimerData} />
    })


    return <>{renderTimersList}</>
}