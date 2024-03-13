import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
interface Props {
  show: boolean;
  handleClose?: () => void;
  // handleSubmitDeleted?: () => void;
}
const ModalComponent = ({ show, handleClose }: Props) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleSubmitDeleted}>
            Sure
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
