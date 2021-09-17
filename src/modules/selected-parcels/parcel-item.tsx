import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ParcelStatusMap, ParcelType } from "../../data/parcel-type";
import updateParcel from "../../data/update-parcel";
import DatePicker from "../date-picker";

interface Props {
  parcel: ParcelType;
  onEdit: () => void;
}

const ParcelItem: React.FunctionComponent<Props> = ({ parcel, onEdit }) => {
  const [showPickupTimeModal, setShowPickupTimeModal] = useState<boolean>(false);
  const [showDropoffTimeModal, setShowDropoffTimeModal] = useState<boolean>(false);

  const saveParcel = async (args: {
    pickupTime?: string;
    dropoffTime?: string;
  }): Promise<void> => {
    if (parcel.id) {
      await updateParcel(parcel.id, args);
      onEdit();
    }
  };

  const handlePickupSave = async (date: string): Promise<void> => {
    await saveParcel({ pickupTime: date });
    setShowPickupTimeModal(false);
  };

  const handleDropoffSave = async (date: string): Promise<void> => {
    await saveParcel({ dropoffTime: date });
    setShowDropoffTimeModal(false);
  };

  return (
    <>
      {showPickupTimeModal && (
        <DatePicker
          title="Select pick-up date time"
          handleClose={(): void => setShowPickupTimeModal(false)}
          handleSave={handlePickupSave}
        />
      )}
      {showDropoffTimeModal && (
        <DatePicker
          title="Select drop-off date time"
          handleClose={(): void => setShowDropoffTimeModal(false)}
          handleSave={handleDropoffSave}
          afterTimeStamp={parcel.pickupTime}
        />
      )}
      <tr>
        <td>{parcel.pickupAddress}</td>
        <td>{parcel.dropoffAddress}</td>
        <td>
          {parcel.pickupTime ? (
            parcel.pickupTime
          ) : (
            <Button
              className="action-button"
              variant="secondary"
              onClick={() => setShowPickupTimeModal(true)}
            >
              Set pick-up time
            </Button>
          )}
        </td>
        <td>
          {parcel.dropoffTime ? (
            parcel.dropoffTime
          ) : (
            <Button
              className="action-button"
              disabled={!parcel.pickupTime}
              variant="secondary"
              onClick={() => setShowDropoffTimeModal(true)}
            >
              Set drop-off time
            </Button>
          )}
        </td>
        <td>{parcel.status && ParcelStatusMap.get(parcel.status)}</td>
      </tr>
    </>
  );
};

export default ParcelItem;
