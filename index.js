'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const Overview = require('./src/data-classes/overview');
const Details = require('./src/data-classes/details');
const Item = require('./src/data-classes/item');
const Vault = require('./src/data-classes/vault');
const Vaults = require('./src/vaults');
const DocumentAttributes = require('./src/data-classes/document-attributes');

const filenamify = require('filenamify');

const argv = require('minimist')(require('process').argv.slice(2));
const token = argv.token;
const backupPath = argv.path;
const uuidForName = argv.uuid;

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

  let filename = '';

  if (uuidForName) {
    filename = item.uuid + '.json';
  }

  if (!uuidForName) {
    // safe-guard against overwritting duplicate entries
    const _filename = filenamify(item.overview.title, { replacement: ' ' });

    const fileExt = '.json';

    const fileBase = path.basename(_filename, fileExt);

    filename = fileBase + fileExt;

    let postfix = 0;

    while (fs.existsSync(`${backupPath}/${vaultName}/${filename}`)) {
      postfix++;
      filename = fileBase + '-' + postfix + fileExt;
    }
  }

  console.log(`${vaultName}/${filename}... ` + (i + 1) + '/' + items.length);

  fs.writeFileSync(
    `${backupPath}/${vaultName}/${filename}`,
    JSON.stringify(item, null, 2)
  );
}

/**
 * @type Item[]
 */
const docs = JSON.parse(
  execSync(`op list documents --session ${token}`).toString(),
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

for (let i = 0; i < docs.length; i++) {
  const uuid = docs[i].uuid;

  /**
   * @type Item
   */
  const doc = JSON.parse(
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
      if (k === 'documentAttributes') {
        return new DocumentAttributes(v);
      }
      return v;
    }
  );

  const vaultName = vaults.findByUUID(doc.vaultUuid);

  if (!fs.existsSync(`${backupPath}/${vaultName}/`)) {
    fs.mkdirSync(`${backupPath}/${vaultName}/`);
  }

  let filename = '';

  const _filename = doc.details.documentAttributes.fileName;

  const fileExt = path.extname(_filename);

  const fileBase = path.basename(_filename, fileExt);

  if (uuidForName) {
    filename = doc.uuid + fileExt;
  }

  if (!uuidForName) {
    // safe-guard against duplicate names
    // prevent overwriting by appending a counter
    let postfix = 0;
    filename = fileBase + fileExt;
    while (fs.existsSync(`${backupPath}/${vaultName}/${filename}`)) {
      postfix++;
      filename = fileBase + '-' + postfix + fileExt;
    }
  }

  console.log(`${vaultName}/${filename}... ` + (i + 1) + '/' + docs.length);

  const binaryData = execSync(`op get document ${doc.uuid} --session ${token}`);

  fs.writeFileSync(`${backupPath}/${vaultName}/${filename}`, binaryData);
}
