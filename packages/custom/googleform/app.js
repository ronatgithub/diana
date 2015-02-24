'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Googleform = new Module('googleform');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Googleform.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Googleform.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  /*Googleform.menus.add({
    title: 'Stunden Konto',
    link: 'googleform example page',
    roles: ['authenticated'],
    menu: 'main'
  });*/
  
  Googleform.aggregateAsset('css', 'googleform.css');
  Googleform.aggregateAsset('css', '../css/style/animate.css');
  Googleform.aggregateAsset('css', '../css/style/font-awesome.css');
  Googleform.aggregateAsset('css', '../css/style/style.css');

  Googleform.aggregateAsset('js', '../lib/moment/moment.js');
  Googleform.aggregateAsset('js', '../lib/angular-moment/angular-moment.js');
  Googleform.aggregateAsset('js', '../lib/moment/locale/de.js');

  Googleform.aggregateAsset('js', '../lib/angular-youtube-mb/src/angular-youtube-embed.js');


  

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Googleform.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Googleform.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Googleform.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Googleform;
});
