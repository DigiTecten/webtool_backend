var express=require('express');
var app = express(),
    port = 8080;

/* app.get('/',function(req,res)
{
    res.send('Hello World!');
}); */
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var server = app.listen(port,function() {
    console.log('The server is listening on port '+port+'...');
});

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/postFile', function(request, response){
    console.log(request);
});