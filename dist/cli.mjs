// node_modules/.pnpm/tsup@6.7.0_typescript@5.0.4/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/node/cli.ts
import cac from "cac";

// src/node/dev.ts
import { createServer } from "vite";
import pluginReact from "@vitejs/plugin-react";

// src/node/plugin/indexHtml.ts
import { readFile } from "fs/promises";

// src/node/constants/index.ts
import * as path2 from "path";
var PACKAGE_ROOT = path2.join(__dirname, "..");
var DEFAULT_TEMPLATE_PATH = path2.join(PACKAGE_ROOT, "template.html");
var CLIENT_ENTRY_PATH = path2.join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
var SERVER_ENTRY_PATH = path2.join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);

// src/node/plugin/indexHtml.ts
function pluginIndexHtml() {
  return {
    name: "shaco:index-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              // /@fs/:
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let content = await readFile(DEFAULT_TEMPLATE_PATH, "utf-8");
          try {
            content = await server.transformIndexHtml(
              req.url,
              content,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(content);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/dev.ts
async function createDevServer(root = process.cwd()) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()]
  });
}

// src/node/build.ts
import * as path3 from "path";
import fs from "fs-extra";
import { build as viteBuild } from "vite";
async function bundle(root) {
  try {
    const resolveViteConfig = (isServer) => {
      return {
        mode: "production",
        root,
        build: {
          ssr: isServer,
          outDir: isServer ? ".temp" : "build",
          rollupOptions: {
            input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
            output: {
              format: isServer ? "cjs" : "esm"
            }
          }
        }
      };
    };
    const clientBuild = async () => {
      return viteBuild(resolveViteConfig(false));
    };
    const serverBuild = () => {
      return viteBuild(resolveViteConfig(true));
    };
    console.log("building client & server bundles...");
    const [clientBundle, serverBundle] = await Promise.all([
      clientBuild(),
      serverBuild()
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function renderPage(render, root, clientBundle) {
  const appHtml = render();
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="/${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim();
  await fs.writeFile(path3.join(root, "build/index.html"), html);
  await fs.remove(path3.join(root, ".temp"));
}
async function build(root) {
  const [clientBundle] = await bundle(root);
  const serverEntryPath = path3.join(PACKAGE_ROOT, root, ".temp", "ssr-entry.js");
  const { render } = await import(serverEntryPath);
  await renderPage(render, root, clientBundle);
}

// src/node/cli.ts
var cli = cac("shaco").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const server = await createDevServer(root);
  await server.listen();
  server.printUrls();
});
cli.command("build [root]", "build in prod").action(async (root) => {
  await build(root);
});
cli.parse();
