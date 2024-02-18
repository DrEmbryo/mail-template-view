// const getSchema = async (template, locale) =>
//   await fetch(`/schema?template=${template}&locale=${locale}`);

// const onDocumentLoad = async () => {
//   const $templateSelect = document.querySelector("#template");
//   const $localeSelector = document.querySelector("#locale");

//   const schemaRequest = await getSchema(
//     $templateSelect.value,
//     $localeSelector.value
//   );

//   const { body: schema } = await schemaRequest.json();

//   console.log(schema);
// };

// document.addEventListener("DOMContentLoaded", onDocumentLoad);

$(document).ready(function () {
  $("[type=checkbox]").each(function () {
    $(this)
      .on("change", function () {
        const $fakebox = $(`[name='${$(this).attr("id")}']`);
        $fakebox.attr("value", $(this).prop("checked"));
      })
      .trigger("change");
  });
});
