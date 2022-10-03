import { execSync } from "child_process";
import pkg from "fs-extra";
import consola from "consola";

export async function subModuleInit() {
  execSync(`git submodule update --init --recursive`, {
    stdio: "inherit",
  });

  consola.success(`Submodules Initated.`);
}
