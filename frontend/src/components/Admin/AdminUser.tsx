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
import ModalComponent from "../ModalComponent";
import { Route, Routes } from "react-router-dom";

const AdminUser = () => {
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
  // const handleModal = (id: string) => {
  //   setShowModal(true);
  //   setIdDeleted(id);
  // };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // update user
  const { mutateAsync: updateUser } = useUpdateUserMutation(id);
  // get user
  const { data: users, isLoading } = useGetAllUser();
  const { data: userDeleted } = useDeletedUser();
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
  // const handleSubmitDeleted = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   try {
  //     const data = await userDeleted(idDeleted);
  //   } catch (err) {
  //     toast.error(getError(err as ApiError));
  //   }
  // };
  useEffect(() => {
    renderTable();
  }, [users]);
  const renderTable = () => {
    return (
      <table
        id="basic-datatable"
        className="table table-striped table-bordered m-2"
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Admin</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.isAdmin ? "true" : "false"}</td>
              <td>{user.phone}</td>
              <td style={{ display: "flex" }}>
                <div
                  style={{ marginRight: "16px" }}
                  onClick={() => handleShow(user._id)}
                >
                  <i className="fas fa-hammer"></i>
                </div>
                <div>
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
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div>Quản Lí Người Dùng</div>
      {renderTable()}
    </>
  );
};

export default AdminUser;
