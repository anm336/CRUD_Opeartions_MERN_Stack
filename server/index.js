const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const FoodModel = require("./models/Food");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://<user, password>@cluster0.mqytunv.mongodb.net/food?retryWrites=true&w=majority",{
    useNewUrlParser: true,
})

app.post("/insert", async(req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({foodName: foodName, daysSinceIAte: days});
    try {
        await food.save();
        res.send("Data Inserted.");
    }catch (error) {
        console.log(error);
    }

});

app.get("/read", async(req,res) => {
    try {
        const items = await FoodModel.find();
        res.send(items);
    }catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async(req, res) =>{
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
})

app.put("/update", async(req, res) => {
    const newFoodName= req.body.newFoodName;
    const id= req.body.id;
    try {
        const updatedFood = await FoodModel.findById(id);
        updatedFood.foodName = newFoodName;
        updatedFood.save();
        res.send("Updated");
    }catch (error) {
        console.log(error);
    }
});

app.listen(3001, ()=>{
    console.log("Server started on port 3001...");
})