'use strict';

const Vault = require('./vault');

class Vaults {
  /**
   * @param {Vault[]} vaults
   */
  constructor(vaults) {
    this.vaults = vaults;
  }
  /**
   * @param {Vault} vault
   */
  add(vault) {
    this.vaults.push(vault);
  }

  /**
   * @param {string} uuid
   */
  findByUUID(uuid) {
    for (let i = 0; i < this.vaults.length; i++) {
      const v = this.vaults[i];
      if (uuid == v.uuid) {
        return v.name;
      }
    }
  }

  /**
   * @param {string} name
   */
  findByName(name) {
    for (let i = 0; i < this.vaults.length; i++) {
      const v = this.vaults[i];
      if (name == v.name) {
        return v.uuid;
      }
    }
  }
}

module.exports = Vaults;
