import { useEffect } from "react";
import { useCart, useCartPanel } from "@/services/cart";
import { useProductService } from "@/services/products";
import { ServerError, Spinner } from "@/shared/index";
import { ProductCard } from "./components/ProductCard";

export function ShopPage() {
  const openCartPanel = useCartPanel((state) => state.openOverlay);
  const addToCart = useCart((state) => state.addToCart);

  const { actions, state } = useProductService();

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <div>
      <h1 className='title'>SHOP</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError />}

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-16'>
        {state.products.map((p) => {
          return (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() => {
                openCartPanel();
                addToCart(p);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
