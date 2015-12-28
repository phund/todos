Package.describe({
  name: 'phund:push',
  version: '2.6.8',
  summary: 'Isomorphic Push notifications for APN and GCM',
  git: 'https://github.com/raix/push.git'
});

// Server-side push deps
Npm.depends({
  'apn' : '1.6.2', // 1.3.8, 1.4.2
  //'debug': '0.7.3', // DEBUG
  'node-gcm' : '0.9.6' // 0.9.6
});

Cordova.depends({
  'com.phonegap.plugins.PushPlugin': '1.5.2',
  'de.appplant.cordova.plugin.badge': '0.7.1'
});

Package.registerBuildPlugin({
  name: 'configuration',
  use: [
    'check'
  ],
  sources: [
    'plugin/push.configuration.js'
  ]
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'tracker', // Push.id() is reactive
    'random'   // The push it is created with Random.id()
  ], 'client');

  // Keep track of users in the appCollection
  api.use('accounts-base', ['client', 'server'], { weak: true });

  api.use('raix:cordova@0.2.3', 'client', { weak: true });

  api.use(['raix:eventstate@0.0.2', 'check', 'mongo'], ['client', 'server']);

  api.use('mongo', 'server');

  // Common api
  api.addFiles([
    'lib/common/main.js',
    'lib/common/notifications.js'
  ], ['client', 'server']);

  // API's
  api.addFiles('lib/client/browser.js', 'web.browser');
  api.addFiles('lib/client/cordova.js', 'web.cordova');
  api.addFiles('lib/server/push.api.js', 'server');

  // Unified api
  api.addFiles('lib/client/client.js', 'client');
  api.addFiles('lib/server/server.js', 'server');

  api.export('Push');
  api.export('onNotificationAPN', 'web.cordova');
  api.export('onNotificationGCM', 'web.cordova');

});
