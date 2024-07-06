import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IpInfo from "../screens/info/ipInfo";
import MarketData from "../screens/market-data/market-data";
import Profile from "../screens/profile/Profile";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={IpInfo} />
      <Tab.Screen name="Market Data" component={MarketData} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
