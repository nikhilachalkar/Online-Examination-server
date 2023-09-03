const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

// let mes=0;
// let message;
// function handleWebSocketMessage(message) {
//     const parsedMessage = JSON.parse(message);
//     console.log("Received message:", parsedMessage);

//     if (parsedMessage.success) {
//         // Redirect to the user's dashboard
//         mes=1;
//     }
//   else{
//     mes=0;
//   }
// }
// const ws = new WebSocket("wss://aiscribe.onrender.com");
// ws.onopen = () => {
//                 console.log("WebSocket connection established");
//             };

// ws.onmessage = (event) => {
//      message = JSON.parse(event.data);
  
//     console.log("Received message:", message);
  
// };

// ws.onclose = () => {
//                 console.log("WebSocket connection closed");
//             };





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
    
         else if (req.url === '/index.html' || req.method === 'GET') {
        // Handle login form submission
        // let body = '';
        // req.on('data', (chunk) => {
        //     body += chunk.toString();
        // });

        // req.on('end', () => {
        //     // Parse the POST data to get username and password
        //     const formData = new URLSearchParams(body);
        //     const username = formData.get('username');
        //     const password = formData.get('password');
    
        //     // Perform login validation (you'll need to implement this)

        //    const loginData = {
        //             type: "login",
        //             username: username,
        //             password: password,
        //         };
        //         // Send login request
        //         ws.send(JSON.stringify(loginData));    

  

            //});


             fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
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
