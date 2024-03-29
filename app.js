const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./util/database");
const helmet = require("helmet");
const favicon = require("serve-favicon");

const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");
const resetPasswordRouter = require("./router/resetPasswordRouter");
const reportsRouter = require("./router/reportsRouter");
const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");
const ResetPassword = require("./models/resetPasswordModel");

app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use("/", userRouter);
app.use("/user", userRouter);
app.use("/homePage", expenseRouter);
app.use("/expense", expenseRouter);
app.use("/purchase", purchaseMembershipRouter);
app.use("/premium", leaderboardRouter);
app.use("/password", resetPasswordRouter);
app.use("/reports", reportsRouter);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

ResetPassword.belongsTo(User);
User.hasMany(ResetPassword);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("Sequelize running at ", process.env.PORT);
  })
  .catch((err) => console.log(err));



