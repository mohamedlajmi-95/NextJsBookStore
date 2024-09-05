import mongoose from "mongoose";
var editeurSchema = mongoose.Schema(
  {
    maisonedit: String,
    sitweb: String,
    email: String,
  },
  {
    timestamps: true,
  }
);
const Editeur =
  mongoose.models.Editeur || mongoose.model("Editeur", editeurSchema);
export default Editeur;
