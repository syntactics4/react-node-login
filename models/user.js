const Sequelize = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: {
                args: true,
                msg: "Invalid First Name."
            },
        },
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: {
                args: true,
                msg: "Invalid Last Name."
            },
        },        
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: "Invalid Email. This field must be unique."
            },            
        },
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: {
                args: 6,
                msg: 'Password must be at least 6 characters'
            }
        }
    }
}, {
    hooks: {
        beforeCreate: (user) => {            
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
        },
        beforeUpdate: (user) => {
            if(user.password) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
            }
        }
    },
    instanceMethods: {
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }    
});

module.exports = User;