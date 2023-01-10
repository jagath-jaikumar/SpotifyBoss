import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { HomeScreen } from "./screens/HomeScreen";
import { CurrentSessionScreen } from "./screens/CurrentSessionScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { SessionContext } from "./contexts/SessionContext";
import { getSession } from "./database/sessionStorage";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Current Session" />
    <BottomNavigationTab title="Settings" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Current Session" component={CurrentSessionScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
);

export const AppNavigator = () => {
  const [session, setSession] = React.useState(getSession());

  return (
    <NavigationContainer>
      <SessionContext.Provider value={{ session, setSession }}>
        <TabNavigator />
      </SessionContext.Provider>
    </NavigationContainer>
  );
};
