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
    
         else if (req.url === '/index.html') {

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

           else if (req.url.startsWith('/papercode/')) {
        // Extract the paper code from the URL
        const paperCode = req.url.split('/').pop();

        // Dynamically generate HTML content based on the paper code
        const dynamicHtml = `
    <html>
    <head>
        <title>Paper Code: ${paperCode}</title>
    </head>
    <body>
        <h1>Paper Code: ${paperCode}</h1>
        <p>This is the content for paper code ${paperCode}.</p>
        <button id="deleteButton">Delete Paper Code</button>
    </body>
    <script>
        document.getElementById('deleteButton').addEventListener('click', () => {
            // Use JavaScript to send a delete request to your server
            // and remove the paper code from your database.
        });
    </script>
    </html>
`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(dynamicHtml);
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
