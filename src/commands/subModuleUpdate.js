import { execSync } from "child_process";
import pkg from "fs-extra";
import consola from "consola";

export async function subModuleUpdate() {
  execSync(`git submodule update --recursive --remote`, {
    stdio: "inherit",
  });

  consola.success(`Submodules Updated.`);
}
