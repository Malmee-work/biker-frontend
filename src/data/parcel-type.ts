export type ParcelType = {
  id?: number;
  senderId?: number;
  pickupAddress?: string;
  dropoffAddress?: string;
  status?: ParcelStatus;
  bikerId?: number;
  pickupTime?: string;
  dropoffTime?: string;
};

export const ParcelStatusMap = new Map([
  ["AVAILABLE", "Available"],
  ["TAKEN", "Taken"],
  ["TAKEN_BY_YOU", "Taken by you"],
  ["TO_BE_DELIVERED", "To be delivered"],
  ["DELIVERING", "Delivering"],
  ["DELIVERED", "Delivered"],
]);

export type ParcelStatus =
  | "AVAILABLE"
  | "TAKEN"
  | "TAKEN_BY_YOU"
  | "TO_BE_DELIVERED"
  | "DELIVERING"
  | "DELIVERED";
