const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((self) => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     // Recipe.create({
//     //   title: "Asian Glazed Chicken Thighs",
//     //   cuisine: "Asian",
//     // }).then((res) => console.log(res.title));

//     Recipe.insertMany(data).then((res) =>
//       console.log(res.map((eachRes) => eachRes.title))
//     );
//     Recipe.updateOne(
//       { title: "Rigatoni alla Genovese" },
//       { duration: 100 }
//     ).then((res) => console.log(res, "duration updated"));

//     Recipe.deleteOne({ title: "Carrot Cake" }).then((res) =>
//       console.log(res, "deleted")
//     );
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    await Recipe.insertMany(data);
    await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((res) => console.log(res, "duration updated"));
    await Recipe.deleteOne({ title: "Carrot Cake" }).then((res) =>
      console.log(res, "deleted")
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

mongoose.connection.close();
