"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = require("cac");
const cli = (0, cac_1.default)('shaco').version('0.0.1').help();
cli.command('dev [root]', 'start dev server').action(async (root) => {
    console.log('dev', root);
});
cli.command('build [root]', 'build in prod').action(async (root) => {
    console.log('build', root);
});
cli.parse();
