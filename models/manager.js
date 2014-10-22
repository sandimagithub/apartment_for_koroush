"use strict";

module.exports = function(sequelize, DataTypes) {
  var Manager = sequelize.define("Manager", {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: { //isAlpha is built into Sequelize
          msg:'Your first name should at least be one character!'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          msg:'Your last name hould at least be one character!'
        }
      }
    },
    property: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) { //models are the "tables" we have access to.  
        // associations can be defined here
        Manager.hasMany(models.Tenant, 
        { foreignKey: 'manager_id'} ); //"hasMany" is Sequelize  (sequelizejs.com)
        
      }
    }
  });

  return Manager;
};
