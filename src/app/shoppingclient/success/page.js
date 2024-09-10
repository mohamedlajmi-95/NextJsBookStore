"use client";
import React, { useEffec, useState, useRef } from "react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
const Success = () => {
  const { clearCart } = useShoppingCart();

  const dataFetchedRef = useRef(false);
  const [nomClient, setNomClient] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const transaction = () => {
    fetch(
      "http://localhost:3000/api/stripe/checkoutSessions/" +
        localStorage.getItem("sessionId")
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNomClient(data.nomClient);
        setEmailClient(data.emailClient);
        localStorage.removeItem("sessionId");
      })
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des détails de la transaction:",
          error
        )
      );
  };

  useEffect(() => {
    clearCart();
    //Pour ne pas exécuter en double
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    //appeler la méthode
    transaction();
  }, []);
  return (
    <div className="h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold">Thank You</h1>
        <p className="text-center text-2xl">Order Placed Successfully</p>
        <h3> Payment made by </h3>
        <h3>Nom : {nomClient}</h3>
        <h3>Email : {emailClient}</h3>
        <Link href="/shoppingClient/cartProducts">
          <p
            className="bg-red-600 text-white py-4 px-12 mt-4 hover:bg-red-800 
cursor-pointer"
          >
            Continue Shopping
          </p>
        </Link>
      </div>
    </div>
  );
};
export default Success;
