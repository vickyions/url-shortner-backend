const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
mongoose.set("strictQuery", false);
mongoose.connect(URI, { dbName: "shortendurl" }, (err) => {
    if (err) console.log(err);
    else console.log("DB connected");
});

mongoose.connection.on("reconnected", () => console.log("Reconnected to db"));
mongoose.connection.on("connected", () => console.log("Connceted to db"));
mongoose.connection.on("connecting", () => console.log("Connecting to db"));
mongoose.connection.on("disconnecting", () =>
    console.log("Disconnecting to db")
);
mongoose.connection.on("disconnected", () => console.log("Disconnected to db"));
mongoose.connection.on("error", (err) =>
    console.log("Error from mongoose:: ", err)
);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log("Server started on Port:: ", PORT);
});
