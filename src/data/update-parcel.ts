import client from "../utils/fetch-client";

const updateParcel = async (
  parcelId: number,
  args: { pickupTime?: string; dropoffTime?: string }
): Promise<[boolean, string]> => {
  return client(`biker/parcel/${parcelId}`, args);
};

export default updateParcel;
