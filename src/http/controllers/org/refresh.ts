// import { FastifyReply, FastifyRequest } from "fastify";

// export async function RefreshToken(
//   request: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   await request.jwtVerify({ onlyCookie: true });

//   console.log(request.user.sub);
//   const token = await reply.jwtSign(
//     {},
//     {
//       sign: {
//         sub: request.user.sub,
//       },
//     },
//   );
//   const refreshToken = await reply.jwtSign(
//     {},
//     {
//       sign: {
//         sub: request.user.sub,
//         expiresIn: "7d",
//       },
//     },
//   );
//   return reply
//     .setCookie("refresh", refreshToken, {
//       path: "/",
//       secure: true,
//       sameSite: true,
//       httpOnly: true,
//     })
//     .status(200)
//     .send({ token });
// }
