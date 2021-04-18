'use strict';

const Details = require('./details');
const Overview = require('./overview');

class Item {
  constructor({
    uuid,
    templateUuid,
    trashed,
    createdAt,
    updatedAt,
    changerUuid,
    itemVersion,
    vaultUuid,
    details,
    overview,
  }) {
    this.uuid = uuid;
    this.templateUuid = templateUuid;
    this.trashed = trashed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.changerUuid = changerUuid;
    this.itemVersion = itemVersion;
    this.vaultUuid = vaultUuid;
    /**
     * @type {Details}
     */
    this.details = details;
    /**
     * @type {Overview}
     */
    this.overview = overview;
  }
}

module.exports = Item;
