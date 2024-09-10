"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import "./style.css";
export default function CartModal() {
  const {
    shouldDisplayCart,
    cartDetails,
    cartCount,
    removeItem,
    clearCart,
    totalPrice,
  } = useShoppingCart();
  const [status, setStatus] = useState("idle");

  async function handleClickStripe(event) {
    event.preventDefault();
    if (cartCount > 0) {
      setStatus("loading");
      try {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
        if (!stripe) throw new Error("Stripe failed to initialize.");
        const checkoutResponse = await fetch("/api/stripe/checkoutSessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartDetails }),
        });
        const { sessionId } = await checkoutResponse.json();
        localStorage.setItem("sessionId", sessionId);
        const stripeError = await stripe.redirectToCheckout({ sessionId });
        if (stripeError) {
          console.error(stripeError);
        }
      } catch (error) {
        console.error(error);
        setStatus("redirect-error");
      }
    } else {
      setStatus("no-items");
    }
  }

  return (
    <div
      className={`bg-white flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500 ${
        shouldDisplayCart ? "opacity-100 z-10" : "opacity-0"
      }`}
    >
      {cartCount && cartCount > 0 ? (
        <>
          <div onClick={() => clearCart()}>
            <ClearIcon />
          </div>
          <div id="partieImprimable">
            {Object.values(cartDetails).map((item) => (
              <div className="flex items-center gap-4 mb-3" key={item.id}>
                <p>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "60px", height: "60px" }}
                  />
                </p>
                <div>
                  {item.title}{" "}
                  <span className="text-xs">({item.quantity})</span>
                </div>
                <div className="ml-auto">{item.price} TND</div>

                <div id="a-exclure">
                  <button
                    className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
                    onClick={() => removeItem(item.id)}
                  >
                    <DeleteIcon color="secondary" />
                  </button>
                </div>
              </div>
            ))}
            <article className="mt-3 flex flex-col">
              Total : {totalPrice} TND
              <div id="a-exclure">
                {/* zone d'impression */}
                <button
                  className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100"
                  onClick={() => window.print()}
                >
                  Imprimer
                </button>

                <button
                  className="bg-amber-50 hover:bg-amber-500 hover:text-white 
transition-colors duration-500 text-amber-500 py-3 px-5 rounded-md w-100"
                  onClick={(event) => handleClickStripe(event)}
                >
                  {status !== "loading" ? "Proceed to checkout" : "Loading..."}
                </button>
              </div>
            </article>
          </div>
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}
    </div>
  );
}
