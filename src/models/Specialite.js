import mongoose from "mongoose";
var SpecialiteSchema = mongoose.Schema(
  {
    nomspecialite: String,
  },
  {
    timestamps: true,
  }
);
const Specialite =
  mongoose.models.Specialite || mongoose.model("Specialite", SpecialiteSchema);
export default Specialite;
