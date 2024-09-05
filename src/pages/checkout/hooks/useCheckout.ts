import { OrderForm, OrderUser } from "@/model/order-form";
import { useCart, selectTotalCartCost, selectCartList } from "@/services/cart";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function useCheckout() {
  const initialState: OrderUser = { name: "", email: "" };
  const [user, setUser] = useState<OrderUser>(initialState);
  const [dirty, setDirty] = useState(false);

  const order = useCart(selectCartList);
  const totalCartCost = useCart(selectTotalCartCost);

  const clearCart = useCart((state) => state.clearCart);
  const navigate = useNavigate();

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser((s) => ({ ...s, [name]: value }));
    setDirty(true);
  }

  async function sendOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const orderInfo: OrderForm = {
      user,
      order,
      status: "pending",
      total: totalCartCost,
    };
    console.log(orderInfo);

    clearCart();
    navigate("/thankyou");
  }

  const isNameValid = user.name.length;
  const isEmailValid = user.email.match(EMAIL_REGEX);
  const isValid = isNameValid && isEmailValid;

  return {
    validators: {
      isValid,
      isNameValid,
      isEmailValid,
    },
    actions: {
      sendOrder,
      changeHandler,
    },
    user,
    dirty,
    totalCartCost,
  };
}
