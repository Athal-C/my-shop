import { useEffect } from "react";
import { useProductService } from "@/services/products";
import { ServerError, Spinner } from "@/shared/index";
import { CMSProductList } from "./components/CMSProductslist";
import { CMSProductForm } from "./components/CMSProductForm";

export function CMSProductsPage() {
  const { state, actions } = useProductService();

  useEffect(() => {
    actions.getProducts();
  }, []);

  return (
    <div>
      <h1 className='title'>CMS</h1>

      {state.pending && <Spinner />}
      {state.error && <ServerError message={state.error} />}

      <CMSProductForm
        activeItem={state.activeItem}
        onClose={actions.resetActiveItem}
        onAdd={actions.addProduct}
        onEdit={actions.editProduct}
      />

      <CMSProductList
        items={state.products}
        activeItem={state.activeItem}
        onEditItem={actions.setActiveItem}
        onDeleteItem={actions.deleteProduct}
      />

      <button onClick={() => actions.setActiveItem({})} className='btn primary'>
        ADD NEW
      </button>
    </div>
  );
}
