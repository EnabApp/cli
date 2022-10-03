import { globby } from 'globby';
import { stat } from 'fs/promises';

export const capitalize = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const fileExists = async (path) => await stat(path)
   .then(() => true)
   .catch(() => false);

export const getDirectories = async (path) => await globby([`${path}/**/*`], {
    onlyDirectories: true
});

export const getDirectoriesWithBase = async (path) => {
    let dirs =  await getDirectories(path)
    dirs = dirs.map(directory => directory.replace(path, ""))
    dirs.unshift("/")
    return dirs
}

export const kebabCase = string => string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const camelCase = string => string
    .toLowerCase()
    .replace(/[^\w]+(.)/g, (ltr) => ltr.toUpperCase())
    .replace(/[^a-zA-Z]/g, '');

export const pascalCase = string => 
    (string.match(/[a-zA-Z0-9]+/g) || [])
    .map(w => `${w.charAt(0)
    .toUpperCase()}${w.slice(1)}`)
    .join('');

export const snakeCase = string => string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');


