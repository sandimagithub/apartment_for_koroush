# Apartment Lab With Sequelize

Apartment managers have:

* a first name
* a last name
* a property address that they manage
* many tenants

Tenants have:

* a first name
* a last name

## Steps: 

* Fork and clone
* `npm install`
* Review what you have in the codebase already

### Your goals are

By leveraging Express, Sequelize, and postgres

* Create the appropriate database with `createdb`
  Note: You'll have to figure out what db name it should be
  Hint: It's in the config.json file ;)
* Generate
  * A Manager model and its migrations
  * A Tenant model and its migrations
* Run the migrations
* Set up your `app.js` file with all the basic modules you need
* Make sure that the app starts on `localhost:3000`
* Set up your routes, and their function handlers
* Use the sequelize models to display all managers in the appropriate
  view
* Use the sequelize models to display all tenants of a manager in the
  appropriate view
* Write create/update/delete on tenants and managers, using the models'
  ORM methods

### Bonus

* Clean up your code to be dry by rendering EJS partials for common
elements

* Figure out how to set up a 1-Many relationship between Managers and
  Tenants. You'll have to read the Sequelize docs
