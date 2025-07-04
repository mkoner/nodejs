const cluster = require('cluster');
const os = require('os');
const express = require('express');

const PORT = 3000;

if (cluster.isMaster) {
    cluster.schedulingPolicy = cluster.SCHED_NONE; // Round-robin scheduling policy
    const numCPUs = os.availableParallelism() ? os.availableParallelism() : os.cpus().length;
    console.log(`Master process ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Spawning a new one.`);
        cluster.fork();
    });
} else {
    const app = express();

    app.get('/', (req, res) => {
        console.log(`Worker ${process.pid}`);
        res.send(`Hello from worker ${process.pid}`);
    });

    app.get('/compute', (req, res) => {
        console.log(`Worker ${process.pid} starting CPU intensive task...`);
        let sum = 0;
        for (let i = 0; i < 1e10; i++) {
            sum += i;
        }
        res.send(`Worker ${process.pid} computed sum: ${sum}`);
    });

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started server on port ${PORT}`);
    });
}