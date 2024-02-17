module.exports = (sequelize, Sequelize) => {
  const ProductCategory = sequelize.define("product_categories", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    created_user: {
      type: Sequelize.STRING,
    },
    created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_user: {
      type: Sequelize.STRING,
    },
    updated_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return ProductCategory;
};
