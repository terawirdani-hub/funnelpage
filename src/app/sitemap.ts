import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://funnelpage.id"; return ["", "tentang/", "term/", "privacy/", "checkout/"].map(path => ({ url: `${base}/${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "" ? 1 : .6 })); }
