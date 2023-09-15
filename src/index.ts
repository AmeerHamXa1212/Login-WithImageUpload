import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const Port = process.env.PORT;

//middlewares

app.listen(Port, () => console.info(`Server is running at Port ${Port}`));
