import { httpServerHandler } from "cloudflare:node"
import "./index.js"

export default httpServerHandler({ port: Number(process.env.PORT) })
