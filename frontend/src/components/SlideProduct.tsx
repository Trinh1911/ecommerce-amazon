import Slider from "react-slick";
import { Product } from "../types/Product";
import ProductItem from "./ProductItem";
import { Col } from "react-bootstrap";
interface Props {
  products: Product[];
}
function SlideProduct({ products }: Props) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {products!.map((product) => (
          <Col key={product.slug} className="col-width">
            <ProductItem product={product} />
          </Col>
        ))}
      </Slider>
    </div>
  );
}

export default SlideProduct;
