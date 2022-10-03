import { execSync } from "child_process";
import consola from "consola";
import pkg from "fs-extra";
import { capitalize } from "../utils.js";

export async function update() {
  const { readJSONSync } = pkg;

  const { name } = readJSONSync("./package.json", { stdio: [] });

  let packages = [
    '@enab/core',
    '@enab/components'
  ]

  packages = packages.filter((item) => item !== name)

  packages.forEach((pkg) => {
    const name = capitalize(pkg.split('/')[1])

    try {
      consola.info(`Updating ${name}.`);
      execSync(`yarn add ${pkg}@latest -D`);
      consola.info(`${name} updated.`);
    } catch(e) {
      consola.error(e);
    }
  })

  consola.success(`All packages updated.`);

}