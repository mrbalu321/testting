<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Web Page with JavaScript</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #f0f8ff;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin-top: 20px;
            cursor: pointer;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
        }
        button:hover {
            background-color: #218838;
        }
        #message {
            margin-top: 30px;
            font-size: 20px;
            color: #333;
        }
    </style>
</head>
<body>

    <h1>Welcome to My Simple Web Page</h1>
    <p>Click the button below to see some JavaScript in action!</p>

    <button onclick="showMessage()">Click Me</button>

    <div id="message"></div>

    <script>
        function showMessage() {
            const messages = [
                "Hello, world!",
                "You clicked the button!",
                "JavaScript is awesome!",
                "Have a great day!",
                "Wubba Lubba Dub-Dub!"
            ];
            // Pick a random message
            const randomIndex = Math.floor(Math.random() * messages.length);
            document.getElementById("message").textContent = messages[randomIndex];
        }
    </script>

</body>
</html>
