const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
mongoose.connect(URI, {dbName: "shortendurl"}, (err) => {
    if (err) console.log(err);
    else console.log("DB connected");
});

mongoose.connection.on("reconnected", console.log);
mongoose.connection.on("connected", console.log);
mongoose.connection.on("connecting", console.log);
mongoose.connection.on("disconnecting", console.log);
mongoose.connection.on("disconnected", console.log);
mongoose.connection.on("error", console.log);

app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log("Server started on Port:: ", PORT);
});
