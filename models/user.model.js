const { Sequelize } = require("sequelize");

module.exports = (sequalize, Sequelize) => {
    const User = sequalize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        lastName: {
            type:  Sequelize.STRING(255),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    }, {
        timestamps: true
    })

    return User
}



