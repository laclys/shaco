"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginIndexHtml = void 0;
const promises_1 = require("fs/promises");
const constants_1 = require("../constants");
function pluginIndexHtml() {
    return {
        name: 'shaco:index-html',
        apply: 'serve',
        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    // read template.html
                    let content = await (0, promises_1.readFile)(constants_1.DEFAULT_TEMPLATE_PATH, 'utf-8');
                    try {
                        content = await server.transformIndexHtml(req.url, content, req.originalUrl);
                        // response html borwer
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end(content);
                    }
                    catch (e) {
                        return next(e);
                    }
                });
            };
        },
    };
}
exports.pluginIndexHtml = pluginIndexHtml;
