import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import AppNavigator from "./src/navigation/app-navigator";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
