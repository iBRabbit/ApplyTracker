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

    Statuses.associate = models => {
        Statuses.belongsTo(models.Applications, {
            foreignKey: 'application_id',
            onDelete: 'cascade'
        });
    }

    return Statuses;
}