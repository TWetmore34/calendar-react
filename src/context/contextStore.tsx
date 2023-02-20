import React, {useContext, createContext, useState} from "react"

const ViewDateContext = createContext({});
const DisplayMonthContext = createContext({});
export const useDateContext: any = () => {
    return useContext(ViewDateContext)
}

export const useDisplayContext: any = () => {
    return useContext(DisplayMonthContext)
}

export default function ContextStoreProvider ({children}: {children: React.ReactNode}) {
    const [dateView, setDateView] = useState<any>({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })
    const [displayMonth, setDisplayMonth] = useState<any>(true)
    return (
    <ViewDateContext.Provider value={[dateView, setDateView]}>
        <DisplayMonthContext.Provider value={[displayMonth, setDisplayMonth]}>
            {children}
        </DisplayMonthContext.Provider>
    </ViewDateContext.Provider>
)}