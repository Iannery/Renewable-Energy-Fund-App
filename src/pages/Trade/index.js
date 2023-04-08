import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MockGraph } from "../../assets";
import { Image } from "react-native";
import { FlatList } from "react-native";

const mockInfo = [
  {
    title: "AUM",
    value: "$1,000,000",
  },
  {
    title: "Issue Date",
    value: "01/01/2023",
  },
  {
    title: "Vintage Range",
    value: "3-5 Years",
  },
  {
    title: "TER",
    value: "0.15%",
  },
  {
    title: "Price at Close",
    value: "$120.50",
  },
  {
    title: "Price at Open",
    value: "$116.41",
  },
];

const mockCompanies = [
  {
    id: "1",
    name: "Company 1",
    logo: require("../../assets/images/C1Logo.png"),
    image: require("../../assets/images/C1Image.png"),
    description:
      "Aspira is building a modular, direct air capture system with the energy supply integrated into the modules.",
  },
  {
    id: "2",
    name: "Company 2",
    logo: require("../../assets/images/C2Logo.png"),
    image: require("../../assets/images/C2Image.png"),
    description:
      "uses renewable geothermal energy and waste heat to capture CO₂ directly from the air.",
  },
  {
    id: "3",
    name: "Company 3",
    logo: require("../../assets/images/C3Logo.png"),
    image: require("../../assets/images/C3Image.png"),
    description:
      "Sustaera uses ceramic monolith air contactors to capture CO₂ directly from the air.",
  },
  {
    id: "4",
    name: "Company 4",
    logo: require("../../assets/images/C4Logo.png"),
    image: require("../../assets/images/C4Image.png"),
    description:
      "The project consists of 30 Wind Turbine Generators (WTGs) of 3.0 MW capacities each.",
  },
];

const FundBreakdown = () => {
  const [selectedOption, setSelectedOption] = useState("Highlighted");

  const renderCompanyCard = ({ item }) => (
    <View style={styles.companyCard}>
      <Image source={item.image} style={styles.companyImage} />
      <View style={styles.companyContent}>
        <Image source={item.logo} style={styles.companyLogo} />
        <Text style={styles.companyDescription}>{item.description}</Text>
        <Text style={styles.readMoreLink}>Read more</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.fundBreakdownContainer}>
      <Text style={styles.title}>Fund Breakdown</Text>
      <View style={styles.optionsRow}>
        {["Highlighted", "Value", "Vintage", "Registry"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedOption(option)}
            style={[
              styles.option,
              selectedOption === option && styles.optionSelected,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={mockCompanies}
        renderItem={renderCompanyCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: -20,
          paddingLeft: 20,
        }}
        contentContainerStyle={{
          gap: 20,
          marginRight: 20,
          paddingRight: 40,
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default function Trade({ route }) {
  const { price, percentageChange } = route.params
    ? route.params
    : {
        price: 120.5,
        percentageChange: 3.51,
      };
  const navigation = useNavigation();
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d");

  const handleTimeframePress = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const calculatePreviousPrice = (price, percentageChange) => {
    return (price / (1 + percentageChange / 100)).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <View paddingHorizontal={20}>
        <View style={styles.priceYearContainer}>
          <Text style={styles.price}>{`$${price.toFixed(2)}`}</Text>
          <Text style={styles.year}>2023</Text>
        </View>
        <View
          flexDirection={"row"}
          alignItems={"baseline"}
          marginBottom={20}
          gap={4}
        >
          <MaterialCommunityIcons
            name={
              percentageChange > 0 ? "arrow-top-right" : "arrow-bottom-right"
            }
            size={16}
            color={percentageChange > 0 ? "#0FDF8F" : "#EE8688"}
          />
          <Text style={styles.percentageChange(percentageChange > 0)}>
            {`${percentageChange.toFixed(2)}% ($${calculatePreviousPrice(
              price,
              percentageChange
            )})`}
          </Text>
        </View>
        <MockGraph color={percentageChange > 0 ? "#0FDF8F" : "#EE8688"} />
      </View>

      <View style={styles.timeframeContainer}>
        {["1h", "1d", "1w", "1m", "1y", "All"].map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            style={[
              styles.timeframeButton,
              selectedTimeframe === timeframe && styles.selectedTimeframe,
            ]}
            onPress={() => handleTimeframePress(timeframe)}
          >
            <Text style={styles.timeframeText(selectedTimeframe === timeframe)}>
              {timeframe}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoStatsContainer}>
        <Text style={styles.title}>Info & Stats</Text>
        <View style={styles.infoStatsRow}>
          <View style={styles.infoStatsColumn}>
            {mockInfo.map((info, index) => (
              <View key={index} flexDirection={"column"} width={"50%"}>
                <Text style={styles.infoStatsLabel}>{info.title}</Text>
                <Text style={styles.infoStatsValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <FundBreakdown />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  priceYearContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontFamily: "Sora_600SemiBold",
  },
  year: {
    fontSize: 24,
    fontFamily: "Sora_600SemiBold",
  },
  percentageChange: (isPositive) => ({
    fontSize: 18,
    color: isPositive ? "#0FDF8F" : "#EE8688",
    marginBottom: 20,
  }),
  timeframeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  timeframeButton: {
    padding: 8,
  },
  selectedTimeframe: {
    borderRadius: 4,
    backgroundColor: "#F7EFFF",
  },
  timeframeText: (selected) => ({
    fontSize: 16,
    fontFamily: "Sora_500Medium",
    color: selected ? "#770FDF" : "#A0A0A0",
  }),
  infoStatsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Sora_600SemiBold",
    marginBottom: 16,
  },
  infoStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoStatsColumn: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoStatsLabel: {
    fontSize: 14,
    fontFamily: "Sora_400Regular",
    color: "#A0A0A0",
    marginBottom: 5,
  },
  infoStatsValue: {
    fontSize: 16,
    fontFamily: "Sora_400Regular",
    marginBottom: 15,
  },
  fundBreakdownContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  optionsRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  option: {
    paddingVertical: 8,
  },
  optionSelected: {
    borderBottomColor: "#770FDF",
    borderBottomWidth: 2,
  },
  optionText: {
    color: "#A0A0A0",
    fontFamily: "Sora_600SemiBold",
  },
  optionTextSelected: {
    color: "#000000",
    fontFamily: "Sora_600SemiBold",
  },
  companyCard: {
    width: 200,
    borderRadius: 4,
  },
  companyImage: {
    width: "100%",
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
    resizeMode: "cover",
  },
  companyContent: {
    borderColor: "#E6E6E6",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  companyLogo: {
    width: 70,
    height: 20,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 10,
  },
  companyDescription: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: "Sora_400Regular",
    color: "#000",
  },
  readMoreLink: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: "Sora_400Regular",
    color: "#000",
    textDecorationLine: "underline",
  },
});
