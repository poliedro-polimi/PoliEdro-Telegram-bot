import { Bot } from "grammy";
import "jsr:@std/dotenv/load";
import {userCommands} from "@app/commands/user-command-group.ts";
import {adminCommands} from "@app/commands/admin/admin-command-group.ts";
import {me} from "@app/commands/me.ts";

import {Database} from "@lib/types/database.types.ts";
import {SupabaseClientFactory} from "@lib/supabase/supabase-client-factory.ts";
import {eventsRecap} from "./src/app/commands/admin/events-recap.ts";

// Setup
// console.log(Deno.args)
const isRunningLocally = Deno.args.includes("sb-local")

const bot_token = isRunningLocally ? Deno.env.get("BOT_TOKEN_TEST") : Deno.env.get("BOT_TOKEN_TEST")

const bot = new Bot(bot_token)
const supabase = SupabaseClientFactory.getClient()

// Type Aliases
type Admin = Database['public']['Tables']['Admin']['Row']

const admins: Admin[] = await supabase.from("Admin").select("*")
console.debug(admins.data)

// Middleware to add config to context
bot.use(async (ctx, next) => {
  ctx.config = {
    isDeveloper: admins.data.some((admin: Admin) => admin.user_id === ctx.from.id)
  }

  await next()
})

//TODO: load events and send error import

// Commands
bot.use(userCommands);
bot.chatType("private").use(me).use(eventsRecap)

bot.filter((ctx) => ctx.config.isDeveloper).use(adminCommands)

// Listeners
bot.on("message:photo", (ctx) => {
  console.log(ctx)

  ctx.replyWithPhoto(ctx.message.photo[ctx.message.photo.length - 1].file_id).then(_ => {})
  ctx.reply("Bella foto! 📸").then(_ => {})
})

bot.on("message", (ctx) => {
  ctx.replyWithPhoto("AgACAgQAAxkBAAIBC2ja-mTsmVu_JT2KwhZFFEPMv9q3AAIgzzEbs53YUtuGdqCRZgNJAQADAgADeQADNgQ", { caption: "Ecco una foto per te!" }).then(_ => {})
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

if (isRunningLocally) console.log(`\n%c⚠️ RUNNING ON LOCAL ENVIRONMENT`, "color: yellow; font-weight: bold");
console.log(`%cFlorence 🐸 - Version: ${Deno.env.get("BOT_VERSION")}` + (isRunningLocally ? " (LOCAL) " : "") + "- Ready...", "color: green; font-weight: bold");
