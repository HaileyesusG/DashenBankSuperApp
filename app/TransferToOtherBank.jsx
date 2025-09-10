import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
import { useState } from "react";
import { Dimensions, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

import Bank5Img from "../assets/images/AbyssiniaB.png";
import Bank1Img from "../assets/images/AmharaB.png";
import Bank6Img from "../assets/images/AwashB.png";
import Bank3Img from "../assets/images/CommercialB.png";
import Bank4Img from "../assets/images/DashenB.png";
import Bank2Img from "../assets/images/ZemenB.png";

// banks with imageKey (to pass through navigation)
const banks = [
  { id: "1", name: "Amhara Bank", imageKey: "AmharaB", image: Bank1Img },
  { id: "2", name: "Zemen Bank", imageKey: "ZemenB", image: Bank2Img },
  { id: "3", name: "Commercial Bank of Ethiopia", imageKey: "CommercialB", image: Bank3Img },
  { id: "4", name: "Dashen Bank", imageKey: "DashenB", image: Bank4Img },
  { id: "5", name: "Bank of Abyssinia", imageKey: "AbyssiniaB", image: Bank5Img },
  { id: "6", name: "Awash International Bank", imageKey: "AwashB", image: Bank6Img },
  { id: "7", name: "Commercial Bank of Ethiopia", imageKey: "CommercialB", image: Bank3Img },
  { id: "8", name: "Amhara Bank", imageKey: "AmharaB", image: Bank1Img },
  { id: "9", name: "Zemen Bank", imageKey: "ZemenB", image: Bank2Img },
  { id: "10", name: "Bank of Abyssinia", imageKey: "AbyssiniaB", image: Bank5Img },
  { id: "11", name: "Awash International Bank", imageKey: "AwashB", image: Bank6Img },
  { id: "12", name: "Dashen Bank", imageKey: "DashenB", image: Bank4Img },
];

const GAP = 15;
const NUM_COLUMNS = 3;

export default function TransferScreen() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = (SCREEN_WIDTH - 16 * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;
  const ITEM_HEIGHT = ITEM_WIDTH;
  const IMAGE_WIDTH = ITEM_WIDTH * 0.76;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.6;

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderBank = ({ item, index }) => {
    const isLastInRow = (index + 1) % NUM_COLUMNS === 0;

    return (
      <Pressable
        onPress={() =>
          router.push({
            pathname: "TransferToOtherBank2",
            params: {
              id: item.id,
              name: item.name,
              imageKey: item.imageKey, // pass string key instead of require()
            },
          })
        }
        style={{
          width: ITEM_WIDTH,
          marginRight: isLastInRow ? 0 : GAP,
          marginBottom: GAP,
        }}
      >
        <View
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderRadius: 15,
            backgroundColor: "white",
            elevation: 3,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Image
            source={item.image}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              resizeMode: "contain",
              marginBottom: 5,
            }}
          />
          <Text style={{ fontSize: 14, textAlign: "center" }}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 50 }}>
      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 25,
          paddingHorizontal: 12,
          height: 45,
          elevation: 2,
          marginBottom: 20,
        }}
      >
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search Bank"
          placeholderTextColor="gray"
          style={{ marginLeft: 8, flex: 1 }}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Section Title */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Select a bank</Text>

      {/* Bank Grid */}
      <FlatList
        data={filteredBanks}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        renderItem={renderBank}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
