import inquirer from "inquirer";
import {
    getDirectoriesWithBase,
    kebabCase,
    camelCase,
    pascalCase,
    snakeCase,
    fileExists,
    capitalize,
} from "./utils.js";
import {
    readFileSync,
    writeFileSync,
    mkdirSync,
    accessSync,
    realpathSync
} from "fs";
import consola from "consola";
import {
    dirname,
    resolve
} from "path";
import { fileURLToPath } from 'url';


async function promptForMissingOptions(templateData) {
    const path = templateData.path;
    const templateName = path.split("/").reverse()[0];
    const templateNameCaptilized = capitalize(templateName);

    const questions = [];

    let getSubdirectories = await getDirectoriesWithBase(path);

    questions.push({
        type: "list",
        name: "path",
        message: "Please choose path",
        choices: getSubdirectories,
    });

    questions.push({
        type: "input",
        name: "filename",
        message: `${templateNameCaptilized} name (e.g. test ${templateName})`,
    });

    questions.push({
        type: "confirm",
        name: "overwrite",
        message: "File is exists, overwrite?",
        when(answers) {
            let filename = convertCase(answers.filename, templateData.case);
            const filepath = `${path}${answers.path}/${filename}.${templateData.extension}`;
            return fileExists(filepath);
        },
    });

    const answers = await inquirer.prompt(questions);
    return {
        path: answers.path === "/" ? `${path}/` : `${path}${answers.path}`,
        filename: answers.filename,
        overwrite: answers.overwrite,
    };
}

// Template Data
/*
    {
        path: 'src/runtime/pages',
        filename: 'home-page',
        templatePath: 'src/createTemplate.js',
        case: [kebab, camel, pascal, snake],
        extension: 'vue',

    }
*/

function convertCase(filename, caseType) {
    switch (caseType) {
        case "kebab":
            return kebabCase(filename);
        case "camel":
            return camelCase(filename);
        case "pascal":
            return pascalCase(filename);
        case "snake":
            return snakeCase(filename);
    }
}

async function isExists(path) {
    try {
        await accessSync(path);
        return true;
    } catch {
        return false;
    }
}

async function generate(filename, filepath, templatePath, options) {
    const dir = dirname(filepath);
    const exist = await isExists(dir);
    if (!exist) {
        await mkdirSync(dir, {
            recursive: true
        });
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const templateDir = resolve(__dirname, '..', templatePath);
      const templateContent = readFileSync(templateDir, "utf8");
    const content = templateContent.replace(/<{filename}>/g, filename);
    writeFileSync(filepath, content, "utf8");

    if (options.overwrite === true) consola.success(`File updated: ${filepath}`);
    else consola.success(`File created: ${filepath}`);
}

export async function createTemplate(templateData) {
    let options = await promptForMissingOptions(templateData);
    const templateName = templateData.path.split("/").reverse()[0];
    if (templateName == 'composables') {
        options.filename = options.filename.replace('use', '');
        options.filename = 'use ' + options.filename;
    }

    let filename = convertCase(
        options.filename.replace(/^\s+|\s+$/gm, ""),
        templateData.case
    );
    
    options.path.charAt(options.path.length - 1) === "/" &&
        (options.path = options.path.slice(0, -1));

    const filepath = `${options.path}/${filename}.${templateData.extension}`;

    if (options.filename == "") {
        consola.error("Filename is required");
        return false;
    }

    if (options.overwrite === true || options.overwrite === undefined) {
        generate(filename, filepath, templateData.templatePath, options);
    } else {
        consola.info("Canceled");
    }
}