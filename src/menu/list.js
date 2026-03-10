import { isCancel, log, select } from "@clack/prompts";
import { taskManager } from "../manager/tasks.js";
import { mainMenu } from "./menu.js";
import chalk from "chalk";
import { updateTaskMenu } from "./update.js";

export async function listTasksMenu() {
    if (taskManager.tasks.size < 1) {
        log.warn(chalk.yellow("⚠️  Você não possui tarefas para serem listadas!"))
        setTimeout(() => mainMenu(), 1000)
        return;
    }

    const selected = await select({
        message: chalk.hex("#9ef2fa")("🔎 Selecione uma tarefa:"),
        options: [
            ...taskManager.toArray().map(({ name, status }) => ({
                label: `${taskManager.colorStatus(status)} ${chalk.white.underline(name)}`,
                value: name
            })),
            { label: chalk.hex("#cffcfc")("📋 Menu principal"), value: "main" }
        ]
    })
    if(isCancel(selected) || selected === "main"){
        mainMenu()
        return;
    }  

    updateTaskMenu(selected)
    return;
}