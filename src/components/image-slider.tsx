import { SliderBox } from "react-native-image-slider-box";

const ImageSlider = ({ images, onImagePress }) => {
  return (
    <SliderBox
      circleLoop
      sliderBoxHeight={200}
      images={images}
      onCurrentImagePressed={onImagePress}
    />
  );
};

export default ImageSlider;
