import React from "react";
import Login from "./login";
import useToken from "../hooks/useToken";
import SelectedParcels from "./selected-parcels";
import { Router } from "@reach/router";
import Parcels from "./parcels";
import { Button } from "react-bootstrap";

const Dashboard: React.FunctionComponent = () => {
  const { token, setToken } = useToken();

  const onLogoutSubmit = (): void => {
    localStorage.clear();
    window.location.reload();
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      <div className="logout">
        <Button variant="secondary" onClick={onLogoutSubmit}>
          Logout
        </Button>
      </div>
      <Router primary={false}>
        <SelectedParcels path="/" />
        <Parcels path="all" />
      </Router>
    </>
  );
};

export default Dashboard;
