import { startProgram } from "./start/greet.js";
import { identifyName } from "./manager/name.js";
import { mainMenu } from "./menu/menu.js";
import { intro, log, outro } from "@clack/prompts";

intro(await startProgram())
log.step(await identifyName())
mainMenu()