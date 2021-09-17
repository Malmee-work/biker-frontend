import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Datetime from "react-datetime";
import { Moment } from "moment";
import moment from "moment";

interface Props {
  title: string;
  handleClose: () => void;
  handleSave: (date: string) => void;
  afterTimeStamp?: string;
}
// Date picker component for picking a date and time
const DatePicker: React.FunctionComponent<Props> = ({
  title,
  handleClose,
  handleSave,
  afterTimeStamp,
}) => {
  const [date, setDate] = useState<string>();

  const onChange = (event: Moment | string): void => {
    if (typeof event === "string") {
      alert("Date is in incorrect format");
    } else {
      setDate(event.format("YYYY-MM-DD HH:mm:ss"));
    }
  };

  const isValidDate = (currentDate: Moment): boolean => {
    if (afterTimeStamp) {
      return currentDate.isSameOrAfter(moment(afterTimeStamp));
    } else {
      return currentDate.isSameOrAfter(moment());
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="date-picker-body">
        <Datetime onChange={onChange} input={false} isValidDate={isValidDate} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="secondary"
          onClick={(): void => handleSave(date || "")}
          disabled={!date}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DatePicker;
