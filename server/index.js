
const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const tasks = require('./routes/api/tasks')
app.use('/api/tasks', tasks);


// handle production 

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res => res.sendFile(__dirname + '/public/index.html')));
}



const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`server started on port ${port}`));
app.set("port", PORT);