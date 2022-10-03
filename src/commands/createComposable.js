import { createTemplate } from "../createTemplate.js";

export async function createComposable() {
    await createTemplate({
        path: 'src/runtime/composables',
        templatePath: 'src/templates/composable.ts',
        case: 'camel',
        extension: 'ts',
    });
}
