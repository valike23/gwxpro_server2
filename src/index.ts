import fastify, { FastifyError, FastifyInstance, FastifyListenOptions } from 'fastify';
import socketioServer from 'fastify-socket.io'
const fastifyCors = require('@fastify/cors');
import { AccountsRoute } from './routes/accounts.route';
const { PORT } = process.env;
const myPort = PORT as unknown as number || 4000;

const app = fastify() as unknown as FastifyInstance & { io: any };
app.register(socketioServer);
app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
app.get('/', async (request, reply) => {
    return { message: 'Hello, World!' };
});

app.register(AccountsRoute, { prefix: '/api' });

// 404 Not Found error handler
app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ message: '404 Not Found' });
});


// 500 Internal Server Error handler
app.setErrorHandler((error: FastifyError, request, reply) => {
    console.error(error);
    reply.code(500).send({ message: 'Internal Server Error' });
});
let opts: FastifyListenOptions = {
    port: myPort, host: '::'
};
app.listen(opts, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running on ${address}`);
});

app.ready(err => {
    if (err) throw err;
    app.io.on("connection", (socket: any) => console.info('Socket connected!', socket.id));
})