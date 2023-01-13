import React from "react";
import { Layout, Text, Toggle, Card } from "@ui-kitten/components";
import { SessionContext } from "../contexts/SessionContext";
import { DividerList } from "../components/DividerList";
import * as Spotify from "../Spotify";

import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  bodyCard: {
    margin: 2,
    maxHeight: "40%",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

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

  React.useEffect(() => {
    (async () => {
      var playlists = await Spotify.getPlaylists();
      setPlaylists(() => playlists);

      var queue = await Spotify.getQueue();
      setQueue(() => queue);
    })();
  }, []);

  return (
    <>
      <Card style={styles.bodyCard} status="primary">
        <Text category="h3">Queue</Text>
        <Layout style={{ paddingBottom: "4%" }}></Layout>
        <DividerList data={queue} />
      </Card>
      <Layout style={{ paddingBottom: "2%" }}></Layout>

      <Card style={styles.bodyCard} status="primary">
        <Text category="h3">Linked Playlists</Text>
        <Layout style={{ paddingBottom: "4%" }}></Layout>
        <DividerList data={playlists} />
      </Card>

      <Layout style={{ paddingBottom: "2%" }}></Layout>

      <Card style={styles.settingsCard} status="info">
        <Text category="h3">Session Settings</Text>
        <Layout style={{ paddingBottom: "4%" }}></Layout>
        <Layout style={styles.container} level="1">
          <Toggle
            checked={dontReuseSongs}
            onChange={(isChecked) => {
              setDontReuseSongs(isChecked);
            }}
          >
            {(evaProps) => <Text {...evaProps}>Don't re use songs</Text>}
          </Toggle>
        </Layout>
      </Card>
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
