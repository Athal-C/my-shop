import { Product } from "@/model/product";

interface ProductCardProps {
  product: Partial<Product>;
  onAddToCart: (product: Partial<Product>) => void;
}

export function ProductCard(props: ProductCardProps) {
  const { product: p } = props;
  return (
    <div
      key={props.product.id}
      className="bg-white text-black rounded-xl shadow-xl overflow-hidden"
    >
      {p.img && (
        <img
          src={props.product.img}
          alt={props.product.name}
          className="object-cover w-full h-56"
        />
      )}

      <div className="flex justify-between items-center gap-3 p-2 text-2xl font-bold">
        <div>{props.product.name}</div>
        <div>€ {props.product.cost}</div>
      </div>

      <p className="p-3">{props.product.description}</p>

      <button
        className="text-white bg-sky-700 hover:bg-sky-600 transition w-full text-center font-bold p-3 "
        onClick={() => props.onAddToCart(p)}
      >
        Add to Cart
      </button>
    </div>
  );
}
