import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div>
                <img src="./images/freshcart-white-logo.svg" alt="logo" />
                <div className='icon-footer'></div>
                </div>
                <Row>
                    <Col sm={12} md={6} lg={4} xl={3} className='col-center'>
                        <div className="box">
                            <h3>our branches</h3>
                            <div> <i className="fa-solid fa-map-location-dot"></i> india</div>
                            <div> <i className="fa-solid fa-map-location-dot"></i> france</div>
                            <div> <i className="fa-solid fa-map-location-dot"></i> africa</div>
                            <div> <i className="fa-solid fa-map-location-dot"></i> australia</div>
                            <div> <i className="fa-solid fa-map-location-dot"></i> russia</div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3} className='col-center'>
                        <div className="box">
                            <h3>quick links</h3>
                            <div> <i className="fa-solid fa-arrow-right"></i> home</div>
                            <div> <i className="fa-solid fa-arrow-right"></i> Vehicles</div>
                            <div> <i className="fa-solid fa-arrow-right"></i> Services</div>
                            <div> <i className="fa-solid fa-arrow-right"></i> Featured</div>
                            <div> <i className="fa-solid fa-arrow-right"></i> Reviews</div>
                            <div> <i className="fa-solid fa-arrow-right"></i> Contact</div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3} className='col-center'>
                        <div className="box">
                            <h3>contact info</h3>
                            <div> <i className="fa-solid fa-phone"></i> 0915855193</div>
                            <div> <i className="fa-solid fa-phone"></i> 0923507488</div>
                            <div> <i className="fa-regular fa-envelope"></i> nguyenkimtrinhntn@gmail.com</div>
                            <div> <i className="fa-solid fa-map-location-dot"></i> Vo oanh, Binh thanh, Ho Chi Minh city</div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3} className='col-center'>
                        <div className="box">
                            <h3>Social</h3>
                            <div> <i className="fa-brands fa-facebook"></i> Sora</div>
                            <div> <i className="fa-brands fa-instagram"></i> kimtrinh1911</div>
                            <div> <i className="fa-brands fa-github"></i> Trinh1911</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
