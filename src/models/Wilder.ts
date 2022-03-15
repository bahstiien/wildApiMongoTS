import mongoose from "mongoose";``

interface IWilder {
    name : †
}

const WilderSchema = new mongoose.Schema({
  name: { 
      type: String, 
      unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});

module.exports = mongoose.model("wilder", WilderSchema);