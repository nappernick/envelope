import { useEffect, useRef } from 'react';

export const configDate = (date) => {
    if (!date) return
    let dateArr = date.split(" ")
    // Fri, 15 Jan 2021 13:24:45 GMT
    const [day, numDate, month, year, time, timeZone] = dateArr
    const timeArr = time.split(":")
    const [hour, minute,] = timeArr
    let correctedHour = hour
    let newHour = correctedHour > 12 ? correctedHour - 12 : correctedHour
    let newDate = `${day} ${month} ${numDate}th ${year} at ${newHour}:${minute} ${correctedHour > 12 ? "PM" : "AM"}`
    return newDate
}


export const shortConfigDate = (date) => {
    if (!date) return
    const dates = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // Fri, 15 Jan 2021 13:24:45 GMT
    const [, numDate, month, year,] = date.split(" ")
    let monthNum = dates.indexOf(month)
    let newYear = year.split("").splice(2).join("")
    let newDate = `${monthNum}/${numDate}/${newYear}`
    return newDate
}

export const dateToLocalTime = (date) => {
    if (!date) return
    let dateArr = date.split(" ")
    const [, , , , time,] = dateArr
    const [hour, minute,] = time.split(":")
    let newHour = hour > 12 ? hour - 12 : hour
    let newTime = `${newHour}:${minute} ${hour > 12 ? "PM" : "AM"}`
    return newTime
}


export const decimalToMinSec = (time) => {
    if (!time) return
    if (time.toString().split("").indexOf(".") === -1) return `${time}min`
    else {
        const timeArr = time.toString().split(".")
        const [min, secDec] = timeArr
        const sec = (parseFloat(`.${secDec}`) * 60).toString().split(".")[0]
        return `${min}min ${sec}sec`
    }
}

// For use in polling
export function useInterval(callback, delay) {
    const savedCB = useRef()
    useEffect(() => {
        savedCB.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            savedCB.current()
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id)
            }
        }
    }, [callback, delay])
}
