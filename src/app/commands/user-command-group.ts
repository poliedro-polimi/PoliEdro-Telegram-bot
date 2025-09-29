
import { Context } from "grammy"
import { CommandGroup } from "grammy-commands";
import { start } from "./start.ts";
import { join } from "./join.ts";

export const userCommands = new CommandGroup<Context>()
  .add([join, start])
