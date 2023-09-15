import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/app", routes);

export default app;
