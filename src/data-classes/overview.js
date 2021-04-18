'use strict';

class Overview {
  constructor({ ainfo, pbe, pgrng, ps, tags, title, url }) {
    this.ainfo = ainfo;
    this.pbe = pbe;
    this.pgrng = pgrng;
    this.ps = ps;
    this.tags = tags;
    this.title = title;
    this.url = url;
  }
}

module.exports = Overview;
