
import { Context } from "grammy"
import { Command } from "grammy-commands";

export const join = new Command<Context>(
  "join",
  "Chiede di unirsi al gruppo",
  async (ctx: Context): Promise<void> => {
    await ctx.reply("Ecco il link per accedere al gruppo!");
  }
)
