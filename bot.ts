import { Bot } from "grammy";
import "jsr:@std/dotenv/load";
import {userCommands} from "./commands/user-command-group.ts";
import {adminCommands} from "./commands/admin/admin-command-group.ts";
import {me} from "./commands/me.ts";

import { createClient } from "@supabase/supabase-js";
import {Database} from "./src/lib/types/database.types.ts";

// Setup
// console.log(Deno.args)
const isRunningLocally = Deno.args.includes("sb-local")

const bot_token = isRunningLocally ? Deno.env.get("BOT_TOKEN_TEST") : Deno.env.get("BOT_TOKEN_TEST")
const supabase_url = isRunningLocally ? Deno.env.get("SUPABASE_URL_LOCAL") : Deno.env.get("SUPABASE_URL")
const supabase_key = isRunningLocally ? Deno.env.get("SUPABASE_KEY_LOCAL") : Deno.env.get("SUPABASE_KEY")

const bot = new Bot(bot_token)
const supabase = createClient<Database>(supabase_url, supabase_key);

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

if (isRunningLocally) console.log(`\n%c⚠️ RUNNING ON LOCAL ENVIRONMENT`, "color: yellow; font-weight: bold");
console.log(`%cFlorence 🐸 - Version: ${Deno.env.get("BOT_VERSION")}` + (isRunningLocally ? " (LOCAL) " : "") + "- Ready...", "color: green; font-weight: bold");
