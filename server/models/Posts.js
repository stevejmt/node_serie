module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        nom_serie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cat_serie: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nb_saison: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Posts;
};