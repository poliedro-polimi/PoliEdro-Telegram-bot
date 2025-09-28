import { Bot } from "grammy"
import "jsr:@std/dotenv/load";

const bot = new Bot(Deno.env.get("BOT_TOKEN_TEST"))

bot.use(async (ctx, next) => {
  const botDeveloperId = Number(Deno.env.get("ADMIN_ID"))

  ctx.config = {
    botDeveloper: botDeveloperId,
    isDeveloper: ctx.from?.id === botDeveloperId
  }

  await next()
})

// Commands
bot.chatType("private").command("start", (ctx) => ctx.reply("Ciao! Sono Florence, la mascotte di PoliEdro e il bot del gruppo Telegram di Associazione."));

bot.command("report", (ctx) => ctx.reply("Ecco la lista di eventi in programma: TEST"));

bot.on("message", (ctx) => {
    if (ctx.config.isDeveloper) {
      ctx.reply("Ciao Developer! 👋")
    } else {
      ctx.reply("Perché mi mandi messaggi? 🤨 Tanto non ti rispondo!")
    }
  }
);

console.log(`%cFlorence - Version: ${Deno.env.get("BOT_VERSION")} - Ready...`, "color: green; font-weight: bold");

bot.start();
