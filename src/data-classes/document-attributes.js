'use strict';

class DocumentAttributes {
  constructor({
    documentId,
    encryptedSize,
    encryptionKey,
    fileName,
    integrityHash,
    nonce,
    signingKey,
    unencryptedSize,
    uti,
  }) {
    this.documentId = documentId;
    this.encryptedSize = encryptedSize;
    this.encryptionKey = encryptionKey;
    this.fileName = fileName;
    this.integrityHash = integrityHash;
    this.nonce = nonce;
    this.signingKey = signingKey;
    this.unencryptedSize = unencryptedSize;
    this.uti = uti;
  }
}

module.exports = DocumentAttributes;
