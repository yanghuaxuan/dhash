/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// CommonJs
const fastify = require("fastify")({
  logger: true
});

const path = require("path");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname),
});

fastify.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
