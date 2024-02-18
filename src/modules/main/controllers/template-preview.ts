import * as fs from "node:fs/promises";
import path from "path";

import ejs from "ejs";
import mjml2html from "mjml";

import { basePath, getTemplateContext } from "../services";

export const compileTemplate = async function (req, res) {
  const { template: name, locale } = req.body;

  const mjmlTemplateFile = await fs.readFile(
    path.join(basePath, "mail", name),
    "utf-8"
  );
  const { html: mjmlTemplate } = mjml2html(mjmlTemplateFile);
  const context = await getTemplateContext(
    name.replace(".mjml", ".json"),
    locale
  );
  const template = ejs.compile(mjmlTemplate)(context);

  res.setHeader("Content-Type", "text/html").send(template);
};
