import { execSync } from "child_process";
import pkg from "fs-extra";
import consola from "consola";

export async function release() {

  const {
    readJSONSync,
  } = pkg;

  const {
    version: oldVersion,
  } = readJSONSync("./package.json");


  execSync(`npx bumpp --no-commit --no-tag --no-push`, {
    stdio: "inherit",
  });

  const {
    version,
  } = readJSONSync("package.json");

  if (oldVersion === version) {
    console.log("canceled");
    process.exit();
  }

  execSync("git add .", {
    stdio: "inherit",
  });
  execSync(`git commit -m "release-v${version}"`, {
    stdio: "inherit",
  });
  execSync(`git tag -a release-v${version} -m "v${version}"`, {
    stdio: "inherit",
  });
  execSync(`git push origin master"`, {
    stdio: "inherit",
  });

  consola.success(`released v${version}`);
}
