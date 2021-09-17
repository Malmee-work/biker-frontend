import React from "react";
import { Button } from "react-bootstrap";
import assignParcel from "../../data/assign-parcel";
import { ParcelStatusMap, ParcelType } from "../../data/parcel-type";

interface Props {
  parcel: ParcelType;
  handleSelect: () => void;
}

const ParcelItem: React.FunctionComponent<Props> = ({ parcel, handleSelect }) => {
  const onSelect = async (): Promise<void> => {
    if (parcel.id) {
      const [isSuccess, response] = await assignParcel(parcel.id);
      if (isSuccess) {
        handleSelect();
      } else {
        alert(response);
      }
    }
  };
  return (
    <tr>
      <td>{parcel.pickupAddress}</td>
      <td>{parcel.dropoffAddress}</td>
      <td>{parcel.status && ParcelStatusMap.get(parcel.status)}</td>
      <td>
        {parcel.status === "AVAILABLE" ? (
          <Button className="action-button" variant="secondary" onClick={onSelect}>
            Select
          </Button>
        ) : null}
      </td>
    </tr>
  );
};

export default ParcelItem;
