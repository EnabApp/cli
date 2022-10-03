import { createTemplate } from "../createTemplate.js";

export async function createLayout() {
    await createTemplate({
        path: 'src/runtime/layouts',
        templatePath: 'src/templates/layout.vue',
        case: 'kebab',
        extension: 'vue',
    });
}
