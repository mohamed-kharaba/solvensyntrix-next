import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Solven Syntrix — Digital Infrastructure for the Syrian Market",
    short_name: siteConfig.name,
    description:
      "A leading tech firm in software development, web design, digital marketing, and a business incubator connecting regional investors to the Syrian market.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
