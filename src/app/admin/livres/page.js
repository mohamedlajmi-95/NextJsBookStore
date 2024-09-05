import Listlivres from "@/components/livresComponent/Listlivres";
import { fetchLivres } from "@/services/livreService";
import React from "react";

const getLivres = async () => {
  const data = await fetchLivres();
  return data;
};
const Livrespage = async () => {
  const livres = await getLivres();
  return (
    <div>
     <Listlivres livres={livres}/>
    </div>
  );
};

export default Livrespage;
