module.exports = (sequalize, Sequelize) => {
    const Earnings = sequalize.define('earnings', {
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true
    })

    return Earnings
}



