import { useState } from "react"

export default function AddTimerHook({ addNewTimerData }) {
    const [timeLimit, setTimeLimit] = useState(0);
    const [errorText, setErrorText] = useState('');

    const onChangeHandler = (e) => {
        const timerValue = e.target.value ? parseInt(e.target.value) : ''
        if (timerValue) { setErrorText('') }
        setTimeLimit(timerValue)
    }

    const addTimerClickHandler = () => {
        debugger
        if (!timeLimit) {
            setErrorText('CountDown can not set to 0 or null')
            return;
        }
        let timerInitialData = {
            currentState: 'started',
            limit: timeLimit,
            currentValue: '',
            isFinished: false
        }
        addNewTimerData(timerInitialData, 'create')
        setTimeLimit(0)
        setErrorText('')
    }

    return {
        onChangeHandler,
        addTimerClickHandler,
        timeLimit,
        errorText
    }
}