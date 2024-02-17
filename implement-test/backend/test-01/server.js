const express = require("express");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const app = express();
const morgan = require("morgan");

var corsOptions = {
  origin: "http://localhost:5173",
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
const User = db.user;
const ProductCategory = db.product;

// for development
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// for productiont
// db.sequelize.sync().then(() => {
//   console.log("connect database");
//   initial();
// });

//routes
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/product.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const saltRounds = 10;

async function initial() {
  try {
    await Promise.all([
      Role.create({ id: 1, name: "administrator" }),
      Role.create({ id: 2, name: "customer" }),
    ]);

    const [rolesCustomer, rolesAdmin] = await Promise.all([
      Role.findAll({ where: { name: "customer" } }),
      Role.findAll({ where: { name: "administrator" } }),
    ]);

    const hashedPasswordCustomer = await bcrypt.hash("123", saltRounds);
    const hashedPasswordAdmin = await bcrypt.hash("admin123", saltRounds);

    const [userCustomer, userAdmin] = await Promise.all([
      User.create({
        id: 1,
        username: "customer",
        password: hashedPasswordCustomer,
      }),
      User.create({
        id: 2,
        username: "admin",
        password: hashedPasswordAdmin,
      }),
    ]);

    await Promise.all([
      userCustomer.setRoles(rolesCustomer),
      userAdmin.setRoles(rolesAdmin),
    ]);

    await Promise.all([
      ProductCategory.create({
        name: "Electronics",
        active: true,
        created_user: "admin",
      }),
      ProductCategory.create({
        name: "Clothing",
        active: true,
        created_user: "admin",
      }),
    ]);

    console.log("Initialization data added successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
    process.exit(1);
  }
}
