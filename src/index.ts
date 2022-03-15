import express from "express";
import {json} from 'body-parser';
import { WilderRouter } from "./routes/wilders";
import mongoose from "mongoose";

const app = express();

app.use(json());
app.use(WilderRouter)

mongoose.connect(
    "mongodb://root:root@localhost:27017/wilderdb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    { autoIndex: true }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));


app.listen(3001, () => {
    console.log("Server is listening on port 3001")
})


