
import { Context } from "grammy"
import { Command } from "grammy-commands";

export const admin = new Command<Context>(
  "admin",
  "Comando riservato agli amministratori del gruppo.",
  async (ctx: Context): Promise<void> => {
    await ctx.reply("Questo comando è riservato agli amministratori del gruppo.");
  }
)
