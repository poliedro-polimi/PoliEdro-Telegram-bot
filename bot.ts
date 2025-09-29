import { Bot } from "grammy";
import "jsr:@std/dotenv/load";
import {userCommands} from "./commands/user-command-group.ts";
import {adminCommands} from "./commands/admin/admin-command-group.ts";
import {me} from "./commands/me.ts";

import { createClient } from "@supabase/supabase-js";

//load events and send error import TODO

const bot = new Bot(Deno.env.get("BOT_TOKEN_TEST"))
const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_KEY"));

// Middleware to add config to context
bot.use(async (ctx, next) => {
  const botDeveloperId = Number(Deno.env.get("ADMIN_ID"))

  ctx.config = {
    botDeveloper: botDeveloperId,
    isDeveloper: ctx.from?.id === botDeveloperId
  }

  await next()
})

// Commands
bot.use(userCommands);
bot.chatType("private").use(me)

bot.filter((ctx) => ctx.config.isDeveloper).use(adminCommands)

// Listeners
bot.on("message", (ctx) => {
    if (ctx.config.isDeveloper) {
      ctx.reply("Ciao Developer! 👋")
    } else {
      ctx.reply("Perché mi mandi messaggi? 🤨 Tanto non ti rispondo!")
    }
  }
);

// Start the bot
bot.start()
  .then(() => {
    console.log(`Florence is shutting down...`, "color: red; font-weight: bold");
  })
  .catch((err) => {
    console.error("%cSi è verificato un errore: ", err, "color: red; font-weight: bold");
  });
console.log(`%cFlorence - Version: ${Deno.env.get("BOT_VERSION")} - Ready...`, "color: green; font-weight: bold");
