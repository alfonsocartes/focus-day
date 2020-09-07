//jshint esversion:6

// NextJS Documentation:
// API route support: https://nextjs.org/docs/api-routes/introduction
// export default (req, res) => {
//     res.statusCode = 200
//     res.json({ name: 'John Doe' })
//   }

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.connect(
//   "mongodb+srv://admin-alfonso:test123@cluster0.qjhla.mongodb.net/todolistDB",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   }
// );

const itemsSchema = {
  text: String,
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  text: "Welcome to your todolist!",
});

const item2 = new Item({
  text: "Hit the + button to add a new item.",
});

const item3 = new Item({
  text: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  text: String,
  items: [itemsSchema],
};

const List = mongoose.model("list", listSchema);

function createTask(req, res) {
  const itemText = req.body.newItem;

  const item = new Item({
    text: itemText,
  });

  item.save();
  res.redirect("/");
}

function readTasks(req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved to collection.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
}

function deleteTask(req, res) {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
}

// app.get("/", function (req, res) {
//   Item.find({}, function (err, foundItems) {
//     if (foundItems.length === 0) {
//       Item.insertMany(defaultItems, function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Successfully saved to collection.");
//         }
//       });
//       res.redirect("/");
//     } else {
//       res.render("list", { listTitle: "Today", newListItems: foundItems });
//     }
//   });
// });

// app.post("/", function (req, res) {
//   const itemText = req.body.newItem;

//   const item = new Item({
//     text: itemText,
//   });

//   item.save();
//   res.redirect("/");
// });

// app.post("/delete", function (req, res) {
//   const checkedItemId = req.body.checkbox;

//   Item.findByIdAndRemove(checkedItemId, function (err) {
//     if (!err) {
//       console.log("Successfully deleted checked item.");
//       res.redirect("/");
//     }
//   });
// });

app.listen(port, function () {
  console.log("Server started successfully.");
});
