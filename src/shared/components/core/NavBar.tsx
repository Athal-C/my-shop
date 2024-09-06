import logo from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CartPanel } from "./CartPanel";
import {
  selectCartIsEmpty,
  selectTotalCartItems,
  useCart,
  useCartPanel,
} from "@/services/cart";
import { useAuth } from "@/services/auth";
import { IfLogged } from "../auth/IfLogged";

const isActive = (obj: { isActive: boolean }) =>
  obj.isActive ? "text-xl text-sky-400 font-bold" : "text-xl text-white";

export function NavBar() {
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const isCartPanelOpened = useCartPanel((state) => state.open);
  const toggleCartPanel = useCartPanel((state) => state.toggle);
  const totalCartItems = useCart(selectTotalCartItems);
  const isEmpty = useCart(selectCartIsEmpty);

  function logoutHandler() {
    logout();
    navigate("./login");
  }

  return (
    <div className="fixed z-10 top-0 left-0 right-0 shadow-2xl">
      <div className="flex items-center justify-between h-20 bg-slate-900 text-white p-3 shadow-2xl">
        {/*Logo*/}
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-16" />
          <NavLink to="shop" className={isActive}>
            SHOP
          </NavLink>
        </div>

        {/*Cart Button Badge */}
        <div>
          <button
            disabled={isEmpty}
            className="btn accent lg"
            onClick={toggleCartPanel}
          >
            Cart: {totalCartItems}
          </button>
        </div>
      </div>

      {/*Cart Panel */}
      {isCartPanelOpened && <CartPanel />}

      {/*Login / CMS / Logout buttons*/}
      <div className="fixed bottom-2 right-2 p-5 ">
        <IfLogged
          else={
            <NavLink to="login" className="btn primary lg">
              login
            </NavLink>
          }
        >
          <NavLink to="cms" className="btn accent lg">
            cms
          </NavLink>
          <button onClick={logoutHandler} className="btn danger lg">
            logout
          </button>
        </IfLogged>
      </div>
    </div>
  );
}
