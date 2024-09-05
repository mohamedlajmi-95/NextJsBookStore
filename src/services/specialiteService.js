const SPECIALITE_API = "/specialites/";
export const fetchSpecialites = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + SPECIALITE_API, {
    cache: "no-store",
  });
  const response = await res.json();
  return response;
};
