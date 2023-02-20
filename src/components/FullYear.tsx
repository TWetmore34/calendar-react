import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import {IYearInfo} from "../types/types"
const FullYear = () => {
    const [fullYear, setFullYear] = useState<IYearInfo[]>([])
    useEffect(() => {
        setFullYear([])
        const date = new Date()
        for(let i = 0; i < 12; i++) {
            date.setFullYear(date.getFullYear(), i, 1)
            let startIdx = date.getDay()
            date.setFullYear(date.getFullYear(), i + 1, 0)
            const numDays = date.getDate()
            const monthIdx = date.getMonth()
            const month = date.toDateString().split(" ")[1]
            setFullYear((y: IYearInfo[]) => [...y, {monthDisplay: {startIdx, numDays, monthIdx}, month}])
        }
    },[])
  return (
    <div className='full-year__container'>
        {fullYear.map((e: IYearInfo, i:number) => {
            return (
                <Calendar intent='shrunk' monthDisplay={e.monthDisplay} key={i} month={e.month}/>
            )
        })}
    </div>
  )
}

export default FullYear