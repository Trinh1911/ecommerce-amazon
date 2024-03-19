import { useState, useEffect, useContext } from "react";
import {
  useDeletedUser,
  useGetAllUser,
  useUpdateUserMutation,
} from "../../Hooks/userHooks";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Form, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { getBase64, getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../Store";
import Modal from "react-bootstrap/Modal";
import {
  useCreateProductMutation,
  useDeletedProduct,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../Hooks/productHooks";

const AdminProduct = () => {
  // get user
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [image, setImage] = useState<File | any>(null);
  const [id, setIdUser] = useState("");
  const [idDeleted, setIdDeleted] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseModalCreate = () => setShowModalCreate(false);
  const handleShowModalCreate = () => {
    setShowModalCreate(true);
  };
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
  // change avatar
  const handleOnchangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log("file", file);
    validateFile(file);
  };
  console.log("image", image);
  const validateFile = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        <Toast>
          <Toast.Body>Please select an image file.</Toast.Body>
        </Toast>;
      } else if (file.size > 1000000) {
        <Toast>
          <Toast.Body>File size is too large.</Toast.Body>
        </Toast>;
      } else {
        setImage(`../images/product/${file.name}`);
        <Toast>
          <Toast.Body>again.</Toast.Body>
        </Toast>;
      }
    }
  };
  // update user
  const { mutateAsync: updateProduct } = useUpdateProductMutation(id);
  // get product
  const { data: products, isLoading } = useGetProductsQuery();
  const { mutateAsync: productDeleted } = useDeletedProduct(idDeleted);
  // create product
  const { mutateAsync: useCreateProduct } = useCreateProductMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await updateProduct({
        name,
        slug,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews,
      });
      handleClose();
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  const submitHandlerCreate = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await useCreateProduct({
        name,
        slug,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews,
      });
      handleCloseModalCreate();
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  const handleSubmitDeleted = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await productDeleted();
      setShowModal(false);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };
  useEffect(() => {
    renderTable();
  }, [products]);
  const renderTable = () => {
    return (
      <table
        id="basic-datatable"
        className="table table-striped table-bordered m-2"
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Brand</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td style={{ display: "flex" }}>
                <div
                  style={{ marginRight: "16px" }}
                  onClick={() => handleShow(product._id)}
                >
                  <i className="fas fa-hammer"></i>
                </div>
                <div onClick={() => handleModal(product._id)}>
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
                <Form.Group className="mb-3" controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="slug"
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control onChange={(e) => setBrand(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="countInStock">
                  <Form.Label>CountInStock</Form.Label>
                  <Form.Control
                    onChange={(e) => setCountInStock(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="numReviews">
                  <Form.Label>NumReviews</Form.Label>
                  <Form.Control
                    onChange={(e) => setNumReviews(Number(e.target.value))}
                  />
                </Form.Group>
                <input type="file" onChange={handleOnchangeAvatar}></input>
                <img
                  src={image ? image : ""}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
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
          {/* modal deleted */}
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
          {/* modal create product */}
          <Modal show={showModalCreate} onHide={handleCloseModalCreate}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitHandlerCreate}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="slug">
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="slug"
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control onChange={(e) => setBrand(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="countInStock">
                  <Form.Label>CountInStock</Form.Label>
                  <Form.Control
                    onChange={(e) => setCountInStock(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="numReviews">
                  <Form.Label>NumReviews</Form.Label>
                  <Form.Control
                    onChange={(e) => setNumReviews(Number(e.target.value))}
                  />
                </Form.Group>
                <input type="file" onChange={handleOnchangeAvatar}></input>
                <img
                  src={image ? image : ""}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                  alt="avatar"
                />
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalCreate}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div>Product Manager</div>
      <Button
        style={{
          margin: "10px 0",
          borderRadius: "50rem",
          backgroundColor: "rgb(47,185,47)",
          boxShadow: "0px 2px 6px 0px rgb(47,185,47, 0.5)",
          border: "none",
        }}
        onClick={handleShowModalCreate}
      >
        <i
          className="fa fa-plus"
          style={{ fontSize: "13px", marginRight: "5px" }}
        />
        Create{" "}
      </Button>
      {renderTable()}
    </>
  );
};

export default AdminProduct;
