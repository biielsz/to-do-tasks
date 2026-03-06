import chalk from "chalk";
import { text, isCancel, cancel } from "@clack/prompts";
import { writeFile, readFile } from "node:fs/promises";
import { existsSync, read } from "node:fs";
import path, { parse } from "node:path";

const filePath = path.join("./user.json")

if (!existsSync(filePath)) {
    await writeFile(filePath, JSON.stringify({}), "utf-8")
}

const data = await readFile(filePath, "utf-8")
const parsed = data.trim() ? JSON.parse(data) : {}

export async function identifyName() {

    if (!parsed.name) {
        const name = await text({
            message: chalk.yellow("🧐 Qual é o seu nome?")
        })

        if (isCancel(name)) {
            cancel(chalk.underline("❌ Programa cancelado."))
            process.exit(0)
        }

        await writeFile(filePath, JSON.stringify({ name }, null, 2), "utf-8")

        return `Seja bem-vindo, ${name}!`
    } 
    
    return `Seja bem-vindo, ${parsed.name}!`
}