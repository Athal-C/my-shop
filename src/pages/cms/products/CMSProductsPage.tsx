import { useProductService } from "@/services/products";

export function CMSProductsPage() {
  const { state, actions } = useProductService();

  async function getProductsHandler() {
    actions.getProducts();
  }

  return (
    <div>
      <h1 className='title'>CMS</h1>
      <p className='flex font-bold text-xl justify-center text-center p-3'>
        Pagina Prodotti
      </p>
      <hr className='my-8' />

      {state.pending && <div>loading...</div>}
      {state.error && (
        <div className='flex font-bold text-2xl justify-center text-center p-3'>
          An error has occurred
        </div>
      )}

      <button className='btn primary' onClick={getProductsHandler}>
        GET
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
