
import { Context } from "grammy"
import { Command } from "grammy-commands";

export const me = new Command<Context>(
  "me",
  "Comunica il chat_id dell'utente.",
  async (ctx: Context): Promise<void> => {
      await ctx.reply(ctx.from ? `Il tuo chat_id è: ${ctx.from.id}` : "Non sono riuscito a recuperare il tuo chat_id.");
  }
)
