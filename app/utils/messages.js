const moment = require("moment");

const formatMessage = (username, message) => {
    return {
        username: username,
        message: message,
        time: moment().format("h:mm a"),
    }
}

module.exports = formatMessage;