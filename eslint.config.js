// @ts-check
import { defineFlatConfig, entreeRules, entreeConfigs } from "@danwithabox/eslint-entree";

export default defineFlatConfig([
    ...entreeConfigs.typeScript({
        typeScriptRules: entreeRules.typeScript(),
        gitignore:       true,
    }),
]);
