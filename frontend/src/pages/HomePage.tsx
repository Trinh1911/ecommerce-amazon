import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Col, Row } from "react-bootstrap";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../Hooks/productHooks";
import { getError } from "../utils";
import  {ApiError}  from "../types/ApiError";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
  ) : (
    <>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <Row>
        {products!.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
