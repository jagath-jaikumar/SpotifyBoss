import * as AuthSession from "expo-auth-session";
import { spotifyCredentials } from "./secrets";
import { encode as btoa } from "base-64";
import { storeData, getData } from "./AsyncKVStore";

const scopesArr = [
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-library-modify",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-recently-played",
  "user-top-read",
];
const scopes = scopesArr.join(" ");

export const getAuthorizationCode = async () => {
  try {
    console.log(AuthSession);
    const result = await AuthSession.startAsync({
      authUrl:
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        spotifyCredentials.clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(spotifyCredentials.redirectUri),
    });
    return result.params.code;
  } catch (err) {
    console.error(err);
  }
};

export const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode(); //we wrote this function above
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${spotifyCredentials.redirectUri}`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await storeData("accessToken", accessToken);
    await storeData("refreshToken", refreshToken);
    await storeData("expirationTime", expirationTime);
  } catch (err) {
    console.error(err);
  }
};

export const refreshTokens = async () => {
  try {
    const credsB64 = btoa(
      `${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`
    );
    const refreshToken = await getData("refreshToken");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await storeData("accessToken", newAccessToken);
      if (newRefreshToken) {
        await storeData("refreshToken", newRefreshToken);
      }
      await storeData("expirationTime", expirationTime);
    }
  } catch (err) {
    console.error(err);
  }
};
