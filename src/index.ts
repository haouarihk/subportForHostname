import fastify from "fastify";

import ip from "ip";

import dotenv from 'dotenv'; dotenv.config();

const app = fastify();

app.addHook('onRequest', async (req, reply) => {
    // @ts-ignore
    const path = req.params['*']
    // @ts-ignore
    const port = req.query.port || req.query.p;

    reply.redirect(new URL(path || "", `http://${ip.address()}:${port}`).toString());
})

app.listen(process.env.port || 80, "localhost", () => console.log("server started"));