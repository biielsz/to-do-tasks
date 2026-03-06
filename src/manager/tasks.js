import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path"
import chalk from "chalk";

const filePath = path.join("./tasks.json");

if (!existsSync(filePath)) {
    await writeFile(filePath, JSON.stringify([]), "utf-8")
}

const data = await readFile(filePath, "utf-8")
const parsed = JSON.parse(data)

const tasks = new Map(parsed.map(task => [task.name, task]))

export const taskManager = {
    tasks,
    save() {
        const data = this.toArray()
        writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
    },
    create(task) {
        tasks.set(task.name, task);
        this.save();
    },
    toArray() {
        return Array.from(tasks.values())
    },
    colorStatus(status) {
        switch (status) {
            case "em andamento": {
                return chalk.bgHex("#e89c46")(` ${status} `)
            }
            case "concluída": {
                return chalk.bgGreen(` ${status} `)
            }
            case "cancelada": {
                return chalk.bgRed(` ${status} `)
            }
            default: {
                return chalk.bgWhite(` ${status} `)
            }

        }
    }
}
