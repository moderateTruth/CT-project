const express = require('express');
const Unblocker = require('unblocker');
const app = express();

const unblocker = new Unblocker({ prefix: '/proxy/' });

// Initialize the unblocker layout middleware
app.use(unblocker);

// Standard home landing screen redirecting to your game gateway
app.get('/', (req, res) => {
    res.send(`
        <html>
        <body style="font-family:sans-serif; text-align:center; padding-top:100px; background:#111; color:#fff;">
            <h1>Educational Resource Directory</h1>
            <p>Enter a target educational domain below:</p>
            <input id="url" type="text" placeholder="e.g. google.com" style="padding:10px; width:300px; border-radius:4px; border:none; margin-bottom:10px;"><br>
            <button onclick="launch()" style="padding:10px 20px; background:#007bff; color:#fff; border:none; border-radius:4px; cursor:pointer;">Launch Session</button>
            <script>
                function launch() {
                    const input = document.getElementById('url').value;
                    if(input) {
                        let target = input.replace(/^(https?:\\/\\/)?/, 'https://');
                        window.location.href = '/proxy/' + target;
                    }
                }
            </script>
        </body>
        </html>
    `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server globally broadcasting on port ${port}`);
}).on('upgrade', unblocker.onUpgrade); // Bypasses websockets for multiplayer data
