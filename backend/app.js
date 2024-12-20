const express = require("express");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const createGraphqlServer = require("./src/graphql");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.BACKEND_PORT) || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World , This is Visionex !");
});
app.use("/api/video",require("./src/routes/video"))
app.use("/api/image",require("./src/routes/image"))
app.use("/api/auth",require("./src/routes/auth"))

const startServer = async () => {
    try {
        app.use(
            "/graphql",
            expressMiddleware(await createGraphqlServer(), {
                context: (req, res) => ({ req, res }),
            })
        );
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();
