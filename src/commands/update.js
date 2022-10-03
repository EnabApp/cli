import { execSync } from "child_process";
import consola from "consola";
import pkg from "fs-extra";
import { capitalize } from "../utils.js";
import packages from "../packages.json" assert { type: "json" };

export async function update() {
  const { readJSONSync } = pkg;

  const { name } = readJSONSync("./package.json", { stdio: [] });

  let pkgs = packages;
  pkgs = pkgs.filter((item) => item !== name);

  pkgs.forEach((pkg) => {
    const name = capitalize(pkg.split("/")[1]);

    try {
      consola.info(`Updating ${name}.`);
      execSync(`yarn add ${pkg}@latest -D`);
      consola.info(`${name} updated.`);
    } catch (e) {
      consola.error(e);
    }
  });

  consola.success(`All packages updated.`);
}
