import client from "../utils/fetch-client";
import { ParcelType } from "./parcel-type";

const getSelectedParcels = async (): Promise<Array<ParcelType>> => {
  return client("biker/parcels");
};

export default getSelectedParcels;
