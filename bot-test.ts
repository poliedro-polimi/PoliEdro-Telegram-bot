import { Bot } from "grammy"
import { CommandContext } from "https://deno.land/x/grammy@v1.38.2/context.ts";
import "jsr:@std/dotenv/load";
import {generateReport} from "./test.ts";

const botTest = new Bot(Deno.env.get("BOT_TOKEN_TEST"))

botTest.use(async (ctx, next) => {
  const botDeveloperId = Number(Deno.env.get("ADMIN_ID"))

  ctx.config = {
    botDeveloper: botDeveloperId,
    isDeveloper: ctx.from?.id === botDeveloperId
  }

  await next()
})

// Commands
botTest.chatType("private").command("start", (ctx) => ctx.reply("Ciao! Sono Florence, la mascotte di PoliEdro e il botTest del gruppo Telegram di Associazione."));

botTest.command("report", generateReport);

botTest.on("message", (ctx) => {
    if (ctx.config.isDeveloper) {
      ctx.reply("Ciao Developer! 👋")
    } else {
      ctx.reply("Perché mi mandi messaggi? 🤨 Tanto non ti rispondo!")
    }
  }
);

console.log(`%cFlorence - Version: ${Deno.env.get("BOT_VERSION")} - Ready...`, "color: green; font-weight: bold");

botTest.start();
