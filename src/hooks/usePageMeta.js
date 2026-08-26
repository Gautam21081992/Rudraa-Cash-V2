import { useEffect } from "react";
import { meta } from "../data/siteData";

function setMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

export function usePageMeta(path) {
  useEffect(() => {
    const [title, description] = meta[path] ?? meta["/"];
    const url = `${window.location.origin}${path}`;
    const image = `${window.location.origin}/assets/logo/rudraa_logo.png`;

    document.title = title;
    setMetaByName("description", description);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:image:alt", "Rudraa Cash official logo");
    setCanonical(url);
  }, [path]);
}
