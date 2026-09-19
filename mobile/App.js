import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

const BLUE = "#0077B6";
const DARK = "#073B4C";
const LIGHT = "#F4FAFD";
const BORDER = "#D9EEF7";
const MUTED = "#607D8B";

export default function App() {
  const [screen, setScreen] = useState("home");

  const navigation = [
    { key: "home", icon: "⌂", label: "Home" },
    { key: "transactions", icon: "↕", label: "Transactions" },
    { key: "settlement", icon: "₹", label: "Settlement" },
    { key: "profile", icon: "●", label: "Profile" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "transactions" && <TransactionsScreen />}
      {screen === "settlement" && <SettlementScreen />}
      {screen === "profile" && <ProfileScreen setScreen={setScreen} />}
      {screen === "transfer" && <TransferScreen setScreen={setScreen} />}
      {screen === "notifications" && <NotificationsScreen />}
      {screen === "support" && <SupportScreen />}
      {screen === "about" && <AboutScreen />}

      {["home", "transactions", "settlement", "profile"].includes(screen) && (
        <View style={styles.bottomNav}>
          {navigation.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.navItem}
              onPress={() => setScreen(item.key)}
            >
              <Text
                style={[
                  styles.navIcon,
                  screen === item.key && styles.navActive,
                ]}
              >
                {item.icon}
              </Text>
              <Text
                style={[
                  styles.navLabel,
                  screen === item.key && styles.navActiveText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

/* ---------------- HOME ---------------- */

function HomeScreen({ setScreen }) {
  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.smallText}>Welcome back</Text>
          <Text style={styles.brand}>RUDRAA CASH</Text>
          <Text style={styles.retailerText}>Retailer Dashboard</Text>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setScreen("notifications")}
        >
          <Text style={styles.notificationIcon}>♢</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={styles.infinityCircle}>
          <Text style={styles.infinity}>∞</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>Rudraa Cash</Text>
          <Text style={styles.heroSubtitle}>
            Empowering India, Empowering Retailers
          </Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceTop}>
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>ACTIVE</Text>
          </View>
        </View>

        <Text style={styles.balance}>₹0.00</Text>

        <View style={styles.balanceFooter}>
          <Text style={styles.balanceInfo}>Retailer Wallet</Text>
          <Text style={styles.balanceInfo}>•••• 0000</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionGrid}>
        <ActionCard
          icon="↗"
          title="Money Transfer"
          subtitle="Send money"
          onPress={() => setScreen("transfer")}
        />

        <ActionCard
          icon="₹"
          title="Settlement"
          subtitle="Settle balance"
          onPress={() => setScreen("settlement")}
        />

        <ActionCard
          icon="↕"
          title="Transactions"
          subtitle="View history"
          onPress={() => setScreen("transactions")}
        />

        <ActionCard
          icon="?"
          title="Support"
          subtitle="Get assistance"
          onPress={() => setScreen("support")}
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard title="Today" value="₹0.00" subtitle="Transactions" />
        <StatCard title="Pending" value="0" subtitle="Requests" />
      </View>

      <View style={styles.recentHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => setScreen("transactions")}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <Text style={styles.emptyIconText}>↕</Text>
        </View>
        <Text style={styles.emptyTitle}>No transactions yet</Text>
        <Text style={styles.emptyText}>
          Your recent transactions will appear here.
        </Text>
      </View>

      <View style={styles.feeBanner}>
        <Text style={styles.feeBannerTitle}>Platform / Settlement Fee</Text>
        <Text style={styles.feeValue}>0.50%</Text>
        <Text style={styles.feeNote}>Applicable as per service terms</Text>
      </View>

      <Text style={styles.version}>Rudraa Cash • Retailer App v1.0.0</Text>
    </ScrollView>
  );
}

/* ---------------- ACTION CARD ---------------- */

function ActionCard({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );
}

/* ---------------- TRANSFER ---------------- */

function TransferScreen({ setScreen }) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
      showsVerticalScrollIndicator={false}
    >
      <Header title="Money Transfer" setScreen={setScreen} />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Transfer Money</Text>
        <Text style={styles.formSubtitle}>
          Enter beneficiary details to continue
        </Text>

        <Text style={styles.inputLabel}>Beneficiary Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#9AAAB2"
        />

        <Text style={styles.inputLabel}>Account / UPI ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account or UPI ID"
          placeholderTextColor="#9AAAB2"
        />

        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="₹ Enter amount"
          placeholderTextColor="#9AAAB2"
          keyboardType="numeric"
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Transaction Preview</Text>
          <Text style={styles.infoBoxText}>
            Actual transfer functionality will be connected after API and
            payment/banking integration.
          </Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ---------------- TRANSACTIONS ---------------- */

function TransactionsScreen() {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>Transactions</Text>
      <Text style={styles.pageSubtitle}>Track your retailer activity</Text>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterActive}>
          <Text style={styles.filterActiveText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>Success</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filter}>
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emptyCardLarge}>
        <View style={styles.largeEmptyIcon}>
          <Text style={styles.emptyIconText}>↕</Text>
        </View>
        <Text style={styles.emptyTitle}>No transactions found</Text>
        <Text style={styles.emptyText}>
          Your completed and pending transactions will be displayed here.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- SETTLEMENT ---------------- */

