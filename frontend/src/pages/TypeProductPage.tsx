import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../Hooks/productHooks";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { Col } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import BreadcrumbComponent from "../components/BreadcrumbComponent";

const TypeProductPage = () => {
  const params = useParams();
  const { category } = params;
  console.log("category", category);
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductByCategoryQuery(category!);
  console.log("products", products);
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <>
      <Helmet>
        <title>Amazon</title>
      </Helmet>

      {/* Popular Products */}
      <div className="container mx-20 mb-5">
        <div className="mb-6 mb-24">
        <BreadcrumbComponent category={category} />
        </div>
        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products!.map((product) => (
            <Col key={product.slug}>
              <ProductItem product={product} />
            </Col>
          ))}
        </div>
      </div>
    </>
  );
};

export default TypeProductPage;
