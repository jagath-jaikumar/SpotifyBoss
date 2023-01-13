import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { HistoryScreen } from "./screens/HistoryScreen";
import { CurrentSessionScreen } from "./screens/CurrentSessionScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { SessionContext } from "./contexts/SessionContext";
import { AuthContext } from "./contexts/AuthContext";
import { refreshTokens } from "./Auth";

const { Navigator, Screen, Group } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Session" />
    <BottomNavigationTab title="History" />
    <BottomNavigationTab title="Settings" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Group screenOptions={{ headerStyle: { backgroundColor: "#25DB51" } }}>
      <Screen name="Session" component={CurrentSessionScreen} />
      <Screen name="History" component={HistoryScreen} />
      <Screen name="Settings" component={SettingsScreen} />
    </Group>
  </Navigator>
);

export const AppNavigator = () => {
  const [session, setSession] = React.useState({});
  const [auth, setAuth] = React.useState({});

  React.useEffect(() => {
    refreshTokens();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      await refreshTokens();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NavigationContainer>
      <SessionContext.Provider value={{ session, setSession }}>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <TabNavigator />
        </AuthContext.Provider>
      </SessionContext.Provider>
    </NavigationContainer>
  );
};
