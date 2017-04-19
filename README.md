# Seth Terry Node Work Sample

```
################### NOTE ######################
# You will need node version 4.X.X or greater #
# to run the project files.                   #
###############################################
```
#### Project directory layout
<pre><code>·
├─ /src/              # Folder containing the project files
│  ├─ /server.js      # Starts the server. This is the file you'll modify to extend the web service.
│  ├─ /client.js      # Starts the client. This is the file that consumes the web service.
│  ├─ /constants.js   # Contains constants and functions used by both the client and the server. Feel free to use and modify this file.
│
├─ /node_modules/     # Folder containing Node.js <a href="https://docs.npmjs.com/files/folders#node-modules">third-party libraries and modules</a>.
│
├─ <a href="https://docs.npmjs.com/files/package.json">package.json</a>       # File which lists all of the third party libraries used by the project.
│                     # <a href="https://docs.npmjs.com">npm</a> uses this file to download the libraries.
│                     # Feel free to use any npm packages you wish to complete the project.
</code></pre>

## Getting started

First you'll need to install Node.js (if you don't already have it installed).
It's available [here](https://nodejs.org/en/download/).

If you've already installed Node, make sure you have v4.X.X or higher.

Once you've got Node up and running, clone this repository and cd into
the project directory.


Then you'll need to install the third party libs used by the project.
```
npm install
```

Now, you're ready to test the client and server.
You'll need to run the client and server in separate shells.

```
# Start up the server. You can leave this running in its own shell.
node src/server.js

# Run the client.
node src/client.js
```

################### NOTE ######################
# set "module.exports.ip" in src/contants.js #
# to ip of docker host                       #
###