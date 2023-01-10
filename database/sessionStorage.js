import { getData, storeData } from "./asyncStorage";

const activeSession = "activeSession";

export const storeSession = async (session) => {
  storeData(activeSession, session);
};

export const getSession = async () => {
  return getData(activeSession);
};
