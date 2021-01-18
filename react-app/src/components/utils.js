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
