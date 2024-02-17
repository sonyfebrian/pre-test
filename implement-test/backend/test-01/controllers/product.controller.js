const db = require("../models");
const ProductCategory = db.productCategory;

exports.createProductCategory = (req, res) => {
  ProductCategory.create({
    name: req.body.name,
    active: req.body.active,
    created_user: req.body.created_user,
  })
    .then((category) => {
      res
        .status(201)
        .send({ message: "Product category created successfully", category });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAllProductCategories = (req, res) => {
  ProductCategory.findAll()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findProductCategoryById = (req, res) => {
  const id = req.params.id;

  ProductCategory.findByPk(id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Product category not found" });
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateProductCategoryById = (req, res) => {
  const id = req.params.id;

  ProductCategory.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Product category was updated successfully." });
      } else {
        res.status(404).send({
          message: `Cannot update product category with id=${id}. Maybe category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating product category with id=" + id });
    });
};

exports.deleteProductCategoryById = (req, res) => {
  const id = req.params.id;

  ProductCategory.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Product category was deleted successfully." });
      } else {
        res.status(404).send({
          message: `Cannot delete product category with id=${id}. Maybe category was not found!`,
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error deleting product category with id=" + id });
    });
};
