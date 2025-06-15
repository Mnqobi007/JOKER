import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = "https://v2.jokeapi.dev";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index", { content: "JOKE" });
});

app.post("/get-joke", async (req, res) => {
    try {
        const data = {
            category: req.body.category,
            language: req.body.language,
            type: req.body.type
        };

        const result = await axios.get(`${API_URL}/joke/${data.category}?lang=${data.language}&type=${data.type}`);
        const jokeText = result.data.type === "single"
            ? result.data.joke
            : `${result.data.setup} <br>${result.data.delivery}`;

        res.json({ joke: jokeText });
    } catch (error) {
        res.json({ joke: "Oops! Something went wrong." });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
