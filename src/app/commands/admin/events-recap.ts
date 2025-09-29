import {Context, InlineKeyboard} from "grammy";
import { Command } from "grammy-commands";
import {produceKeyboard} from "../helpers/produce-keyboard.ts";
import {SupabaseClientFactory} from "@lib/supabase/supabase-client-factory.ts";
import {Database} from "@lib/types/database.types.ts";

export const eventsRecap = new Command<Context>(
  "events",
  "Invia gli eventi di PoliEdro™.",
  async (ctx: Context): Promise<void> => {
    const client = SupabaseClientFactory.getClient()

    const events: Database["public"]["Tables"]["Event"]["Row"][] = await client.from('Event').select()

    let message: string = ''

    console.log(events)

    if (events.data.length > 0) {
      message += "Ecco i prossimi eventi di PoliEdro: \n"
      message += events.map(event => `"${event}"`).join('\n')
    } else if (events.data.length === 1) {
      message += "Ecco il prossimo evento di PoliEdro: \n"
    } else {
      message += "Scopri le nostre risorse!"
    }

    await ctx.reply(message, { reply_markup: produceKeyboard() })
  }
)
