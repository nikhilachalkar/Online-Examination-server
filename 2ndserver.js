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
            background-color: #5e99f2;
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
        /* Style the document list container */
#documentList {
  list-style-type: none;
  max-width: 900px;padding:0;
  
  margin: 0;
}

/* Style each document list item */
#documentList li {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  margin: 5px 0;
  width: 600px;
  height: 40px;
  padding: 0;
  border-radius: 5px;
}

/* Hover effect for document list items */
#documentList li:hover {
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

/* Style the document name and user */
#documentList li strong {
  font-weight: bold;
}

/* Add spacing between document name and user */
#documentList li span {
  margin-left: 10px;
}

/* Add a button or link for downloading documents if needed */
#documentList li a {
  text-decoration: none;
  color: #0078d4;
  font-weight: bold;
  margin-left: 10px;
}

/* Style for success message */
#successMessage {
  color: green;
  margin-top: 10px;
}

/* Style for error message */
#errorMessage {
  color: red;
  margin-top: 10px;
}

    
    
        </style>
        <body>
            <h1>Paper Code: ${paperCode}</h1>
            <p>This is the content for paper code ${paperCode}.</p>
            <button type="submit" id="deleteButton" href="https://aiscribeupload.onrender.com/index.html">Delete Paper Code</button>
    
            <div style="display: flex;
           ">
            <ul id="documentList" ></ul>
            <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

    <dotlottie-player src="https://lottie.host/9801f749-a481-4c08-acfa-5a36391f1d9d/NgW04hUFra.json" background="transparent" speed="1" style="width: 500px; height: 500px;" loop autoplay></dotlottie-player>

            </div>
    
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
                      console.log("Received message:", message);
                   
    const documentList = document.getElementById('documentList');
    
                // Clear any existing content in the list
                documentList.innerHTML = '';
    
             // Iterate through the retrieved documents and create list items
    message.document.forEach((docu) => {
        const listItem = document.createElement('li');
    
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
    
        
        // Split the document name and user
        const nameParts = docu.name.split(' ');
        const userNameParts = docu.user.split(' ');
      const pdfData = docu.pdfData; // Assuming pdfData is the base64 content
      const name= docu.user;
        // Create separate elements for name and user
        const nameElement = document.createElement('strong');
       
        nameElement.textContent = "Name of Paper : " + nameParts.join(' ');
    
        const userElement = document.createElement('span');
        userElement.textContent = "User: " + userNameParts.join(' ');
    
        // Add the elements to the list item
        listItem.appendChild(nameElement);
        listItem.appendChild(userElement);
    
    downloadButton.addEventListener('click', () => {
      
        // Create a Blob from the base64 content
        const blob = new Blob([atob(pdfData)], { type: 'text/plain' });
    
        // Create an object URL from the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a link and trigger the download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name; // Set the desired file name
        document.body.appendChild(a);
        a.click();
    
        // Clean up the object URL
        URL.revokeObjectURL(url);
    });
    
        // Append the download button to the list item
        listItem.appendChild(downloadButton);
        // Append the list item to the document list
        documentList.appendChild(listItem);
    });
    
                      }
                      else
                      {
                      console.log("Received message:", message);
                      }
                      
      
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
