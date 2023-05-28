import fastGlob from 'fast-glob'
import path from 'path'

interface RouteMeta {
  routePath: string
  absolutePath: string
}

export class RouteService {
  #scanDir: string
  #routeData: RouteMeta[] = []

  constructor(scanDir: string) {
    this.#scanDir = scanDir
  }

  async init() {
    const files = fastGlob
      .sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'config.ts']
      })
      .sort() // 保证每次生成的文件顺序都是稳定的

    console.log('files', files)
    files.forEach((f) => {
      // console.log('this.#scanDir', this.#scanDir, f)
      const fileRelativePath = path.relative(this.#scanDir, f)
      // route path
      // console.log('fileRelativePath', fileRelativePath)
      const routePath = this.normalizeRoutePath(fileRelativePath)
      this.#routeData.push({
        routePath,
        absolutePath: f
      })
    })
  }

  getRouteMeta(): RouteMeta[] {
    return this.#routeData
  }

  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '')
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }

  generateRoutesCode() {
    return `
      import React from 'react';
      import loadable from '@loadable/component';
      ${this.#routeData
        .map((route, index) => {
          return `const Route${index} = loadable(() => import('${route.absolutePath}'));`
        })
        .join('\n')}
      export const routes = [
      ${this.#routeData
        .map((route, index) => {
          return `{ path: '${route.routePath}', element: React.createElement(Route${index}) }`
        })
        .join(',\n')}
      ];
  `
  }
}
