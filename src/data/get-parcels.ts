import client from "../utils/fetch-client";
import { ParcelType } from "./parcel-type";

const getParcels = async (): Promise<Array<ParcelType>> => {
  return client("parcels");
};

export default getParcels;
