import React from "react";
import CartLivreItem from "@/components/client/shoppingCart/cartProductItem";
import { fetchLivres } from "@/services/livreService";
async function getLivres() {
  const data = await fetchLivres();
  return data;
}
const CartLivresPage = async () => {
  const livres = await getLivres();
  return (
    <>
      <div className="row">
        {livres &&
          livres?.map((livre) => (
            <CartLivreItem key={livre?._id} livre={livre} />
          ))}
      </div>
    </>
  );
};
export default CartLivresPage;
