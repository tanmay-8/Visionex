const express = require("express");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const createGraphqlServer = require("./src/graphql");
require("dotenv").config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(bodyParser.json());

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
