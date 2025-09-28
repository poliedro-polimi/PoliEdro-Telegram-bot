import { CommandGroup } from "grammy-commands";
import {admin} from "./admin.ts";

export const adminCommands = new CommandGroup<Context>().add([admin])
