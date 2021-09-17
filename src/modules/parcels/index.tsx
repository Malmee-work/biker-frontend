import { Link, RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import getParcels from "../../data/get-parcels";
import { ParcelType } from "../../data/parcel-type";
import { useInterval } from "../../hooks/useInterval";
import ParcelItem from "./parcel-item";

// Parcels component shows all the available parcels for the biker
const Parcels: React.FunctionComponent<RouteComponentProps> = () => {
  const delay = 10000;
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [parcels, setParcels] = useState<Array<ParcelType>>();

  const fetchParcels = async (): Promise<void> => {
    const allParcels = await getParcels();
    setParcels(allParcels);
  };

  useEffect(() => {
    fetchParcels();
  }, [refreshList]);

  useInterval(() => {
    fetchParcels();
  }, delay);

  return (
    <div>
      <div className="parcel-button">
        <Button variant="secondary">
          <Link className="parcel-link" to="/">
            View selected parcels
          </Link>
        </Button>
      </div>
      <div className="parcel">
        <p className="title">Available Parcels</p>
        <div>
          {parcels ? (
            <Table responsive variant="dark">
              <thead>
                <tr>
                  <th>Pick-up address</th>
                  <th>Drop-off address</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <ParcelItem
                    key={parcel.id}
                    parcel={parcel}
                    handleSelect={(): void => setRefreshList(!refreshList)}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No available parcels</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parcels;
