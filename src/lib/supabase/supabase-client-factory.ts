import {Database} from "../types/database.types.ts";
import { createClient } from "@supabase/supabase-js";

export namespace SupabaseClientFactory {
  export function getClient() {
    const isRunningLocally = Deno.args.includes("sb-local")

    const supabase_url = isRunningLocally ? Deno.env.get("SUPABASE_URL_LOCAL") : Deno.env.get("SUPABASE_URL")
    const supabase_key = isRunningLocally ? Deno.env.get("SUPABASE_KEY_LOCAL") : Deno.env.get("SUPABASE_KEY")

    if (!supabase_url || !supabase_key) {
      throw new Error("Supabase URL or Key is not set in environment variables");
    }

    return createClient<Database>(supabase_url, supabase_key);
  }
}
