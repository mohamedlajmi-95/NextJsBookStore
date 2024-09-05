const AUTEUR_API = "/auteurs/";
export const fetchAuteur = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + AUTEUR_API, {
    cache: "no-store",
  });
  const response = await res.json();
  return response.auteurs;
};
export const fetchAuteurById = async (auteurId) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + AUTEUR_API + `${auteurId}`,
    { cache: "no-store" },
    {
      method: "GET",
    }
  );
  const response = await res.json();
  return response;
};
export const deleteAuteur = async (auteurId) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + AUTEUR_API + `${auteurId}`,
    {
      method: "DELETE",
    }
  );
  const response = await res.json();
  return response;
};
export const addAuteur = async (auteur) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + AUTEUR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auteur),
  });
  const response = await res.json();
  return response;
};
export const editLivre = async (auteur) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + AUTEUR_API + `${auteur._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auteur),
    }
  );
  const response = await res.json();
  return response;
};
