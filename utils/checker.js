const { normalizePhone } = require('./formatter')

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
const phoneRegex = /^(\d{10}|\d{11}|\d{12}|\d{13})$/

// is email valid
let isEmailValid = (email) => {
    if (!email)
        return false;
    if(email.length>254)
        return false;
    const valid = emailRegex.test(email);
    if(!valid)
        return false;
    const parts = email.split("@");
    if(parts[0].length>64)
        return false;
    const domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;
    return true;
}

// is phone valid
let isPhoneValid = (phone) => {
    const nphone = normalizePhone(phone)
    if (nphone.match(phoneRegex)) {
        return true
    }
    else {
        return false
    }
}

module.exports = { isEmailValid, isPhoneValid }