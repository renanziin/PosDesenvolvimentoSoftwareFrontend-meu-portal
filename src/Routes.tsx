import { ActionFunctionArgs, createBrowserRouter, LoaderFunctionArgs, redirect } from "react-router-dom";
import ProductList from "./pages/ProductList";
import MainLayout from "./layout/MainLayout";
import EditProduct from "./pages/EditProduct";
import axios from "axios";
import CSVReader from "./pages/CSVReader";

const API_URL = "http://localhost:3001/api/product";

const productsLoader = async () => {
  const response = await axios.get(API_URL);
  console.log("Loader carregou: ",response.data);
  return response.data;
}


const productsAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formAction = formData.get("_action");

  if (formAction === "delete") {
    console.log("Ação de exclusão acionada");
    const productId = formData.get("id");
    await axios.delete(`${API_URL}/${productId}`);
    return null
  }

  return null;
};

const editProductLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await axios.get(`${API_URL}/${params.productId}`);
  return response.data;
};

const editProductAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const productData = Object.fromEntries(formData);
  await axios.put(`${API_URL}/${params.productId}`, productData);
  return redirect("/products"); 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "products",
        element: <ProductList />,
        loader: productsLoader,
        action: productsAction,
      },
      {
        path: "products/:productId/edit",
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: "import-csv",
        element: <CSVReader />,
      },
    ],
  },
]);

export default router;