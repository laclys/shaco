import { createServer } from "vite";

export async function createDevServer(root = process.cwd()) {
  return createServer({
    root,
  });
}