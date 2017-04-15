var http = require('http'),
    port = require('./constants').port,
    logger = require('./constants').logger,
    X_PROJECT_AUTHENTICATION_KEY = require('./constants').X_PROJECT_AUTHENTICATION_KEY,
    base64 = require('base-64'),
    fs = require("fs"),
    RxHttpRequest = require('rx-http-request').RxHttpRequest,



    // We use async.waterfall to simplify asynchronous requests which depend on the results
    // of previous requests. See https://github.com/caolan/async#waterfall for more details.
    async = require('async'),

    // We use the npm package request (https://github.com/request/request) to greatly
    // simply making http requests.
    request = require('request');

// Tell the server we're going to communicate using JSON.
var baseOptions = {
    headers: {
        'Content-Type': 'application/json',
        'X-Project-Authentication': base64.encode(X_PROJECT_AUTHENTICATION_KEY)
    }
};

// URI of the server.
var baseURI = 'http://localhost:' + port;

// read people.json fil



async.waterfall(
    [
        function(done) {
            // Options for the request.
            var options = Object.assign({},
                baseOptions, { url: baseURI + '/people' }
            );

            // GET http://localhost:9000/people
            request.get(options, function(err, response, body) {
                var statusCode = response.statusCode;
                console.log(err, "get people response", body)

                // Handle errors
                if (err || statusCode !== 200)
                    return done(err || new Error('Error:' + statusCode));
                // Parse the response.
                try {
                    body = JSON.parse(body);
                } catch (parseErr) {

                    console.log(parseErr)
                    return done(new Error('Error parsing response body.'));
                }

                return done(null, body);
            });
        },

        function(allPeople, done) {
            // Pick a random person from the list of people.
            var index = Math.floor(Math.random() * allPeople.length),
                person = allPeople[index];

            // Options for the request.
            var options = Object.assign({},
                baseOptions, { url: baseURI + '/people/' + person.id }
            );

            // Get more info about the peron using the /person/:id endpoint.
            // GET http://localhost:9000/people/:id
            request.get(options, function(err, response, body) {
                var statusCode = response.statusCode;

                // Handle errors
                if (err || statusCode !== 200)
                    return done(err || new Error('Error: ' + statusCode));

                // Parse the response.
                try {
                    body = JSON.parse(body);
                } catch (parseErr) {
                    return done(new Error('Error parsing response body.'));
                }

                return done(null, body);
            });
        },
        function(person,done) {

            // using fs to read people .json 
            var peopleJsonFileString = fs.readFileSync('../people.json', { encoding: 'utf8' });

            // turning string from file read into json  object
            var peopleJson = JSON.parse(peopleJsonFileString)
            
            var batchPeoplePostUrl = baseURI + "/people/batch";

            var options = Object.assign(baseOptions, {
                body: peopleJson,
                json: true, // Automatically stringifies the body to JSON ,
                uri: batchPeoplePostUrl
            })
            
            // post request to a batch people post endpoint
            request.post(options, function(err, response, body) {

                var statusCode = response.statusCode;
                console.log(err, "batch error")

                // Handle errors
                if (err || statusCode !== 200) {
                    console.log(body, "batch post body response")
                    return done(err || new Error('Error: ' + statusCode),person);
                }

                // Parse the response.
                return done(null,person);
            });

        }
    ],

    function(err, person) {
        // Handle any errors from the requests.
        if (err) {
            console.error('An error occurred while contacting the server.');
            console.log(err);
            return;
        }

        logger('Retrieved info about person:');
        console.log(person);
    }
)
