import { isCancel, outro, select } from "@clack/prompts";
import chalk from "chalk";
import { createTaskMenu } from "./addTasks.js";
import { listTasksMenu } from "./list.js";

export async function mainMenu(){
    const menu = await select({
        message: chalk.hex("#9ef2fa")("📋 O que você deseja fazer?"),
        options: [
            { value: "add", label: chalk.hex("#cffcfc")("✅ Adicionar tarefa") },
            { value: "list", label: chalk.hex("#cffcfc")("📃 Listar tarefas") },
            { value: "leave", label: chalk.hex("#cffcfc")("👋 Sair") }
        ]
    })
    if(isCancel(menu)) return;

    switch(menu){
        case "add":{
            createTaskMenu()
            return
        }
        case "list":{
            listTasksMenu()
            return
        }
        default:{
            outro(chalk(`◾ ${chalk.hex("#303030")("Fim do programa!")}`))
            return
        }
    }
}