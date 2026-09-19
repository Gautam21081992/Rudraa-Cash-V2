import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.logo}>RUDRAA CASH</Text>
        <Text style={styles.subtitle}>Retailer App</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome to Rudraa Cash</Text>
        <Text style={styles.description}>
          Your retailer business dashboard
        </Text>

        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balance}>₹0.00</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Money Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Settlement</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Rudraa Cash</Text>
        <Text style={styles.infoText}>
          Empowering India, Empowering Retailers
        </Text>
        <Text style={styles.fee}>Platform / Settlement Fee: 0.50%</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0077B6",
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#555555",
  },
  card: {
    backgroundColor: "#F4FAFD",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D9EEF7",
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#073B4C",
  },
  description: {
    marginTop: 7,
    color: "#607D8B",
  },
  balanceBox: {
    marginTop: 25,
    backgroundColor: "#0077B6",
    borderRadius: 16,
    padding: 20,
  },
  balanceLabel: {
    color: "#FFFFFF",
    opacity: 0.9,
  },
  balance: {
    marginTop: 8,
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0077B6",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  actionText: {
    color: "#0077B6",
    fontWeight: "700",
    fontSize: 13,
  },
  info: {
    marginTop: 35,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0077B6",
  },
  infoText: {
    marginTop: 6,
    color: "#555555",
    textAlign: "center",
  },
  fee: {
    marginTop: 12,
    color: "#073B4C",
    fontWeight: "600",
  },
});
