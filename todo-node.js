var connect = require('connect');
connect.createServer(
        connect.static(__dirname)
        ).listen(8181, "127.0.0.1", function() {
    //runs when our server is created
    console.log('Server running at http://127.0.0.1:8181/');
});