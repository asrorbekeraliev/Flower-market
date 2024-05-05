module.exports = (sequalize, Sequelize) => {
    const Product = sequalize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        image: {
            type:  Sequelize.STRING(1000),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull: false,
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    return Product
}



