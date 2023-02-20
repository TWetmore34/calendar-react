export interface ICalendarProps {
    monthDisplay: {
        startIdx: number;
        numDays: number;
        monthIdx: number;
    }
    month: string;
    intent: "full" | "shrunk";
}

export interface ICla {
    outer: {
        full: string;
        shrunk: string
    }
    inner: {
        full: string;
        shrunk: string;
    }
    days: {
        shrunk: string[]
        full: string[]
    }
}

export interface IMonthInfo {
    date: number
    today: boolean;
    weekend: boolean;
    outsideMonth: boolean;
}

export interface IMonthDisplay {
    monthDisplay: {
        startIdx: number;
        numDays: number;
        monthIdx: number;
    }
}

export interface IYearInfo extends IMonthDisplay {
    month: string;
}