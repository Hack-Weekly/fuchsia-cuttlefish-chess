const express = require('express')
const cors = require('cors');
const http = require('dotenv');



const app = express();
const port = 7777;
var corsOptions = {
    //Implement cors having blacklist of ips
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json())
app.get("/", function(req, res) {
    res.send('Hello World');
})

const server = http.createServer(app)

server.listen(port, () => console.log("Server running on port: " + port));