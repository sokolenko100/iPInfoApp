import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import socketIOClient from "socket.io-client";
import { styles } from "./styles";

export default function MarketDataScreen() {
  const [marketData, setMarketData] = useState([]);

  useEffect((): any => {
    const socket = socketIOClient("wss://stream.binance.com:443/ws/btcusdt");
    socket.on("connect", () => {
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["btcusdt@aggTrade"],
          id: 1,
        })
      );
    });
    socket.on("message", (data) => {
      const trade = JSON.parse(data);
      setMarketData((prevData) => [...prevData, trade.p]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Market Data</Text>
      {marketData.length > 0 && (
        <LineChart
          data={{
            labels: marketData.map((_, index) => index.toString()),
            datasets: [{ data: marketData }],
          }}
          width={300}
          height={200}
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
          style={styles.chart}
        />
      )}
    </View>
  );
}
