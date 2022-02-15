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

app.get('/', (req, rep) => {
    rep.send(200)
})


console.log(ip.address())

app.listen(process.env.port || 80, process.env.host || ip.address(), () => console.log("server started"));