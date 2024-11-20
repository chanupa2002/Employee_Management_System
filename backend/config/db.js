const mongoose = require("mongoose");

const dburl = "mongodb+srv://athsara:Sy52MisRzvGSS9vf@cluster0.hiake.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(dburl);
        console.log("MongoDB Connected");
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

module.exports = connection;
