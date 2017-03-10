import { expect } from 'chai';
import { resolve } from 'path';
import * as webpack from 'webpack';

import { run } from '../utils';
import { config } from './assets/webpack.config';


describe('Code Splitting', () => {
  const assetsPath = resolve(__dirname, 'assets/app');
  const ngfactoryPath = resolve(__dirname, 'assets/ngfactory/app');
  const find = (path, chunk, dir) =>
    chunk.modules.find((module) => module.resource === resolve(dir, path));

  let stats;
  before(async () => {
    try {
      stats = await run(config);
    } catch (err) {
      throw new Error(err);
    }
  });

  it('should create a chunk for each route', () => {
    expect(stats.compilation.chunks.length).to.equal(3);
  });

  it('should have all route-two files in the first chunk', () => {
    const chunk = stats.compilation.chunks[0];
    const moduleNgFactory = find('route-two/route-two.module.ngfactory.ts', chunk, ngfactoryPath);
    const moduleFile = find('route-two/route-two.module.ts', chunk, assetsPath);
    const componentNgFactory = find('route-two/route-two.component.ngfactory.ts', chunk, ngfactoryPath);
    const componentFile = find('route-two/route-two.component.ts', chunk, assetsPath);

    expect(moduleNgFactory).not.to.be.undefined;
    expect(componentNgFactory).not.to.be.undefined;
    expect(moduleFile).not.to.be.undefined;
    expect(componentFile).not.to.be.undefined;
  });

  it('should have all route-one files in the second chunk', () => {
    const chunk = stats.compilation.chunks[1];
    const moduleNgFactory = find('route-one/route-one.module.ngfactory.ts', chunk, ngfactoryPath);
    const moduleFile = find('route-one/route-one.module.ts', chunk, assetsPath);
    const componentNgFactory = find('route-one/route-one.component.ngfactory.ts', chunk, ngfactoryPath);
    const componentFile = find('route-one/route-one.component.ts', chunk, assetsPath);

    expect(moduleNgFactory).not.to.be.undefined;
    expect(componentNgFactory).not.to.be.undefined;
    expect(moduleFile).not.to.be.undefined;
    expect(componentFile).not.to.be.undefined;
  });

  it('should have all app files in the third chunk', () => {
    const chunk = stats.compilation.chunks[2];
    const moduleNgFactory = find('app.module.ngfactory.ts', chunk, ngfactoryPath);
    const moduleFile = find('app.module.ts', chunk, assetsPath);
    const componentNgFactory = find('app.component.ngfactory.ts', chunk, ngfactoryPath);
    const componentFile = find('app.component.ts', chunk, assetsPath);

    expect(moduleNgFactory).not.to.be.undefined;
    expect(componentNgFactory).not.to.be.undefined;
    expect(moduleFile).not.to.be.undefined;
    expect(componentFile).not.to.be.undefined;
  });

  it('should not have route-one or route-two files in the third chunk', () => {
    const chunk = stats.compilation.chunks[2];

    const oneModuleNgFactory = find('route-one/route-one.module.ngfactory.ts', chunk, ngfactoryPath);
    const oneModuleFile = find('route-one/route-one.module.ts', chunk, assetsPath);
    const oneComponentNgFactory = find('route-one/route-one.component.ngfactory.ts', chunk, ngfactoryPath);
    const oneComponentFile = find('route-one/route-one.component.ts', chunk, assetsPath);

    expect(oneModuleNgFactory).to.be.undefined;
    expect(oneComponentNgFactory).to.be.undefined;
    expect(oneModuleFile).to.be.undefined;
    expect(oneComponentFile).to.be.undefined;

    const twoModuleNgFactory = find('route-two/route-two.module.ngfactory.ts', chunk, ngfactoryPath);
    const twoModuleFile = find('route-two/route-two.module.ts', chunk, assetsPath);
    const twoComponentNgFactory = find('route-two/route-two.component.ngfactory.ts', chunk, ngfactoryPath);
    const twoComponentFile = find('route-two/route-two.component.ts', chunk, assetsPath);

    expect(twoModuleNgFactory).to.be.undefined;
    expect(twoComponentNgFactory).to.be.undefined;
    expect(twoModuleFile).to.be.undefined;
    expect(twoComponentFile).to.be.undefined;
  });
});
