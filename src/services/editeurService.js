const EDITEUR_API = "/editeur/";
export const fetchEditeurs = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + EDITEUR_API, {
    cache: "no-store",
  });
  const response = await res.json();
  return response.editeurs;
};
