import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const Profile = ({ route }) => {
  const { ipInfo, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text>IP Address: {ipInfo.ip}</Text>
        <Text>
          Location: {ipInfo.city}, {ipInfo.region}, {ipInfo.country}
        </Text>
        <Text>Timezone: {ipInfo.timezone}</Text>
        <Text>ISP: {ipInfo.isp}</Text>
      </View>
    </View>
  );
};

export default Profile;
