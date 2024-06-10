// ensure env variables
import "./env.js"

import { onDBConnect, knex } from "./config/knex"

onDBConnect()
  .then(() => console.log("success"))
  .catch(e => console.error(e))
