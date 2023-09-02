const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const WebSocket = require('ws');

var mes;
let log= false;
const ws = new WebSocket("wss://aiscribe.onrender.com");
ws.onopen = () => {
                console.log("WebSocket connection established");
            };

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
  
    console.log("Received message:", message);
 mes=message.success;

};

ws.onclose = () => {
                console.log("WebSocket connection closed");
            };





const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML file
        fs.readFile('login.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    // else if (req.url==='/index.html')
    //     {
    //          fs.readFile('index.html', 'utf8', (err, data) => {
    //         if (err) {
    //             res.writeHead(500, { 'Content-Type': 'text/plain' });
    //             res.end('Internal Server Error');
    //         } else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.end(data);
    //         }
    //     });
    //     }
         else if (req.url === '/index.html' && req.method === 'POST') {
        // Handle login form submission
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // Parse the POST data to get username and password
            const formData = new URLSearchParams(body);
            const username = formData.get('username');
            const password = formData.get('password');
console.log("Received username:", username);
    console.log("Received password:", password);
          
            // Perform login validation (you'll need to implement this)

           const loginData = {
                    type: "login",
                    username: username,
                    password: password,
                };
                // Send login request
                ws.send(JSON.stringify(loginData));


          if (mes==='true') {

                // Redirect to the user's dashboard
                res.writeHead(302, {
                    Location: '/index.html',
                });
                res.end();
          }
          else
          {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
          }
            
        });
    }
        else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
