import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { HistoryScreen } from "./screens/HistoryScreen";
import { CurrentSessionScreen } from "./screens/CurrentSessionScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { SessionContext } from "./contexts/SessionContext";
import { AuthContext } from "./contexts/AuthContext";

const { Navigator, Screen } = createBottomTabNavigator();

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
    <Screen name="Session" component={CurrentSessionScreen} />
    <Screen name="History" component={HistoryScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
);

export const AppNavigator = () => {
  const [session, setSession] = React.useState({});
  const [auth, setAuth] = React.useState({});

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
