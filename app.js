var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    app = express(),
    models = require('./models/index'),
    // ejs-locals, for layouts
    engine = require('ejs-locals'),
    session = require('cookie-session'), 
    flash = require('connect-flash');

app.set("view engine", "ejs");

// this is different from setting the view engine
// it enables the layout functionality
app.engine('ejs', engine);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride("_method"));

app.use(express.static(__dirname + '/public'));

//enable the session 
//the session needs a key
//with which to encode the session values
//exposed to us by require('cookie-session')
app.use(session({
  keys:['key']
}));

//enable the flash messages api 
//exposed to us by require('connect-flash')
app.use(flash());

app.get("/", function(req, res) {
  res.redirect("/managers");
});

//we are "persisting" across multiple requests
//this is the route to get all the managers
app.get("/managers", function(req, res) { // uses the flash message when there is an error
  models.Manager.findAll().then(function(managers) { 
    res.render('index', 
      { managers: managers, 
      messages: req.flash('info') //when there is an error, we want to render it to the page
    });
  });
});

//this is the route to get all the tenants associated with that manager
app.get("/managers/:id/tenants", function(req, res) {
    var managerId = parseInt(req.params.id, 10);
    models.Tenant.findAll(
    { where: { manager_id: managerId } }
  ).then(function(tenants) {
    res.render('tenants', { 
      tenants: tenants,
      managerId: managerId,
      messages: req.flash('info') //when there is an error, we want to render it to the page
       });
  });
});

//when the entire thing is successful, then sequelize is invoked by the call back function to redirect to the managers page, passing the newly created object--which redirects back to app.get to show all the managers again. 
//we also want an error callback so that the app doesn't stall when there is an error


//this is the route to post new managers into DB
app.post("/managers", function(req, res) {
  models.Manager.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    property: req.body.property // a post request is being sent to this route, the handler is invoked
  }).then(function(manager) { 
    res.redirect('/managers'); 
  }, function(error){ // this is the failure call back function
    req.flash('info', error); //this tells the session to remember the error, under the key 'info' (this sets the error object in the flash)
    res.redirect('/managers'); // we tell express to send a redirect message back to the browser 

  });
});

//this is the route to poste new tenants to the DB associated with that manager

app.post("/managers/:id/tenants", function(req,res){
  var managerId = parseInt(req.params.id, 10), //you want to tell parseInt what base you are in.  In this case, we are in the base 10 of that number
    path = ["/managers/", managerId, "/tenants"].join(''), //now use the join function to join the strings together
    tenant =  models.Tenant.build({
          firstname: req.body.firstname,
          lastname: req.body.lastname
          });
  
  //Promise libraries allow you to write cleaner code if you have a lot of nested functions

  models.Manager
    .find(managerId) //find the manager with managerId, the result of .find accesses a promise in sequelize
    .then(function(manager){
      manager.addTenant(tenant) //then add tenant to found manager
      .catch(function(error) { // catch any errors and set the flash message
          req.flash('info', error);//this tells the session to remember the error, under the key 'info' (this sets the error object in the flash)
            })
          .finally(function() { //finally redirect to the path
            res.redirect(path);
             });
        });

    });

  //models.Tenant.create({  --this code is now replaced with the above association syntax
    //we no longer need the bottomw portion of this code-now commented out
    // firstname: req.body.firstname,
    // lastname: req.body.lastname, 
    // manager_id: parseInt(managerId, 10)
  


app.listen(3000);






















