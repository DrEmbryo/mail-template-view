import * as fs from "node:fs/promises";
import { Buffer } from "node:buffer";
import path from "path";

export const basePath = path.join(process.cwd(), "src", "templates");

export const getTemplates = async () => fs.readdir(path.join(basePath, "mail"));

export const getLocales = async () =>
  fs
    .readdir(path.join(basePath, "translations"), { withFileTypes: true })
    .then((data) =>
      data.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name)
    );

export const getTemplateContext = async (template, locale) => {
  const fileContent = await fs.readFile(
    path.join(basePath, "translations", locale, template),
    "utf-8"
  );

  return JSON.parse(fileContent);
};

export const updateTemplateContext = async (template, locale, data) => {
  await fs.writeFile(
    path.join(basePath, "translations", locale, template),
    new Uint8Array(Buffer.from(data))
  );
};
