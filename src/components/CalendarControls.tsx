import { useEffect, useState, useRef, useCallback } from "react"
import { useDateContext, useDisplayContext } from "../context/contextStore"
import Calendar from "./Calendar"
import FullYear from "./FullYear"
const CalendarControls = () => {
    const [displayMonth, setDisplayMonth] = useDisplayContext()
    // curDate handles changes to calendar view based on user input
    const curDate = useRef<Date>(new Date())
    const [dateInfo, setDateInfo] = useDateContext()
    // this could be exported and reused with the full year component if refactored
    const memoizedFindMonthInfo = useCallback(function findMonthInfo(date: Date) {
        // NOTE: 3rd argument sets date. if not set explicity, you will skip months later on
        date.setFullYear(dateInfo.year, dateInfo.month - 1, 1)
        const startIdx = date.getDay()
        // numDays found by adding one to the cur month, then setting date to 0
        date.setFullYear(dateInfo.year, date.getMonth() + 1, 0)
        const monthIdx = date.getMonth()
        const numDays = date.getDate()
        return {startIdx, numDays, monthIdx}
    }, [dateInfo.month, dateInfo.year])
    
    const [monthDisplay, setMonthDisplay] = useState(memoizedFindMonthInfo(curDate.current))

    useEffect(() => {
        setMonthDisplay(memoizedFindMonthInfo(curDate.current))
    },[dateInfo, curDate, memoizedFindMonthInfo])

    const handleMonthDec = () => {
        if(dateInfo.month === 1) {
            setDateInfo({...dateInfo, month: 12, year: dateInfo.year - 1})
        } else {
            setDateInfo({...dateInfo, month: dateInfo.month - 1})
        }
    }
    const handleMonthInc = () => {
        if(dateInfo.month === 12) {
            setDateInfo({...dateInfo, year: dateInfo.year + 1, month: 1})
        } else {
            setDateInfo({...dateInfo, month: dateInfo.month + 1})
        }
    }

  return (
    <div>
        {displayMonth ? 
        <div className="center-text">
        <button onClick={handleMonthDec}>prev Month</button>
        {dateInfo.month}/{dateInfo.year}
        <button className="center-text" onClick={handleMonthInc}>next Month</button>
        </div>
        : dateInfo.year}
        <button onClick={() => setDisplayMonth(!displayMonth)}>{displayMonth ? "Full Year" : "Current month"}</button>
        {displayMonth ? 
        <Calendar intent="full" monthDisplay={monthDisplay} month={curDate.current.toDateString().split(" ")[1]}/> :
        <FullYear />    
    }
    </div>
  )
}

export default CalendarControls