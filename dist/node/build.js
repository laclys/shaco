"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.renderPage = exports.bundle = void 0;
const path = require("path");
const fs = require("fs-extra");
const vite_1 = require("vite");
const constants_1 = require("./constants");
async function bundle(root) {
    try {
        const resolveViteConfig = (isServer) => {
            return {
                mode: 'production',
                root,
                build: {
                    ssr: isServer,
                    outDir: isServer ? '.temp' : 'build',
                    rollupOptions: {
                        input: isServer ? constants_1.SERVER_ENTRY_PATH : constants_1.CLIENT_ENTRY_PATH,
                        output: {
                            format: isServer ? 'cjs' : 'esm',
                        },
                    },
                },
            };
        };
        const clientBuild = async () => {
            return (0, vite_1.build)(resolveViteConfig(false));
        };
        const serverBuild = () => {
            return (0, vite_1.build)(resolveViteConfig(true));
        };
        console.log('building client & server bundles...');
        const [clientBundle, serverBundle] = await Promise.all([
            clientBuild(),
            serverBuild(),
        ]);
        return [clientBundle, serverBundle];
    }
    catch (e) {
        console.log(e);
    }
}
exports.bundle = bundle;
async function renderPage(render, root, clientBundle) {
    const appHtml = render();
    const clientChunk = clientBundle.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry);
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
    // await fs.ensureDir(path.join(root, 'build'))
    await fs.writeFile(path.join(root, 'build/index.html'), html);
    await fs.remove(path.join(root, '.temp'));
}
exports.renderPage = renderPage;
async function build(root) {
    // 1. bundle : client + server
    const [clientBundle, serverBundle] = await bundle(root);
    // import server-entry
    const serverEntryPath = path.join(constants_1.PACKAGE_ROOT, root, ".temp", "ssr-entry.js");
    console.log('serverEntryPath', serverEntryPath);
    // ssr -> htmt
    const { render } = require(serverEntryPath);
    await renderPage(render, root, clientBundle);
}
exports.build = build;
