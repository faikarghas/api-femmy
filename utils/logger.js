function SetZero(num) {
    if(num < 10) {
        return '0'+num;
    } else {
        return num;
    }
}

function LogStr(str, color) {
    let date = new Date();
    let date_str = `${SetZero(date.getDate())}/${SetZero(date.getMonth() + 1)}/${SetZero(date.getFullYear())} ${SetZero(date.getHours())}:${SetZero(date.getMinutes())}:${SetZero(date.getSeconds())}`
    console.log(`${color}               ${date_str}   ||  ${str} `);
}

function LogError(str) {
    LogStr('[ERROR] ' + str, '\x1b[31m');
}

function LogWarning(str) {
    LogStr('[WARNING] ' +str, '\x1b[33m');
}

function LogOk(str) {
    LogStr('[OK] ' +str, '\x1b[32m');
}

function LogInfo(str) {
    LogStr('[INFO] ' +str, '\x1b[36m');
}

function log(type, str) {
    switch(type) {
        case 'error':
            LogError(str);
            break;

        case 'info':
            LogInfo(str);
            break;

        case 'warning':
            LogWarning(str);
            break;

        case 'ok':
            LogOk(str);
            break;

        default:
            LogInfo(str);
            break;    
    }
}

module.exports = { log }