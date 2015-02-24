'use strict';

// The Package is past automatically as first parameter
module.exports = function(Googleform, app, auth, database) {

  app.get('/googleform/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/googleform/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/googleform/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/googleform/example/render', function(req, res, next) {
    Googleform.render('index', {
      package: 'googleform'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
