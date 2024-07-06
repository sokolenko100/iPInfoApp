import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import ImageSliderComponent from "../../components/image-slider";
import { styles } from "./styles";

const IpInfo = ({ navigation }) => {
  const [ipInfo, setIpInfo] = useState(null);
  const [manualIp, setManualIp] = useState("");

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get("https://ipwho.is/");
        setIpInfo(response.data);
      } catch (error) {
        console.error("Error fetching IP info:", error);
      }
    };

    fetchIpInfo();
  }, []);

  const fetchManualIpInfo = async () => {
    try {
      const response = await axios.get(`https://ipwho.is/${manualIp}`);
      setIpInfo(response.data);
    } catch (error) {
      console.error("Error fetching manual IP info:", error);
    }
  };

  const images = [
    "https://picsum.photos/id/1/400/300",
    "https://picsum.photos/id/2/400/300",
    "https://picsum.photos/id/3/400/300",
  ];

  const handleImagePress = (index) => {
    navigation.navigate("Profile", { ipInfo, image: images[index] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IP Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for any IP address"
        onChangeText={(text) => setManualIp(text)}
        value={manualIp}
      />
      <Button title="Fetch IP Info" onPress={fetchManualIpInfo} />
      {ipInfo && (
        <View style={styles.infoContainer}>
          <Text>IP Address: {ipInfo.ip}</Text>
          <Text>
            Location: {ipInfo.city}, {ipInfo.region}, {ipInfo.country}
          </Text>
          <Text>Timezone: {ipInfo.timezone}</Text>
          <Text>ISP: {ipInfo.isp}</Text>
        </View>
      )}
      <ImageSliderComponent images={images} onImagePress={handleImagePress} />
    </View>
  );
};

export default IpInfo;
