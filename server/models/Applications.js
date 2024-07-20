module.exports = (sequelize, DataTypes) => {
    const Applications = sequelize.define('Applications', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        position : {
            type: DataTypes.STRING,
            allowNull: false
        },
        company : {
            type: DataTypes.STRING,
            allowNull: false
        },
        status : {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_applied : {
            type: DataTypes.DATE,
            allowNull: false
        },
        date_followup : {
            type: DataTypes.DATE,
            allowNull: true
        },
        notes : {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Applications;
};