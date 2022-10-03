import { createTemplate } from "../createTemplate.js";

export async function createComponent() {
    await createTemplate({
        path: 'src/runtime/components',
        templatePath: 'src/templates/component.vue',
        case: 'pascal',
        extension: 'vue',
    });
}
