'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

const Overview = require('./src/overview');
const Details = require('./src/details');
const Item = require('./src/item');
const Vault = require('./src/vault');
const Vaults = require('./src/vaults');

const filenamify = require('filenamify');

const argv = require('minimist')(require('process').argv.slice(2));
const token = argv.token;
const backupPath = argv.path;

if (!token) {
  throw `Missing --token parameter!\nTo create one run: op signin my --raw`;
}

if (!backupPath) {
  backupPath = './backup/';
}

if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath);
}

const vaults = new Vaults(
  JSON.parse(execSync(`op list vaults --session ${token}`), (k, v) => {
    if (!isNaN(parseInt(k))) {
      return new Vault(v);
    }
    return v;
  })
);

/**
 * @type Item[]
 */
const items = JSON.parse(
  execSync(`op list items --session ${token}`).toString(),
  (k, v) => {
    if (!isNaN(parseInt(k))) {
      return new Item(v);
    }
    if (k === 'overview') {
      return new Overview(v);
    }
    return v;
  }
);

for (let i = 0; i < items.length; i++) {
  const uuid = items[i].uuid;

  /**
   * @type Item
   */
  const item = JSON.parse(
    execSync(`op get item ${uuid} --session ${token}`).toString(),
    (k, v) => {
      if (k === 'overview') {
        return new Overview(v);
      }
      if (k === 'details') {
        return new Details(v);
      }
      if (k === '') {
        return new Item(v);
      }
      return v;
    }
  );

  const vaultName = vaults.findByUUID(item.vaultUuid);

  if (!fs.existsSync(`${backupPath}/${vaultName}/`)) {
    fs.mkdirSync(`${backupPath}/${vaultName}/`);
  }

  const filename = filenamify(item.overview.title, { replacement: ' ' });

  console.log(
    `${vaultName}/${filename}.json... ` + (i + 1) + '/' + items.length
  );

  fs.writeFileSync(
    `${backupPath}/${vaultName}/${filename}.json`,
    JSON.stringify(item)
  );
}
