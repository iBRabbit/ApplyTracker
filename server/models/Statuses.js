module.exports = (sequelize, DataTypes) => {
    const Statuses = sequelize.define('Statuses', {
        user_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'Users',
                key: 'id'
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });



    return Statuses;
}