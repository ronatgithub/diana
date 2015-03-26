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
  /*Googleform.aggregateAsset('css', '../css/style/animate.css');
  Googleform.aggregateAsset('css', '../css/style/font-awesome.css');
  Googleform.aggregateAsset('css', '../css/style/style.css');*/
Googleform.aggregateAsset('css', '../css/style/animate.css');
Googleform.aggregateAsset('css', '../css/style/font-awesome.css');

  Googleform.aggregateAsset('js', '../lib/angular-loading-bar/src/loading-bar.js');

  Googleform.aggregateAsset('js', '../lib/moment/moment.js');
  Googleform.aggregateAsset('js', '../lib/angular-moment/angular-moment.js');
  Googleform.aggregateAsset('js', '../lib/moment/locale/de.js');

  Googleform.aggregateAsset('js', '../lib/angular-youtube-mb/src/angular-youtube-embed.js');
  
Googleform.aggregateAsset('js', '../lib/scripts/wow.js',{ weight: -4 });
Googleform.aggregateAsset('js', '../lib/scripts/fitvids.js',{ weight: -9 }); 


  
  /*Googleform.aggregateAsset('js', '../lib/scripts/easing.js',{ weight: -11 });
  Googleform.aggregateAsset('js', '../lib/scripts/modernizr.js',{ weight: -10 });
  Googleform.aggregateAsset('js', '../lib/scripts/fitvids.js',{ weight: -9 });
  Googleform.aggregateAsset('js', '../lib/scripts/backstretch.js',{ weight: -8 });
  Googleform.aggregateAsset('js', '../lib/scripts/swipebox.js',{ weight: -7 });
  Googleform.aggregateAsset('js', '../lib/scripts/flexslider.js',{ weight: -6 });
  Googleform.aggregateAsset('js', '../lib/scripts/tipTip.js',{ weight: -5 });
  Googleform.aggregateAsset('js', '../lib/scripts/wow.js',{ weight: -4 });
  Googleform.aggregateAsset('js', '../lib/scripts/tubular.js',{ weight: -3 });
  Googleform.aggregateAsset('js', '../lib/scripts/menu.js',{ weight: -2 });
  Googleform.aggregateAsset('js', '../lib/scripts/custom.js',{ weight: -1 });*/


  

  /**

Googleform.aggregateAsset('js', '../lib/scripts/custom.js',{
  weight: 4,
  absolute: true
  });


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