function SettlementScreen({}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>Settlement</Text>
      <Text style={styles.pageSubtitle}>Manage your settlement requests</Text>

      <View style={styles.settlementCard}>
        <Text style={styles.balanceLabel}>SETTLEMENT BALANCE</Text>
        <Text style={styles.settlementAmount}>₹0.00</Text>
        <Text style={styles.settlementNote}>
          Available amount for settlement
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Settlement Account</Text>

        <View style={styles.bankRow}>
          <View style={styles.bankIcon}>
            <Text style={styles.bankIconText}>₹</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bankTitle}>Bank account not added</Text>
            <Text style={styles.bankSubtitle}>
              Add your verified bank account
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Request Settlement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Platform / Settlement Fee</Text>
        <Text style={styles.infoBoxText}>
          0.50% — applicable according to the applicable service terms.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- PROFILE ---------------- */

function ProfileScreen({ setScreen }) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>Profile</Text>

      <View style={styles.profileHeader}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>R</Text>
        </View>
        <View>
          <Text style={styles.profileName}>Retailer</Text>
          <Text style={styles.profileStatus}>● Account Active</Text>
        </View>
      </View>

      <ProfileMenu title="KYC & Business Details" icon="✓" />
      <ProfileMenu title="Bank Account" icon="₹" />
      <ProfileMenu title="Notifications" icon="♢" onPress={() => setScreen("notifications")} />
      <ProfileMenu title="Customer Support" icon="?" onPress={() => setScreen("support")} />
      <ProfileMenu title="About Rudraa Cash" icon="i" onPress={() => setScreen("about")} />
    </ScrollView>
  );
}

