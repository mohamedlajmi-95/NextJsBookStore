import mongoose from "mongoose";
var auteurSchema = mongoose.Schema(
  {
    nomauteur: String,
    email: String,
    numtel: String,
  },
  {
    timestamps: true,
  }
);
const Auteur = mongoose.models.Auteur || mongoose.model("Auteur", auteurSchema);
export default Auteur;
