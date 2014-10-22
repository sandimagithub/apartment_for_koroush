"use strict";

module.exports = function(sequelize, DataTypes) {
  var Tenant = sequelize.define("Tenant", {
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
    manager_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) { //models are the "tables" we have access to.  
        // associations can be defined here
        Tenant.belongsTo(models.Manager, 
        { foreignKey: 'manager_id'} ); //"belongsTo" is Sequelize  (sequelizejs.com)
        
      }
    }
  });

  return Tenant;
};
