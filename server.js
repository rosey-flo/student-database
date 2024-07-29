const express = require('express')

const client = require('./db/connection.js')
const api_routes = require('./routes/api_routes')

//allow json to be sent through requests
const app = express();
const PORT = 3333;

//load routes
app.use(express.json());

app.use('/api', api_routes)

client.connect()
    .then(() => {
        console.log('DB connected');

        app.listen(PORT, () => {
            console.log('Express server started on port', PORT)
        })
    })

