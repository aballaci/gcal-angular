// lib/server.ts
import app from "./app";
const PORT = 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log('Express server listening on port ' + PORT);
})