function ProfileMenu({ title, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.profileMenu} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Text style={styles.menuIconText}>{icon}</Text>
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

/* ---------------- NOTIFICATIONS ---------------- */

function NotificationsScreen({}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>Notifications</Text>

      <View style={styles.emptyCardLarge}>
        <View style={styles.largeEmptyIcon}>
          <Text style={styles.emptyIconText}>♢</Text>
        </View>
        <Text style={styles.emptyTitle}>No new notifications</Text>
        <Text style={styles.emptyText}>
          Transaction and settlement updates will appear here.
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- SUPPORT ---------------- */

function SupportScreen({}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>Support</Text>
      <Text style={styles.pageSubtitle}>We are here to help</Text>

      <View style={styles.supportCard}>
        <Text style={styles.supportIcon}>?</Text>
        <Text style={styles.supportTitle}>Customer Support</Text>
        <Text style={styles.supportText}>
          Contact details and support ticket functionality can be connected
          here with the Rudraa Cash backend.
        </Text>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Create Support Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.supportCardSmall}>
        <Text style={styles.supportSmallTitle}>Frequently Asked Questions</Text>
        <Text style={styles.supportSmallText}>
          Account • KYC • Transactions • Settlement • Payments
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- ABOUT ---------------- */

function AboutScreen({}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.innerPage}
    >
      <Text style={styles.pageBrand}>RUDRAA CASH</Text>
      <Text style={styles.pageTitle}>About Us</Text>

      <View style={styles.aboutCard}>
        <View style={styles.infinityLarge}>
          <Text style={styles.infinityLargeText}>∞</Text>
        </View>

        <Text style={styles.aboutTitle}>Rudraa Cash</Text>
        <Text style={styles.aboutTagline}>
          Empowering India, Empowering Retailers
        </Text>

        <Text style={styles.aboutHeading}>Vision</Text>
        <Text style={styles.aboutText}>
          To empower retailers with accessible, reliable and technology-driven
          financial services.
        </Text>

        <Text style={styles.aboutHeading}>Mission</Text>
        <Text style={styles.aboutText}>
          To build a trusted digital ecosystem that helps retailers manage
          financial services with simplicity, transparency and efficiency.
        </Text>
      </View>

      <Text style={styles.version}>Rudraa Cash • Version 1.0.0</Text>
    </ScrollView>
  );
}

/* ---------------- HEADER ---------------- */

