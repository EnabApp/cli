import { createTemplate } from "../createTemplate.js";

export async function createPage() {
    await createTemplate({
        path: 'src/runtime/pages',
        templatePath: 'src/templates/page.vue',
        case: 'kebab',
        extension: 'vue',
    });
}
