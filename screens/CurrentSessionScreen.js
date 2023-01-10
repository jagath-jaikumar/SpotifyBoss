import React from "react";
import { Layout, Text, Toggle } from "@ui-kitten/components";
import { SessionContext } from "../contexts/SessionContext";
import { DividerList } from "../components/DividerList";
import SpotifyLoginButton from "../components/SpotifyLoginButton";

const dummyPlaylistData = new Array(5).fill({
  title: "Playlist ~",
  description: "Description for Item",
});

const dummyQueueData = new Array(5).fill({
  title: "Queue ~",
  description: "Description for Item",
});

const SessionView = () => {
  const { session, setSession } = React.useContext(SessionContext);

  const [dontReuseSongs, setDontReuseSongs] = React.useState(true);
  const [playlists, setPlaylists] = React.useState(dummyPlaylistData);
  const [queue, setQueue] = React.useState(dummyQueueData);

  return (
    <>
      <Text>Spotify</Text>
      <SpotifyLoginButton />

      <Text>Queue</Text>
      <DividerList data={queue} />

      <Text>Linked Playlists</Text>
      <DividerList data={playlists} />

      <Text>Settings</Text>
      <Toggle
        checked={dontReuseSongs}
        onChange={(isChecked) => {
          setDontReuseSongs(isChecked);
        }}
      >
        {(evaProps) => <Text {...evaProps}>Don't re use songs</Text>}
      </Toggle>
    </>
  );
};

export const CurrentSessionScreen = () => (
  <>
    <Layout style={{ flex: 1 }}>
      <SessionView />
    </Layout>
  </>
);
