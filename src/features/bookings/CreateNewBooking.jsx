import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBookingForm from "./CreateBookingForm";

function CreateNewBooking() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="addBooking">
          <Button>Add new Booking</Button>
        </Modal.Open>
        <Modal.Window name="addBooking">
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CreateNewBooking;
