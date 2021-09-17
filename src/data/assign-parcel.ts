import client from "../utils/fetch-client";

const assignParcel = async (parcelId: number): Promise<[boolean, string]> => {
  return client(`biker/parcel`, { parcelId });
};

export default assignParcel;
