import { getLocales, getTemplateContext, getTemplates } from "../services";

export const getDefaultView = async function (req, res) {
  const templates = await getTemplates();
  const locales = await getLocales();
  const schema = await getTemplateContext(
    (templates[0] as string).replace(".mjml", ".json"),
    locales[0]
  );

  res.render("./index", { templates, locales, schema });
};
