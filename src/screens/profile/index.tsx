import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export default function Profile({ route }) {
  const { image, ipData } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      {ipData && (
        <View style={styles.info}>
          <Text>IP Address: {ipData.ip}</Text>
          <Text>
            Location: {ipData.city}, {ipData.country}
          </Text>
          <Text>Timezone: {ipData.timezone}</Text>
          <Text>ISP: {ipData.connection.isp}</Text>
        </View>
      )}
    </View>
  );
}
