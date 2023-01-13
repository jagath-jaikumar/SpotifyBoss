import { getData } from "./AsyncKVStore";
import axios from "axios";

const baseurl = "https://api.spotify.com/v1/";

const makeGetRequest = async (endpoint) => {
  const config = {
    headers: {
      Authorization: "Bearer " + (await getData("accessToken")),
    },
  };
  return await axios.get(baseurl + endpoint, config).then((res) => res.data);
};

export const getPlaylists = async (options) => {
  const searchParams = new URLSearchParams(options);
  var x = await makeGetRequest("me/playlists" + searchParams);
  return x.items;
};

export const getRecentlyPlayed = async (options) => {
  var x = await makeGetRequest("me/playlists");
  return x.items;
};

export const getQueue = async () => {
  var x = await makeGetRequest("me/player/queue");
  console.log(x);
  return x.queue;
};
