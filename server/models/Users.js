module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
    });

    Users.associate = models => {
        Users.hasMany(models.Applications, {
            foreignKey: 'user_id',
            onDelete: 'cascade'
        });
    };

    return Users;
};