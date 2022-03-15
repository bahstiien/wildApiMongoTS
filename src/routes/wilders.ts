import express, {Request, Response, NextFunction, ErrorRequestHandler}from "express";

const router = express.Router()

// // CREATE A WILDER
// router.post("/api/wilders", runAsyncWrapper(wilderController.create));

// // READ
// router.get("/api/wilders", runAsyncWrapper(wilderController.retrieveAll));
// router.get("/api/wilders/:id", runAsyncWrapper(wilderController.findById));

// // UPDATE A WIDLER BY ID
// router.put("/api/wilders/:id", wilderController.updateById);

// // DELETE A WILDER BY ID
// router.delete("/api/wilders/:id", wilderController.deleteById);

router.use((err: ErrorRequestHandler, req : Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "A problem !" });
});

router.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json("Sorry can't find that!");
});

export { router as WilderRouter}