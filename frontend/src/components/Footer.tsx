import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div>
          <img src="./images/freshcart-white-logo.svg" alt="logo" />
        </div>
        <div className="line gray-dark my-4"></div>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3} className="col-center">
            <div className="box">
              <h3>our branches</h3>
              <div>india</div>
              <div>france</div>
              <div>africa</div>
              <div>australia</div>
              <div>russia</div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="col-center">
            <div className="box">
              <h3>quick links</h3>
              <div> home</div>
              <div> Vehicles</div>
              <div> Services</div>
              <div>Featured</div>
              <div> Reviews</div>
              <div>Contact</div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="col-center">
            <div className="box">
              <h3>contact info</h3>
              <div>0915855193</div>
              <div>0923507488</div>
              <div>nguyenkimtrinhntn@gmail.com</div>
              <div>Vo oanh, Binh thanh, Ho Chi Minh city</div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4} xl={3} className="col-center">
            <div className="box">
              <h3>Social</h3>
              <div>Sora</div>
              <div>kimtrinh1911</div>
              <div>Trinh1911</div>
            </div>
          </Col>
        </Row>
        <div className="line gray-dark my-4"></div>
        <div className="text-center">© 2022 - 2024 FreshCart eCommerce HTML Template. All rights reserved. Powered by Codescandy </div>
      </Container>
    </footer>
  );
};

export default Footer;
