import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { styles } from "./styles";

const images = [
  "https://picsum.photos/id/1/400/300",
  "https://picsum.photos/id/2/400/300",
  "https://picsum.photos/id/3/400/300",
];

export default function Dashboard({ navigation }) {
  const [ipData, setIpData] = useState(null);
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetchIpData();
  }, []);

  const fetchIpData = async (ipAddress = "") => {
    try {
      const response = await axios.get(`https://ipwho.is/${ipAddress}`);
      setIpData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePress = (index: number) => {
    navigation.navigate("Profile", { image: images[index], ipData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IP Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for any IP address"
        value={ip}
        onChangeText={setIp}
      />
      <Button title="Search" onPress={() => fetchIpData(ip)} />
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
      <Carousel
        data={images}
        renderItem={({ item }) => <Image source={item} style={styles.image} />}
        sliderWidth={300}
        itemWidth={300}
        onSnapToItem={handleImagePress}
      />
    </View>
  );
}
