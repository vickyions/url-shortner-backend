const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: { type: String, required: true, unique: true },
    origUrl: { type: String, required: true },
    clicks: { type: Number, required: true, default: 0 },
});

const URL = mongoose.model("shorturls", urlSchema);

module.exports = URL;
