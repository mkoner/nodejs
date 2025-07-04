const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json());
const cpuItenseTask = () => {
    let sum = 0;
    for (let i = 0; i < 1e10; i++) {
        sum += i;
    }
    return sum;
}

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.get('/cpu', (req, res) => {
    console.log('Starting CPU intensive task...');
    const result = cpuItenseTask();
    console.log('CPU intensive task completed.');
    res.send('CPU intensive task completed! , result: ' + result);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});