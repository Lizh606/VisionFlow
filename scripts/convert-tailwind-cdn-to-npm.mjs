import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const tailwindConfigPath = path.join(cwd, 'tailwind.config.js');
const postcssConfigPath = path.join(cwd, 'postcss.config.cjs');
const tailwindCssPath = path.join(cwd, 'src', 'styles', 'tailwind.css');
const mainEntryPath = path.join(cwd, 'src', 'main.tsx');

if (!fs.existsSync(tailwindConfigPath)) {
  const configBody =
    `{\n  content: [\n    "./index.html",\n    "./**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`;
  const configFile = `/** @type {import('tailwindcss').Config} */\nmodule.exports = ${configBody};\n`;
  fs.writeFileSync(tailwindConfigPath, configFile);
}

if (!fs.existsSync(postcssConfigPath)) {
  fs.writeFileSync(
    postcssConfigPath,
    `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n`
  );
}

if (!fs.existsSync(tailwindCssPath)) {
  fs.mkdirSync(path.dirname(tailwindCssPath), { recursive: true });
  fs.writeFileSync(
    tailwindCssPath,
    `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`
  );
}

if (fs.existsSync(mainEntryPath)) {
  const importLine = "import './styles/tailwind.css';";
  let mainEntry = fs.readFileSync(mainEntryPath, 'utf8');
  if (!mainEntry.includes(importLine)) {
    const tokensImport = "import './styles/tokens.css';";
    if (mainEntry.includes(tokensImport)) {
      mainEntry = mainEntry.replace(
        tokensImport,
        `${tokensImport}\n${importLine}`
      );
    } else {
      const lines = mainEntry.split('\n');
      const lastImportIndex = lines
        .map((line, index) => ({ line, index }))
        .filter(({ line }) => line.startsWith('import '))
        .map(({ index }) => index)
        .pop();
      if (lastImportIndex !== undefined) {
        lines.splice(lastImportIndex + 1, 0, importLine);
        mainEntry = lines.join('\n');
      } else {
        mainEntry = `${importLine}\n${mainEntry}`;
      }
    }
    fs.writeFileSync(mainEntryPath, mainEntry);
  }
}
