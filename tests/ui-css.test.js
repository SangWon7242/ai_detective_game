const assert = require("assert");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(rootDir, "style.css"), "utf8");
const mapAssetPath = path.join(rootDir, "assets", "ai-village-map.svg");

assert(
  fs.existsSync(mapAssetPath),
  "Expected assets/ai-village-map.svg to exist as the local illustrated map background."
);

assert(
  css.includes('url("assets/ai-village-map.svg")'),
  "Expected style.css to use the local illustrated map SVG as a map background layer."
);

const mobileMediaMatch = css.match(/@media \(max-width: 640px\) \{[\s\S]*?\n\}/);
assert(mobileMediaMatch, "Expected a max-width: 640px mobile media query.");

const mobileCss = mobileMediaMatch[0];
assert(
  mobileCss.includes("grid-template-columns: repeat(3, minmax(0, 1fr));"),
  "Expected mobile place cards to use a tight three-column grid."
);

assert(
  mobileCss.includes("aspect-ratio: 1 / 1;"),
  "Expected mobile place cards to keep square grid cells."
);

assert(
  mobileCss.includes(".place-card::before") && mobileCss.includes("display: none;"),
  "Expected mobile place card pin tails to be hidden for a clean grid."
);
