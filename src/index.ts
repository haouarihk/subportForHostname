import fastify from "fastify";
import http from "http";

import ip from "ip";

import dotenv from 'dotenv'; dotenv.config();

const app = fastify();

async function setup() {
    console.log(ip.address())
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

    // http.createServer().on('request',app)
    try {
        await app.listen(process.env.port || 80, process.env.host || ip.address(), () => console.log("server started"))
    } catch (err) {
        console.log(err)
    }

}

setup();