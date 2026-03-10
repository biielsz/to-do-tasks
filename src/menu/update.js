import { isCancel, log, select, taskLog, text } from "@clack/prompts";
import { taskManager } from "../manager/tasks.js";
import chalk from "chalk";
import { listTasksMenu } from "./list.js";

export async function updateTaskMenu(taskName) {
    const task = taskManager.tasks.get(taskName)

    const formatedDate = new Date(task.createdAt).toLocaleString();
    const status = taskManager.colorStatus(task.status);

    log.info([
        `${chalk.hex("#cffcfc")("📃 Tarefa:")} ${task.name}`,
        `${chalk.hex("#cffcfc")("📊 Status:")} ${status}`,
        `${chalk.hex("#cffcfc")("📅 Criada em:")} ${chalk.bgGray(formatedDate)}`
    ].join("\n"))

    const selected = await select({
        message: chalk.hex("#9ef2fa")("📌 Selecione o que você deseja fazer"),
        options: [
            { label: chalk.hex("#cffcfc")("📝 Alterar nome"), value: "name" },
            { label: chalk.hex("#cffcfc")("📈 Alterar status"), value: "status" },
            { label: chalk.hex("#cffcfc")("⛔ Deletar"), value: "delete" },
            { label: chalk.hex("#cffcfc")("⬅️  Voltar"), value: "back" },
        ]
    })
    if(isCancel(selected)){
        listTasksMenu();
        return;
    }

    switch(selected){
        case "delete":{
            taskManager.tasks.delete(taskName);
            taskManager.save();
        }
        case "back":{
            listTasksMenu();
            return
        }
        case "name":{
            const oldTaskName = task.name;

            const newTaskName = await text({
                message: chalk.hex("#9ef2fa")("✏️  Escreva o novo nome da tarefa"),
                validate(input){
                    if(taskManager.tasks.has(input)){
                        return chalk.red("❌ Já existe uma tarefa com este nome!")
                    }
                }
            })
            if(isCancel(newTaskName)){
                updateTaskMenu(oldTaskName);
                return; 
            }
            taskManager.tasks.delete(oldTaskName);
            const updateTask = { ...task, name: newTaskName };
            taskManager.tasks.set(newTaskName, updateTask);
            taskManager.save();
            updateTaskMenu(newTaskName)
            return;
        }
        case "status":{
            const taskStatus = [
                "em andamento",
                "concluída",
                "cancelada"
            ]

            const options = taskStatus
            .filter(status => status !== task.status)
            .map(status => ({ label: status, value: status }))

            const status = await select({
                message: chalk.hex("#9ef2fa")("🔎 Selecione o novo status da tarefa"),
                options
            })

            if(isCancel(status)){
                updateTaskMenu(taskName)
                return;
            }

            taskManager.tasks.set(taskName, { ...task, status })
            taskManager.save()
            updateTaskMenu(taskName)
            return;
        }


    }
}