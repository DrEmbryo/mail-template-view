# Email Template Interactive Preview (Node.js, EJS, MJML and HTMX)

## About this project

The Email Template Interactive Preview project serves as a proof-of-concept demo. Developed using Node.js, EJS (Embedded JavaScript), HTMX, and MJML, this application aims to explore process of creating and previewing email templates with MJML. The project offers a real-time, user-friendly, and interactive platform, allowing users edit and preview email templates.

## Setup guide

### Setup

Installation option:

- Nix flake + pnpm:
  1. Allow [nix flakes](https://nixos.wiki/wiki/Flakes) in your configuration
  2. Open dev shell in your terminal by running `nix develop`
  3. Install all dependencies by running `pnpm install`
  4. Run the Node app by running `pnpm run:dev`
- Without usage of nix
  1. Install Node.js (current version is 19_x)
  2. Install package manager of your choice
  3. Install project dependencies
  4. Execute `run:dev` script

### Running the app:

Before running the app some preparation are needed to create and fill env file (please take a look at example.env for a reference).
Then execute `run:dev` script with package manager of your choice.

## Concept

The primary objective of this demo is to explore the feasibility of integrating the MJML templating language with other templating engines for programmatically inserting data.

### Roadblocks that I encountered

- As MJML compiles to a standard HTML template, template engines cannot employ open/closing delimiters that imitate HTML/MJML tags. However, the EJS engine provides the flexibility to exchange the default open/closing delimiters. Keep in mind during your implementation that adjusting delimiters may impact the integration with MJML and HTML, so ensure compatibility and consistency in your templating approach.
- For certain templating engines, such as EJS, MJML during compilation remove control flow statements from template. Therefore, to guarantee the correct functionality of control flow within MJML templates, it is recommended to enclose it within the <mj-raw> element. (for example you can take a look at /src/templates/mail/index.mjml)
- As MJML isn't a templating engine itself, the task of passing data is assigned to the template engine of your choosing. If you intend to use MJML directly from the package, bear in mind that it always involves a two-step process.

## Passing data to MJML template

To pass data to an MJML template, you need to compile it with the template engine tags left untouched. Then, during the subsequent stage of template compilation, you can inject data into the compiled MJML template.

MJML exposes mjml2html function to compile template to string, after that this string can be compiled by template engine with provided context (example below).

```
import mjml2html from "mjml";

export const compileTemplate = async function (req, res) {
  const mjmlTemplateFile = await fs.readFile(
    "path_to_mjml_template.mjml",
    "utf-8"
  );

  const { html: mjmlTemplate } = mjml2html(mjmlTemplateFile);

  const context = { field: "context_for_template_engine" };

  const compiledTemplate = ejs.compile(mjmlTemplate)(context);

  return compiledTemplate;
};
```
