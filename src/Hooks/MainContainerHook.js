import { useState } from "react";

export default function MainContainerHook() {
    const [timersData, setTimersdata] = useState([]);
    const timerSchema = {
        currentState: '',
        limit: '',
        currentValue: '',
        id: '',
        isFinished: false
    }
    const uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return dateString + randomness;
    };

    const addNewTimerData = (data, actionType) => {
        let schema = JSON.parse(JSON.stringify(timerSchema));
        let tempTimersdata = JSON.parse(JSON.stringify(timersData));

        if (actionType === 'create') {
            if (tempTimersdata.length < 10) {
                for (const key in data) {
                    if (schema.hasOwnProperty(key)) {
                        schema[key] = data[key];
                        if (key === 'limit') {
                            schema['id'] = uniqueId()//`${data[key]}-${timersData.length}`
                        }
                    }
                }

                tempTimersdata.push(schema)
            }
        } else if (actionType === 'delete') {
            tempTimersdata = tempTimersdata.filter(item => item.id !== data.id);
        }

        setTimersdata(tempTimersdata);
    }

    return {
        timersData,
        setTimersdata,
        addNewTimerData
    }
}