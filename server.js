const express = require('express')
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({}))

const route = require("./router");

app.use('/api',route);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});


