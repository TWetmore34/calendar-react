import { useEffect, useState, useRef } from 'react'
import {ICalendarProps, ICla, IMonthInfo} from "../types/types"
import { useDateContext, useDisplayContext } from '../context/contextStore'
const Calendar = ({monthDisplay, intent, month}: ICalendarProps) => {
    // handles styling between large and small calendar displays. 
    // intent is typed to either full or shrunk and classes in jsx are defined by csa[intent]
    const cla: React.MutableRefObject<ICla> = useRef({
        outer:  {
            full: "calendar__container--full",
            shrunk: "calendar__container--shrunk"
        },
        inner:  {
            full: "calendar--dates__container-full",
            shrunk: "calendar--dates__container"
        },
        days: {
            shrunk: ["S", "M", "T", "W", "TR", "F", "S"],
            full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        }
    })
    const [display, setDisplay] = useDisplayContext()
    const [curViewDate, setCurViewDate] = useDateContext()
    const [monthArray, setMonthArray] = useState<IMonthInfo[]>([])
    useEffect(() => {
        let start: IMonthInfo[] = []
        let datePointer: Date = new Date()
        for (let i = -monthDisplay.startIdx + 1; i <= 35 - monthDisplay.startIdx; i++) {
            const curDate: Date = new Date()
            // refactor to pass in current year as well - setting to getFullYear breaks the display on any year other than the current
            datePointer.setFullYear(curViewDate.year, monthDisplay.monthIdx, i)
            let today: boolean = false
            let weekend: boolean = false
            let outsideMonth: boolean = false
            if(curDate.getDate() === datePointer.getDate() 
            && curDate.getMonth() === monthDisplay.monthIdx) {
                today = true
            }
            if (datePointer.getDay() === 0 || datePointer.getDay() === 6) {
                weekend = true
            }
            if(datePointer.getMonth() !== monthDisplay.monthIdx) {
                outsideMonth = true
            }
            start.push({date: datePointer.getDate(), today, weekend, outsideMonth})
        }
        setMonthArray(start)
    },[monthDisplay, curViewDate.year])

    const handleClick = () => {
        if(display) return null
        setDisplay(true)
        setCurViewDate({...curViewDate, month: monthDisplay.monthIdx + 1})
    }
  return (
    <div onDoubleClick={handleClick} className={cla.current.outer[intent]}>
        <p className={intent === "full" ? "month-title" : "text-title"}>
            {month} {curViewDate.year}
        </p>
        <div className='calendar--days__container'>
            {cla.current.days[intent].map(e => 
            <p className={`day-list ${(intent === "full" ? "align-end" : "center-text")}`}>{e}</p>)}
        </div>
        <div className={cla.current.inner[intent]}>
            {monthArray.map((el: any) => {
                let classNamesOuter = "w-dates"
                let classNamesInner = "pad-text"
                if(intent === "full") classNamesOuter += " border"
                if (el.today) {
                    classNamesInner += " bg-highlight"
                }
                if (intent === "full") {
                    classNamesOuter += " align-end"
                    if(el.weekend) {
                        classNamesOuter += " bg-grey"
                    }
                } else {
                    classNamesInner += " center-text"
                }
                if(el.outsideMonth) {
                    classNamesInner += " text-light"
                }
                return (
                <div className={classNamesOuter}>
                    <p className={classNamesInner}>{el.date}</p>
                </div>)
            })}
        </div>
    </div>
  )
}

export default Calendar