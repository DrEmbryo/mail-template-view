import { getTemplateContext } from "../services";

export const updateEditableFields = async function (req, res) {
  const { template, locale } = req.body;

  const schema = await getTemplateContext(
    template.replace(".mjml", ".json"),
    locale
  );

  res.render("./common/edit.ejs", { schema });
};
