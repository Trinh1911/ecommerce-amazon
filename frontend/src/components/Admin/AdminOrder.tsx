import { useState, useEffect, useContext } from "react";
import {
  useDeletedUser,
  useGetAllUser,
  useUpdateUserMutation,
} from "../../Hooks/userHooks";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../Store";
import Modal from "react-bootstrap/Modal";
import { useGetOrderHistoryQuery } from "../../hooks/orderHooks";
const AdminOrder = () => {
  const {
    state: { userInfo },
    dispatch,
  } = useContext(Store);
  // get user
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setIdUser] = useState("");
  const [idDeleted, setIdDeleted] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (id: string) => {
    setShow(true);
    setIdUser(id);
  };
  const handleModal = (id: string) => {
    setShowModal(true);
    setIdDeleted(id);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // update user
  const { mutateAsync: updateUser } = useUpdateUserMutation(id);
  // get order
  const { data: orders, isLoading } = useGetOrderHistoryQuery();
  const { mutateAsync: userDeleted } = useDeletedUser(idDeleted);
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await updateUser({
        name,
        email,
        address,
        phone,
      });
      if (userInfo?._id === id) {
        dispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  const handleSubmitDeleted = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await userDeleted();
      setShowModal(false);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  useEffect(() => {
    renderTable();
  }, [orders]);
  const renderTable = () => {
    return (
      <table
        id="basic-datatable"
        className="table table-striped table-bordered m-2"
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DATE</th>
            <th scope="col">TOTAL</th>
            <th scope="col">PAID</th>
            <th scope="col">DELIVERED</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
              <td>
                {order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}
              </td>
              <td style={{ display: "flex" }}>
                <div
                  style={{ marginRight: "16px" }}
                  onClick={() => handleShow(order._id)}
                >
                  <i className="fas fa-hammer"></i>
                </div>
                <div onClick={() => handleModal(order._id)}>
                  <i className="fas fa-trash"></i>
                </div>
              </td>
            </tr>
          ))}
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Chi tiết người dùng</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Address</Form.Label>
                  <Form.Control onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <div className="mb-3 text-center mt-3">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    style={{ background: "rgba(114, 124, 245, 1)" }}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Offcanvas.Body>
          </Offcanvas>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmitDeleted}>
                Sure
              </Button>
            </Modal.Footer>
          </Modal>
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div>Quản Lí Order</div>
      {renderTable()}
    </>
  );
};

export default AdminOrder;
