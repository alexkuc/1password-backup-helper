'use strict';

const DocumentAttributes = require('./document-attributes');

class Details {
  constructor({
    fields,
    notesPlain,
    passwordHistory,
    sections,
    documentAttributes,
  }) {
    this.fields = fields;
    this.notesPlain = notesPlain;
    this.passwordHistory = passwordHistory;
    this.sections = sections;
    /**
     * @type {DocumentAttributes}
     */
    this.documentAttributes = documentAttributes;
  }
}

module.exports = Details;
