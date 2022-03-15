import express, {Request, Response, NextFunction, RequestHandler} from "express";
import mongoose from "mongoose";
import wilderController from "./controllers/Wilder";
import cors from "cors";

const app = express();
app.use(cors());

// database
mongoose
  .connect(
    "mongodb://root:root@localhost:27017/wilderdb?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    { autoIndex: true }
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use(express.json());

function runAsyncWrapper(handler : Function ): RequestHandler {
  return async function (req: Request, res: Response, next: NextFunction) {
   try{
     await handler(req, res, next);
   } catch (err :any){
     console.log("We Have a pb");
     next(err);
   }
  };
}

// CREATE A WILDER
app.post("/api/wilders", runAsyncWrapper(wilderController.create));

// READ
app.get("/api/wilders", runAsyncWrapper(wilderController.retrieveAll));
app.get("/api/wilders/:id", runAsyncWrapper(wilderController.findById));

// UPDATE A WIDLER BY ID
app.put("/api/wilders/:id", runAsyncWrapper(wilderController.updateById));

// DELETE A WILDER BY ID
app.delete("/api/wilders/:id", runAsyncWrapper(wilderController.deleteById));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "A problem !" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json("Sorry can't find that!");
});

//Start Server
app.listen(3001, () => console.log("Server started on 3001"));
