// The port to run the server on.
module.exports.port = 80;
module.exports.ip = "192.168.99.100";

// mongoConnectionUrlString
module.exports.mongoUrl = 'mongodb://' + "mongodb" + ':27017/peopleDemo';

module.exports.peopleCollection = "people";


// Log messages to the console. Prepends the current time.
module.exports.logger = function logToConsole() {
    function formatTime(number) {
        if (number < 10)
            return '0' + number;
        return number;
    }

    // Concatenates the arguments provided to the function, separated by spaces.
    var message = Array.prototype.join.call(arguments, ' ');

    // Format the current time
    var now = new Date(),
        time = formatTime(now.getHours()) + ':' + formatTime(now.getMinutes()) + ':' + formatTime(now.getSeconds());


    // Log the message
    console.log(time, message);
};

// The port to run the server on.
module.exports.X_PROJECT_AUTHENTICATION_KEY = "this is terrible API key";
