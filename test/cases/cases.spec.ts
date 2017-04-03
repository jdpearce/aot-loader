import * as mocha from 'mocha';
import * as path from 'path';

const tests = [
  'code-splitting',
  'refactor',
  'refactor.weird'
];

const run = (name: string) => {
  return new Promise((resolve, reject) => {
    const instance = new mocha({
      timeout: 10000
    });

    instance.addFile(path.resolve(__dirname, `${name}/${name}.ts`));

    instance.run((failures) => {
      if (failures) {
        return reject(failures);
      }

      resolve();
    });
  });
};

async function init() {
  for (const test of tests) {
    try {
      await run(test);
    } catch (err) {
      throw err;
    }
  }

  process.exit();
}

init();
