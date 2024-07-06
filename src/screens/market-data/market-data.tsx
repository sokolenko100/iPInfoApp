import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles } from "./styles";

const message = {
  method: "SUBSCRIBE",
  params: ["btcusdt@aggTrade"],
  id: 1,
};

const MarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:443/ws/btcusdt@aggTrade"
    );

    socket.onopen = () => {
      socket.send(JSON.stringify(message));
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketData((prevData) => {
        const newData = [...prevData, parseFloat(data.p)];
        if (newData.length > 20) newData.shift();
        setChartData({
          labels: newData.map((_, index) => index.toString()),
          datasets: [{ data: newData }],
        });
        return newData;
      });
    };

    return () => {
      socket.close();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Market Data</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <ScrollView style={styles.dataList}>
        {marketData.map((data, index) => (
          <Text key={index}>BTCUSDT | {data}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default MarketData;