function Header({ title, setScreen }) {
  return (
    <View style={styles.innerHeader}>
      <TouchableOpacity onPress={() => setScreen("home")}>
        <Text style={styles.backButton}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.innerHeaderTitle}>{title}</Text>

      <View style={{ width: 30 }} />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },

  innerPage: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 100,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallText: {
    fontSize: 13,
    color: MUTED,
  },

  brand: {
    marginTop: 3,
    fontSize: 25,
    fontWeight: "900",
    color: BLUE,
    letterSpacing: 1.2,
  },

  retailerText: {
    marginTop: 2,
    color: MUTED,
    fontSize: 13,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  notificationIcon: {
    color: DARK,
    fontSize: 25,
  },

  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: BLUE,
  },

  hero: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT,
    borderRadius: 22,
    padding: 17,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },

  infinityCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  infinity: {
    color: "#FFFFFF",
    fontSize: 39,
    fontWeight: "300",
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK,
  },

  heroSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: MUTED,
  },

  balanceCard: {
    backgroundColor: BLUE,
    borderRadius: 24,
    padding: 22,
    marginBottom: 25,
  },

  balanceTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    opacity: 0.9,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
  },

  liveText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  balance: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 12,
  },

  balanceFooter: {
    marginTop: 22,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  balanceInfo: {
    color: "#FFFFFF",
    opacity: 0.8,
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 2,
    shadowOpacity: 0.04,
    shadowRadius: 5,
  },

  actionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  actionIconText: {
    color: BLUE,
    fontSize: 22,
    fontWeight: "800",
  },

  actionTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  actionSubtitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  statCard: {
    width: "48%",
    backgroundColor: LIGHT,
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  statTitle: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "700",
  },

  statValue: {
    color: DARK,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 7,
  },

  statSubtitle: {
    color: MUTED,
    fontSize: 10,
    marginTop: 3,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },

  viewAll: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "800",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  emptyCardLarge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 35,
    marginTop: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  emptyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  largeEmptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIconText: {
    color: BLUE,
    fontSize: 27,
    fontWeight: "800",
  },

  emptyTitle: {
    marginTop: 12,
    color: DARK,
    fontSize: 15,
    fontWeight: "800",
  },

  emptyText: {
    marginTop: 6,
    color: MUTED,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 17,
  },

  feeBanner: {
    marginTop: 18,
    backgroundColor: DARK,
    borderRadius: 18,
    padding: 18,
  },

  feeBannerTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  feeValue: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  feeNote: {
    color: "#FFFFFF",
    opacity: 0.65,
    fontSize: 10,
    marginTop: 3,
  },

  version: {
    textAlign: "center",
    color: "#9AAAB2",
    fontSize: 10,
    marginTop: 22,
  },

  bottomNav: {
    height: 76,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E7F1F5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
  },

  navIcon: {
    color: "#8BA0AA",
    fontSize: 22,
    fontWeight: "700",
  },

  navLabel: {
    color: "#8BA0AA",
    fontSize: 10,
    marginTop: 3,
    fontWeight: "600",
  },

  navActive: {
    color: BLUE,
  },

  navActiveText: {
    color: BLUE,
  },

  pageBrand: {
    color: BLUE,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
  },

  pageTitle: {
    color: DARK,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 8,
  },

  pageSubtitle: {
    color: MUTED,
    marginTop: 5,
    fontSize: 13,
  },

  innerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    fontSize: 35,
    color: BLUE,
  },

  innerHeaderTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "800",
  },

  formCard: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
    borderColor: BORDER,
  },

  formTitle: {
    color: DARK,
    fontSize: 19,
    fontWeight: "800",
  },

  formSubtitle: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 20,
  },

  inputLabel: {
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
    marginTop: 13,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 13,
    paddingHorizontal: 14,
    color: DARK,
    fontSize: 14,
    backgroundColor: LIGHT,
  },

  infoBox: {
    marginTop: 18,
    backgroundColor: LIGHT,
    borderRadius: 14,
    padding: 15,
    borderWidth: 1,
    borderColor: BORDER,
  },

  infoBoxTitle: {
    color: DARK,
    fontWeight: "800",
    fontSize: 12,
  },

  infoBoxText: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  primaryButton: {
    height: 52,
    backgroundColor: BLUE,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  filterRow: {
    flexDirection: "row",
    marginTop: 22,
    gap: 8,
  },

  filter: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },

  filterActive: {
    backgroundColor: BLUE,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  filterText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "700",
  },

  filterActiveText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  settlementCard: {
    backgroundColor: BLUE,
    borderRadius: 22,
    padding: 22,
    marginTop: 22,
  },

  settlementAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 9,
  },

  settlementNote: {
    color: "#FFFFFF",
    opacity: 0.75,
    fontSize: 11,
    marginTop: 4,
  },

  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 5,
  },

  bankIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  bankIconText: {
    color: BLUE,
    fontSize: 20,
    fontWeight: "900",
  },

  bankTitle: {
    color: DARK,
    fontWeight: "800",
    fontSize: 13,
  },

  bankSubtitle: {
    color: MUTED,
    fontSize: 10,
    marginTop: 3,
  },

  arrow: {
    color: BLUE,
    fontSize: 27,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT,
    borderRadius: 20,
    padding: 18,
    marginTop: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },

  profileAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  profileAvatarText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },

  profileName: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
  },

  profileStatus: {
    color: BLUE,
    fontSize: 11,
    marginTop: 4,
    fontWeight: "700",
  },

  profileMenu: {
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F2F5",
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  menuIconText: {
    color: BLUE,
    fontSize: 17,
    fontWeight: "800",
  },

  menuTitle: {
    flex: 1,
    color: DARK,
    fontSize: 13,
    fontWeight: "700",
  },

  supportCard: {
    marginTop: 24,
    backgroundColor: LIGHT,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
  },

  supportIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: BLUE,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 55,
    fontSize: 25,
    fontWeight: "900",
  },

  supportTitle: {
    color: DARK,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 14,
  },

  supportText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 7,
  },

  supportCardSmall: {
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },

  supportSmallTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  supportSmallText: {
    color: MUTED,
    fontSize: 11,
    marginTop: 6,
  },

  aboutCard: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
  },

  infinityLarge: {
    alignSelf: "center",
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
  },

  infinityLargeText: {
    color: "#FFFFFF",
    fontSize: 55,
  },

  aboutTitle: {
    color: DARK,
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 15,
  },

  aboutTagline: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },

  aboutHeading: {
    color: DARK,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 24,
  },

  aboutText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
});
