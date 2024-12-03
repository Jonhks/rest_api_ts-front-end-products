import {
  useNavigate,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductServices";

type ProductDetailProps = {
  product: Product;
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const isAvailable = product.availability;
  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${
              isAvailable ? " text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className=" flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            onClick={() => navigate(`/productos/${product.id}/editar`)}
          >
            Editar
          </button>
          <Form
            className=" w-full"
            method="POST"
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
            action={`productos/${product.id}/eliminar`}
          >
            <input
              type="submit"
              value={"Eliminar"}
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetail;
