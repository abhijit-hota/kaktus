# Kaktus

A minimal and opinionated fork of [Cactus](https://github.com/monkeyWzr/hugo-theme-cactus) as seen on [my website](https://abhijithota.me).

## Differences from Cactus

- [x] No comments
- [x] Posts layout changed
- [x] Custom footer
- [x] Remove jQuery
- [x] Minimize JS and CSS
- [x] Remove less used JS (code-copy, etc.)
- [x] Accessibility fixes
- [ ] Make documentation better
- [ ] Add configuration for some stuff
- [ ] Cleanup codebase (useless CSS, etc.)

## Notes on minimizing CSS

- Enable `hugo_stats` by adding the following to your Hugo config:
  ```toml
  # TOML
  [build]
  writeStats = true
  ```
- Install the dependencies via running the following in your project root:
  ```sh
  npm install postcss postcss-cli autoprefixer @fullhuman/postcss-purgecss
  ```
- Create a `postcss.config.js` in your project root with the following contents:
  ```js
  const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
  });

  module.exports = {
    plugins: [
      ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
    ],
  };
  ```
- **Optional**: Add `node_modules`, `hugo_stats.json`, `package.json` and `package-lock.json` to your `.gitignore`.
