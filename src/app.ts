import express from "express";
import router from "./routes";
import bodyParser from "body-parser";

// rest of the code remains same
const app = express();
const PORT = 8000;
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
