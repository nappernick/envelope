export const configDate = (date) => {
    if (!date) return
    let dateArr = date.split(" ")
    // Fri, 15 Jan 2021 13:24:45 GMT
    const [day, numDate, month, year, time, timeZone] = dateArr
    const timeArr = time.split(":")
    const [hour, minute, second] = timeArr
    let newHour = hour > 12 ? hour - 12 : hour
    let newDate = `${day} ${month} ${numDate}th ${year} at ${newHour}:${minute} ${hour > 12 ? "PM" : "AM"}`
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
    const [, , , , time, timeZone] = dateArr
    const [hour, minute, second] = time.split(":")
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
        // debugger
        return `${min}min ${sec}sec`
    }
}
