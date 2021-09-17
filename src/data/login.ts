import client from "../utils/fetch-client";

const login = async (credentials: {
  username: string;
  hashedPassword: string;
}): Promise<any> => {
  return client("biker/login", credentials);
};

export default login;
