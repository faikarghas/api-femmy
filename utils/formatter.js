// normalize phone
function normalizePhone(phone) {
    phone = phone.toString()
    if (phone.startsWith("62")) {
        return phone.replace("62", "")
    } else if (phone.startsWith("0")) {
        return phone.replace("0", "")
    } else {
        return phone
    }
}

// capitalize word
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// x Seconds to x Day, x Hours, x Minute, x Seconds
function secondsToDHMS(seconds) {
    seconds = Number(seconds)
    let d = Math.floor(seconds / (3600*24))
    let h = Math.floor(seconds % (3600*24) / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    
    let dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : ""
    let hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : ""
    let mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : ""
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""
    
    let result = dDisplay + hDisplay + mDisplay + sDisplay 
    return result != "" ? result : "0 seconds"
}

module.exports = { normalizePhone, capitalize, secondsToDHMS }