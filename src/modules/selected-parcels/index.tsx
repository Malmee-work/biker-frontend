import { Link, RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import getSelectedParcels from "../../data/get-selected-parcels";
import { ParcelType } from "../../data/parcel-type";
import ParcelItem from "./parcel-item";

// SelectedParcels component shows all the parcels selected by the biker for delivery
const SelectedParcels: React.FunctionComponent<RouteComponentProps> = () => {
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [selectedParcels, setSelectedParcels] = useState<Array<ParcelType>>();

  const fetchParcels = async (): Promise<void> => {
    const allParcels = await getSelectedParcels();
    setSelectedParcels(allParcels);
  };

  useEffect(() => {
    fetchParcels();
  }, [refreshList]);

  return (
    <div>
      <div className="parcel-button">
        <Button variant="secondary">
          <Link className="parcel-link" to="all">
            View available parcels
          </Link>
        </Button>
      </div>
      <div className="parcel">
        <p className="title">Selected Parcels</p>
        <div>
          {selectedParcels ? (
            <Table responsive variant="dark">
              <thead>
                <tr>
                  <th>Pick-up address</th>
                  <th>Drop-off address</th>
                  <th>Pick-up time</th>
                  <th>Drop-off time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedParcels.map((parcel) => (
                  <ParcelItem
                    key={parcel.id}
                    parcel={parcel}
                    onEdit={(): void => setRefreshList(!refreshList)}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>You have not selected any parcels</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedParcels;
