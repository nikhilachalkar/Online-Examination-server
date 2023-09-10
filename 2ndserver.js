const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;


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
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #3d2ede;
        }

        h1 {
            text-align: center;
            color: aliceblue;
            font-size:large;
            margin: 20px 0;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        button[type="submit"] {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        button[type="submit"]:hover {
            background-color: #0056b3;
        }
    </style>
    <body>
        <h1>Paper Code: ${paperCode}</h1>
        <p>This is the content for paper code ${paperCode}.</p>
        <button type="submit" id="deleteButton">Delete Paper Code</button>
<div class="document-box">
        <h2>Document List</h2>
        <ul id="documentList"></ul>
    </div>

    <!-- Add a link to return to the index page -->
    <a href="/index.html">Back to Index</a>

//         <div class="document-box">
//     <h1>Document Details</h1>
//     <p><strong>Code:</strong> <span id="documentName"></span></p>
//     <p><strong>Name:</strong> <span id="documentTime"></span></p>
//     <button type="submit" id="download">Download</button>
// </div>
    </body>
    <script>
   
     const username = localStorage.getItem('username');
 const paperCode = "${paperCode}"; // Define the papercode variable

    const ws = new WebSocket("wss://aiscribe.onrender.com");
            ws.onopen = () => {
                console.log("WebSocket connection established");
                 const Data2 = {
                    type: "retrieveDocument",
                    papercode:paperCode
                    
                };
                // Send login request
                ws.send(JSON.stringify(Data2));
            };

              ws.onmessage = (event) => {
                 message = JSON.parse(event.data);
                 
                if(message.success && message.docu)
                  {
               
 const documentList = document.getElementById('documentList');
             documentList.innerHTML = '';
            // Create list items for each document
            message.document.forEach((doc) => {
        const listItem = document.createElement('li');
        listItem.textContent = doc.name ;
        listItem.textContent=doc.user;
        documentList.appendChild(listItem);
    });
                
                  }
                  else
                  {
                  
                  }
                  console.log("Received message:", message);
  
                };

            ws.onclose = () => {
                console.log("WebSocket connection closed");
            };

            
        document.getElementById('deleteButton').addEventListener('click', () => {
            

        const Data = {
                    type: "delete",
                    papercode:paperCode,
                    username:username
                   
                };
                // Send login request
                ws.send(JSON.stringify(Data));
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
