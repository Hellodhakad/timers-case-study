import AddTimer from '../AddTimer';
import TimerListContainer from '../TimerListContainer';
import { MainContainerHook } from '../../Hooks';

export default function MainContainer() {
    const { timersData, addNewTimerData } = MainContainerHook();
    
    return <>
        <AddTimer addNewTimerData={addNewTimerData} />
        <TimerListContainer timersData={timersData} addNewTimerData={addNewTimerData} />
    </>
}