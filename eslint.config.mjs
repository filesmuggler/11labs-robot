import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "@next/eslint-plugin-next";
import nextTs from "eslint-config-next";

export default defineConfig([
  nextVitals,
  nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
