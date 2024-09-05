import { fetchEditeurs } from "@/services/editeurService";
import { fetchSpecialites } from "@/services/specialiteService";
import { fetchAuteur } from "@/services/auteurService";
import NewLivre from "@/components/livresComponent/NewLivreComponent";
const getEditeurs = async () => {
  const data = await fetchEditeurs();
  return data;
};
const getSpecialites = async () => {
  const data = await fetchSpecialites();
  return data;
};
const getAuteurs = async () => {
  const data = await fetchAuteur();
  return data;
};
const NewLivrePage = async () => {
  const editeurs = await getEditeurs();
  const specialites = await getSpecialites();
  const auteurs = await getAuteurs();
  return (
    <div>
      <NewLivre
        LesEditeurs={editeurs}
        lesSpecialites={specialites}
        lesAuteurs={auteurs}
      />
    </div>
  );
};
export default NewLivrePage;
