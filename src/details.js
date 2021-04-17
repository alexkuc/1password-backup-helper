'use strict';

class Details {
  constructor({ fields, notesPlain, passwordHistory, sections }) {
    this.fields = fields;
    this.notesPlain = notesPlain;
    this.passwordHistory = passwordHistory;
    this.sections = sections;
  }
}

module.exports = Details;
