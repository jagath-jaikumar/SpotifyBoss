import React from "react";
import {
  Layout,
  Text,
  Toggle,
  Card,
  Button,
  Icon,
} from "@ui-kitten/components";
import { SessionContext } from "../contexts/SessionContext";
import { DividerList } from "../components/DividerList";
import * as Spotify from "../Spotify";
import { StyleSheet } from "react-native";

const RefreshIcon = (props) => <Icon {...props} name="refresh-outline" />;
const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

const QueueTable = () => {
  const [queue, setQueue] = React.useState([]);

  const updateQueue = async () => {
    var queue = await Spotify.getQueue();
    setQueue(() => queue);
  };

  React.useEffect(() => {
    (async () => {
      await updateQueue();
    })();
  }, []);

  return (
    <Card style={styles.bodyCard} status="primary">
      <Layout style={styles.buttonBar}>
        <Text category="h3">Queue</Text>
        <Layout style={styles.spacer} />
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={RefreshIcon}
          onPress={updateQueue}
        />
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={PlusIcon}
        />
      </Layout>
      <Layout style={{ paddingBottom: "4%" }}></Layout>
      <DividerList data={queue} />
    </Card>
  );
};

const PlaylistTable = () => {
  const [playlists, setPlaylists] = React.useState([]);

  return (
    <Card style={styles.bodyCard} status="primary">
      <Layout style={styles.buttonBar}>
        <Text category="h3">Linked Playlists</Text>
        <Layout style={styles.spacer} />
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={PlusIcon}
        />
      </Layout>
      <Layout style={{ paddingBottom: "4%" }}></Layout>
      <DividerList data={playlists} />
    </Card>
  );
};

const SettingsTable = () => {
  const [dontReuseSongs, setDontReuseSongs] = React.useState(true);

  return (
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
  );
};

export const CurrentSessionScreen = () => {
  return (
    <>
      <Layout style={{ flex: 1 }}>
        <QueueTable />
        <Layout style={{ paddingBottom: "2%" }}></Layout>
        <PlaylistTable />
        <Layout style={{ paddingBottom: "2%" }}></Layout>
        <SettingsTable />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  bodyCard: {
    margin: 2,
    maxHeight: "40%",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacer: {
    flex: 1,
  },
});
