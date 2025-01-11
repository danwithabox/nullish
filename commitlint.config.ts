import type { UserConfig } from "@commitlint/types";

/** https://commitlint.js.org/reference/configuration.html#typescript-configuration */
const config: UserConfig = {
    extends: ["@commitlint/config-conventional"],
};

export default config;
