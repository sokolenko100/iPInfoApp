import { Text, View } from "react-native";
import ImageSlider from "react-native-image-slider-box";
import { styles } from "./styles";

const ImageSelection = ({ navigation, route }) => {
  const { ipInfo, images } = route.params;

  const handleImagePress = (index) => {
    const selectedImage = images[index];
    navigation.navigate("Profile", { ipInfo, selectedImage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select an Image</Text>
      <ImageSlider
        style={styles.container}
        images={images}
        onCurrentImagePressed={handleImagePress}
      />
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
    </View>
  );
};

export default ImageSelection;
