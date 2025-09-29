
import { Context } from "grammy"
import { Command } from "grammy-commands";

export const start = new Command<Context>(
  "start",
  "Invia il messaggio di saluto del bot.",
  async (ctx: Context): Promise<void> => {
    await ctx.reply("Ciao! Sono Florence 🐸, la mascotte di PoliEdro e il botTest del gruppo Telegram di Associazione.");
  }
)
