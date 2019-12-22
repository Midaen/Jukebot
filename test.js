console.log("Hello world");

var http = require('http');
var url = require('url');
var querystring = require('querystring');


var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if(page=='/'){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('Bienvenue sur la page principale');
        if('prenom' in params)
        {   
          res.write(' '+params['prenom']);
        }
    }
    else if(page=='/home'){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write('Bienvenue sur la page home');
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('Cette page n\'existe pas');
    }
    res.end();
  });


server.on('close', function() { // On écoute l'évènement close
  console.log('Bye bye !');
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close