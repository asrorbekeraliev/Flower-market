const Sequelize = require('sequelize')

const sequelize = new Sequelize('flower_market', 'asrorbek', '12345', {
    host: 'localhost',
    // port: 5433,
    dialect: 'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.product = require('./product.model.js')(sequelize, Sequelize)
db.comment = require('./comment.model.js')(sequelize, Sequelize)
db.order = require('./order.model.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)
db.earnings = require('./earnings.model.js')(sequelize, Sequelize)

// Associations  between models (tables)

// One to many
db.user.hasMany(db.product, {
    as: 'products',     // alias: when getting a user we can include products associated with this user in the getting as include: ['products']
    onDelete: 'CASCADE',
    constraints: true
})
db.product.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
})

// One to many
db.product.hasMany(db.comment, {
    as: 'comments',
    onDelete: 'CASCADE',
    constraints: true
})
db.comment.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product'
})

// One to many
db.product.hasMany(db.order, {
    as: 'orders',
    onDelete: 'CASCADE',
    constraints: true
})
db.order.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product'
})


module.exports = db
