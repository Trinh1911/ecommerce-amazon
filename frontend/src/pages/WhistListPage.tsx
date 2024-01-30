import { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MessageBox from '../components/MessageBox'
import { Store } from '../Store'
import { WhistListItem } from '../types/WhistList'

export default function WhistListPage() {
  const navigate = useNavigate()

  const {
    state: {
      mode,
      whistlist : {WhistListItems},
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: WhistListItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'WhistList_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }
  const removeItemHandler = (item: WhistListItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }
  return (
    <div>
      <Helmet>
        <title> Favorite Product </title>
      </Helmet>
      <h1>Favorite Product</h1>
      <Row>
        <Col md={8}>
          {WhistListItems.length === 0 ? (
            <MessageBox>
              Favorite Product is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {WhistListItems.map((item: WhistListItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                    <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                         <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={WhistListItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}