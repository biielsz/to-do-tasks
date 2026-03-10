import { text, isCancel, log, cancel } from "@clack/prompts";
import { mainMenu } from "./menu.js";
import chalk from "chalk";
import { taskManager } from "../manager/tasks.js";

export async function createTaskMenu() {
    let name;

    do {
        name = await text({
            message: chalk.hex("#9ef2fa")("✏️  Escreva o nome da tarefa:")
        })

        if(taskManager.tasks.has(name)){
            log.error(chalk.red("❌ A tarefa digitada já existe na lista."))
        }
        
    } 
    while (taskManager.tasks.has(name));
    
    if(isCancel(name)){
        cancel("❌ Operação cancelada.")
        setTimeout(() => mainMenu(), 1000);
        return;
    }

    const task = {
        name,
        status: "em andamento",
        createdAt: new Date().toISOString()
    }
    taskManager.create(task);

    log.success(chalk.green("✅ Tarefa criada com sucesso!"))
    setTimeout(() => mainMenu(), 1000);
    return;
}