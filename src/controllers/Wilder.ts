import WilderModel from "../models/Wilder";
import Express, { NextFunction, Request, Response }  from "express";
 
const controller = { 
  // CREATE A WILDER
  create: async (req: Request, res: Response, next: NextFunction, err:any): Promise<void> => {
    try {
      await WilderModel.init();

      const wilder = new WilderModel(req.body);
      const result = await wilder.save();
      res.json(result);
    } catch (err: any) {
      if (err.code === 11000) {
        res.status(400).json({ message: "Wilder déjà connu" });
      }
      throw err;   
    }
  },

  // UPDATE A WILDER

  updateById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await WilderModel.findOneAndUpdate({_id : req.params.id});
    if (result) {
      Object.assign(result, req.body);
      await result.save();
      res.json(result);
    } else {
      res.status(404).json({ message: "On en a pas" });
    }
  },


  // GET ALL THE WILDER
  retrieveAll: async (req: Request, res: Response): Promise<void> => {
    const result = await WilderModel.find();
    res.json(result);
  },

  // GET A WILDER

  findById: async (req: Request, res: Response, next: NextFunction, err:any): Promise<void>=> {
    const result = await WilderModel.findOne({_id: req.params.id});
    res.json(result);
  },


  deleteById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = await WilderModel.deleteOne({_id: req.params.id});
    res.json(result);
  },
};

export default controller