import { View, Text, Image, FlatList } from "react-native";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  return (
    <>
      {images.length === 0 ? (
        <View>
          <Image
            source={require("@/assets/images/no-product-image.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Image
                source={{ uri: item }}
                style={{ width: 300, height: 300, marginHorizontal: 7, borderRadius: 5 }}
              />
            </View>
          )}
        />
      )}
    </>
  );
};

export default ProductImages;
