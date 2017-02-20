'use strict';

module.exports = app => {
  app.get('/', function* () {
    this.body = 'hi, ' + app.plugins.passportTwitter.name;
  });

  app.passport.mount('twitter');
};
