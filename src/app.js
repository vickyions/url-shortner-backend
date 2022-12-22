const express = require("express");
const app = express();
const cors = require("cors");
const url = require("url");
const uuid = require("uuid").v4;

const URLModel = require("./models/URLModel");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(_,res) => res.send("<h1>URL Shortner</h1>"));

app.get("/:shortStr", async (req, res) => {
    try {
        const { shortStr } = req.params;
        //look for the shortStr
        const result = await URLModel.findOne({url : shortStr});
        if (result) {
            //increase click count
            await URLModel.findByIdAndUpdate(result._id, { $inc: {clicks: 1}});
           //do a permanent redirect 301 with new location as origUrl 
            res.redirect(301, result.origUrl);
        } else {
            //no such url in db
            res.status(400).json({
                status: "failed",
                msg: "Please provide a valid Short URL this url doesn't exist in Database",
                err: "invalid short url"
            });
        }
    } catch (err) {
        console.log("GET error while resolving shortURL:: ", err);
        res.status(500).json({
            status: "success",
            msg: "Some server error occcured while resolving the short url",
            err: err.message,
        });
    }
});

app.post("/", async (req, res) => {
    try {
        const { url: urlstr } = req.body;
        //validate urlstr
        if (validURL(urlstr)) {
            //else generate the short url pathname
            let generated = false;
            while (!generated) {
                //generating 6 letter unique pathname
                const shortURL = uuid(urlstr).substring(0, 6);
                const result = await URLModel.findOne({ url: shortURL });

                if (!result) {
                    //unique shortURL
                    const urlObj = await URLModel.create({
                        url: shortURL,
                        origUrl: urlstr,
                    });

                    generated = true;

                    res.status(201).json({
                        status: "success",
                        msg: "URL succeffully shortened",
                        url: urlObj,
                    });
                }
            }
        } else {
            throw new Error("invalid-URL", {
                cause: "URL is not valid check the url",
            });
        }
        res.end();
    } catch (err) {
        if (err.message === "invalid-URL") {
            res.status(400).json({
                status: "failed",
                msg: err.cause,
            });
        }
        console.log("POST err while creating shorturl", err);
        res.status(500).json({
            status: "success",
            msg: "Some server error has occurred",
            err: err.message,
        });
    }
});

function validURL(urlstr) {
    try {
        new url.URL(urlstr);
        return true; //no error thrown
    } catch {
        return false;
    }
}

module.exports = app;
