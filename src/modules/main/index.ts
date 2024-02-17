import express from "express";

import { getDefaultView } from "./controllers/default-view";
import { updateEditableFields } from "./controllers/editable-fields";
import { compileTemplate } from "./controllers/template-preview";
import { getSchema, updateSchema } from "../schema";

export const mainRouter = express.Router();

mainRouter.get("/", getDefaultView);
mainRouter.post("/fields", updateEditableFields);
mainRouter.post("/template", compileTemplate);
mainRouter.post("/schema", updateSchema);
mainRouter.get("/schema", getSchema);
