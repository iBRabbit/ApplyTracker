module.exports = (sequelize, DataTypes) => {
    const Statuses = sequelize.define('Statuses', {
        application_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Applications',
                key: 'id'
            },
            onDelete: 'cascade'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });



    return Statuses;
}