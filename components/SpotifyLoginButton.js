import React from "react";
import { Button } from "@ui-kitten/components";
import { AuthContext } from "../contexts/AuthContext";
import { getTokens } from "../Auth";

export default function SpotifyLoginButton() {
  const { setAuth } = React.useContext(AuthContext);

  const loginToSpotify = async () => {
    console.log("test");
    console.log(await getTokens());
  };
  return <Button onPress={loginToSpotify}>Log in to Spotify</Button>;
}
