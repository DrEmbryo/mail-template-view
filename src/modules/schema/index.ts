import { getTemplateContext, updateTemplateContext } from "../main/services";

export const getSchema = async function (req, res) {
  const { template, locale } = req.query;
  const schema = await getTemplateContext(
    (template as string).replace(".mjml", ".json"),
    locale
  );

  res.setHeader("Content-Type", "application/json").send(schema);
};

export const updateSchema = async function (req, res) {
  const { template, locale, ...updatedFields } = req.body;

  const schema = await getTemplateContext(
    template.replace(".mjml", ".json"),
    locale
  );

  if (Object.keys(updatedFields).length > 0) {
    for (let field in updatedFields) {
      schema.body[field].value = updatedFields[field];
    }

    await updateTemplateContext(
      template.replace(".mjml", ".json"),
      locale,
      JSON.stringify(schema)
    );
  }

  const updatedSchema = await getTemplateContext(
    template.replace(".mjml", ".json"),
    locale
  );

  res.render("./common/edit.ejs", { schema: updatedSchema });
};
