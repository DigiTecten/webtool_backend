const cors = require("cors");
const express = require('express');
const app = express(),
    port = 8080;

global.__basedir = __dirname;

var corsOptions = {
    origin: `http://localhost:5000`
};
  
app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
})

/*
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/postFile', function(request, response){
    console.log(request);
});
*/