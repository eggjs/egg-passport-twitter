'use strict';

const debug = require('debug')('egg-passport-twitter');
const assert = require('assert');
const Strategy = require('passport-twitter').Strategy;

module.exports = app => {
  const config = app.config.passportTwitter;
  config.passReqToCallback = true;
  assert(config.key, '[egg-passport-twitter] config.passportTwitter.key required');
  assert(config.secret, '[egg-passport-twitter] config.passportTwitter.secret required');
  config.consumerKey = config.key;
  config.consumerSecret = config.secret;

  // must require `req` params
  app.passport.use('twitter', new Strategy(config, (req, token, tokenSecret, params, profile, done) => {
    // format user
    const user = {
      provider: 'twitter',
      id: profile.id,
      name: profile.username,
      displayName: profile.displayName,
      photo: profile.photos && profile.photos[0] && profile.photos[0].value,
      token,
      tokenSecret,
      params,
      profile,
    };
    debug('%s %s get user: %j', req.method, req.url, user);

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
