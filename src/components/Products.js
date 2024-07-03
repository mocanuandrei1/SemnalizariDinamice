import ProductCard from "./ProductCard";
import { products } from "@/lib/utils/products";

const Produse2 = () => {
  return (
    <section id="Produse" className="my-28 max-w-7xl mx-auto px-6 xl:px-0">
      <div className="pb-12 text-center text-black">
        <p>PRODUSE</p>
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-black">
          Accesorii și Echipamente Auto
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-strech">
        {products.map((product) => (
          <ProductCard
            key={product.productID}
            image={product.productImage}
            name={product.productName}
            price={product.productPrice}
          />
        ))}
      </div>
    </section>
  );
};

export default Produse2;
