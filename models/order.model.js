module.exports = (sequalize, Sequelize) => {
    const Order = sequalize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        full_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        region: {
            type:  Sequelize.STRING(255),
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(255),
            allowNull: true,
        }
    }, {
        timestamps: true
    })

    return Order
}



