"use client";
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useShoppingCart } from "use-shopping-cart";
const CartProductItem = ({ livre }) => {
  const { addItem } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    if (quantity < livre.qtestock) {
      setQuantity(quantity + 1);
    } else window.alert("Not Enough Stock");
  };
  const addToCart = (livre) => {
    const target = {
      id: livre._id,
      title: livre.titre,
      image: livre.couverture,
      price: livre.prix,
    };
    if (quantity < livre.qtestock) {
      addItem(target, { count: quantity })
        .then(() => {
          console.log("Item added to cart:", target);
          setQuantity(1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else window.alert("Not Enough Stock");
  };
  return (
    <article className="col-sm-3 mt-5">
      <div className="card">
        <img
          src={livre?.couverture}
          className="card-img-top p-5"
          alt={livre.titre}
        />
      </div>
      <div className="text-center">
        <div>{livre.titre}</div>
        <div>Prix : {livre.prix} TND </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex">
            {" "}
            <Rating style={{ maxWidth: 100 }} value={5} />
          </div>
        </div>
      </div>
      <div className="text-center">
        <button className="mr-5" onClick={decreaseQuantity}>
          -
        </button>
        <span>{quantity}</span>
        <button className="ml-5" onClick={increaseQuantity}>
          +
        </button>
      </div>

      <div className="text-center">
        <button
          className="btn btn-warning"
          disabled={livre.qtestock <= 1}
          onClick={() => addToCart(livre)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};
export default CartProductItem;
