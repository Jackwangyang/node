'use strict';
const common = require('../common');

const path = require('path');
const spawn = require('child_process').spawn;
const assert = require('assert');
const fs = require('fs');

common.refreshTmpDir();

const npmPath = path.join(
  common.testDir,
  '..',
  'deps',
  'npm',
  'bin',
  'npm-cli.js'
);

const args = [
  npmPath,
  'install'
];

const pkgContent = '{}';

const pkgPath = path.join(common.tmpDir, 'package.json');

fs.writeFileSync(pkgPath, pkgContent);

const proc = spawn(process.execPath, args, {
  cwd: common.tmpDir
});

function handleExit(code, signalCode) {
  assert.equal(code, 0, 'npm install should run without an error');
  assert.ok(signalCode === null, 'signalCode should be null');
}

proc.on('exit', common.mustCall(handleExit));
