import { Context } from "grammy"

export default new Command<Context>(
  "summary-on-update",
  "Genera un report riassuntivo degli eventi imminenti.",
  async (ctx: Context): Promise<void> => {
    await ctx.reply("Ecco il report riassuntivo degli eventi imminenti: [Link al report]");
  }
)
