module.exports = (sequalize, Sequelize) => {
    const Comment = sequalize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        text: {
            type:  Sequelize.STRING(1000),
            allowNull: false,
        },
    }, {
        timestamps: true
    })

    return Comment
}



