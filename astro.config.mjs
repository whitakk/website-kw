import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://whitakk.com",
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
});
