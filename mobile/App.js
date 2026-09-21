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
  Image,
} from "react-native";

const BLUE = "#0077B6";
const DARK = "#073B4C";
const LIGHT = "#F4FAFD";
const BORDER = "#D9EEF7";
const MUTED = "#607D8B";
const WHITE = "#FFFFFF";
const GREEN = "#168A5B";
const ORANGE = "#E58A00";

const LOGO = require("./assets/rudraa_logo_clean_transparent.png");

export default function App() {
  const [screen, setScreen] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const sendOtp = () => {
  if (mobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  setOtpSent(true);
};

const verifyOtp = () => {
  if (otp.length !== 4) {
    alert("Please enter 4-digit OTP");
    return;
  }

  setLoggedIn(true);
  setScreen("home");
};

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

        <ScrollView contentContainerStyle={styles.loginContainer}>
          <View style={styles.logoBox}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.brand}>RUDRAA CASH</Text>
          <Text style={styles.loginSubtitle}>Retailer Business App</Text>

          <View style={styles.loginCard}>
            <Text style={styles.loginTitle}>
              {otpSent ? "Verify OTP" : "Welcome Back"}
            </Text>

            <Text style={styles.loginText}>
              {otpSent
                ? "Enter the OTP sent to your registered mobile number."
                : "Login to manage your retailer business."}
            </Text>

            {!otpSent ? (
              <>
                <Text style={styles.label}>Mobile Number</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#9AAAB2"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => setOtpSent(true)}
                >
                  <Text style={styles.primaryButtonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.label}>OTP</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#9AAAB2"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => setLoggedIn(true)}
                >
                  <Text style={styles.primaryButtonText}>
                    Verify and Continue
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOtpSent(false)}>
                  <Text style={styles.linkText}>Change Mobile Number</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.tagline}>
            Empowering India, Empowering Retailers
          </Text>

          <Text style={styles.demoNote}>
            Demo login interface. Production authentication requires secure API
            integration.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "transfer") {
    return (
      <Screen title="Money Transfer" onBack={() => setScreen("home")}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>Transfer Money</Text>
          <Text style={styles.infoText}>
            Enter beneficiary and transaction details.
          </Text>
        </View>

        <Text style={styles.label}>Beneficiary Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter beneficiary name"
          placeholderTextColor="#9AAAB2"
          value={beneficiary}
          onChangeText={setBeneficiary}
        />

        <Text style={styles.label}>Account / UPI ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter account number or UPI ID"
          placeholderTextColor="#9AAAB2"
          value={account}
          onChangeText={setAccount}
        />

        <Text style={styles.label}>Amount</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#9AAAB2"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.previewCard}>
          <Text style={styles.cardTitle}>Transaction Preview</Text>

          <Row label="Beneficiary" value={beneficiary || "-"} />
          <Row label="Account / UPI" value={account || "-"} />
          <Row label="Amount" value={amount ? "Rs. " + amount : "Rs. 0.00"} />
          <Row label="Platform Fee" value="0.50%" />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("transferInfo")}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "transferInfo") {
    return (
      <Screen title="Transfer Status" onBack={() => setScreen("transfer")}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>API Integration Required</Text>

          <Text style={styles.statusText}>
            Real money transfer will be enabled after secure backend and
            approved payment or banking API integration.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.secondaryButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "transactions") {
    return (
      <Screen title="Transactions" onBack={() => setScreen("home")}>
        <View style={styles.filterRow}>
          <Filter text="All" active />
          <Filter text="Success" />
          <Filter text="Pending" />
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>Rs</Text>
          <Text style={styles.emptyTitle}>No Transactions Yet</Text>
          <Text style={styles.emptyText}>
            Your transaction history will appear here.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "settlement") {
    return (
      <Screen title="Settlement" onBack={() => setScreen("home")}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Settlement Balance</Text>
          <Text style={styles.balance}>Rs. 0.00</Text>
          <Text style={styles.balanceSub}>Available for settlement</Text>
        </View>

        <View style={styles.menuCard}>
          <Row label="Bank Account" value="Not Added" />
          <Row label="Settlement Fee" value="0.50%" />
          <Row label="Status" value="API Required" />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("settlementInfo")}
        >
          <Text style={styles.primaryButtonText}>Request Settlement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setScreen("settlementHistory")}
        >
          <Text style={styles.secondaryButtonText}>Settlement History</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "settlementInfo") {
    return (
      <Screen title="Settlement Status" onBack={() => setScreen("settlement")}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>Bank API Required</Text>

          <Text style={styles.statusText}>
            Real settlement requires verified bank details, secure backend
            services and approved banking or payment APIs.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "settlementHistory") {
    return (
      <Screen
        title="Settlement History"
        onBack={() => setScreen("settlement")}
      >
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>Rs</Text>
          <Text style={styles.emptyTitle}>No Settlement History</Text>
          <Text style={styles.emptyText}>
            Your settlement records will appear here.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "profile") {
    return (
      <Screen title="Profile" onBack={() => setScreen("home")}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>

          <View>
            <Text style={styles.profileName}>Rudraa Retailer</Text>
            <Text style={styles.profileStatus}>Account Active</Text>
          </View>
        </View>

        <MenuItem
          title="KYC and Business Details"
          subtitle="Manage retailer information"
          onPress={() => setScreen("kyc")}
        />

        <MenuItem
          title="Bank Account"
          subtitle="Manage settlement bank details"
          onPress={() => setScreen("bank")}
        />

        <MenuItem
          title="Notifications"
          subtitle="View important updates"
          onPress={() => setScreen("notifications")}
        />

        <MenuItem
          title="Customer Support"
          subtitle="Get help and raise a request"
          onPress={() => setScreen("support")}
        />

        <MenuItem
          title="About Rudraa Cash"
          subtitle="Vision, mission and company information"
          onPress={() => setScreen("about")}
        />

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            setLoggedIn(false);
            setOtpSent(false);
            setScreen("home");
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "kyc") {
    return (
      <Screen
        title="KYC and Business Details"
        onBack={() => setScreen("profile")}
      >
        <View style={styles.menuCard}>
          <Row label="Business Name" value="Rudraa Retailer" />
          <Row label="KYC Status" value="Pending Verification" />
          <Row label="PAN" value="Not Added" />
          <Row label="GSTIN" value="Not Added" />
          <Row label="Business Address" value="Not Added" />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("kycInfo")}
        >
          <Text style={styles.primaryButtonText}>Update KYC Details</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "kycInfo") {
    return (
      <Screen title="KYC Status" onBack={() => setScreen("kyc")}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>Secure KYC API Required</Text>

          <Text style={styles.statusText}>
            Production KYC verification will require a secure backend and
            approved KYC provider.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "bank") {
    return (
      <Screen title="Bank Account" onBack={() => setScreen("profile")}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Settlement Bank Account</Text>
          <Text style={styles.bankStatus}>Not Added</Text>
          <Text style={styles.balanceSub}>
            Add verified bank details for settlement.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("bankInfo")}
        >
          <Text style={styles.primaryButtonText}>Add Bank Account</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "bankInfo") {
    return (
      <Screen title="Bank Account Status" onBack={() => setScreen("bank")}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>Secure Banking API Required</Text>

          <Text style={styles.statusText}>
            Bank verification and account management will be connected through
            the production backend.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "notifications") {
    return (
      <Screen title="Notifications" onBack={() => setScreen("profile")}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>N</Text>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyText}>
            Important account and transaction updates will appear here.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "support") {
    return (
      <Screen title="Customer Support" onBack={() => setScreen("profile")}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>How can we help?</Text>

          <Text style={styles.infoText}>
            Raise a support request for account, transaction or settlement
            related issues.
          </Text>
        </View>

        <MenuItem
          title="Transaction Issue"
          subtitle="Report a transaction issue"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Settlement Issue"
          subtitle="Get help with settlement"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Account and KYC"
          subtitle="Get help with your account"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Contact Support"
          subtitle="Raise a support request"
          onPress={() => setScreen("supportInfo")}
        />
      </Screen>
    );
  }

  if (screen === "supportInfo") {
    return (
      <Screen title="Support" onBack={() => setScreen("support")}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>?</Text>

          <Text style={styles.statusTitle}>Support Backend Required</Text>

          <Text style={styles.statusText}>
            Support tickets and communication will be connected to the
            production support backend.
          </Text>
        </View>
      </Screen>
    );
  }

  if (screen === "about") {
    return (
      <Screen title="About Rudraa Cash" onBack={() => setScreen("profile")}>
        <View style={styles.aboutLogoBox}>
          <Image
            source={LOGO}
            style={styles.aboutLogo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.aboutBrand}>RUDRAA CASH</Text>

        <Text style={styles.taglineLarge}>
          Empowering India, Empowering Retailers
        </Text>

        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>Vision</Text>

          <Text style={styles.sectionText}>
            To empower retailers through accessible, reliable and technology
            driven financial business solutions.
          </Text>
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>Mission</Text>

          <Text style={styles.sectionText}>
            To build a trusted digital ecosystem that helps retailers manage
            financial services, transactions and settlements efficiently.
          </Text>
        </View>

        <View style={styles.feeBanner}>
          <Text style={styles.feeTitle}>Platform / Settlement Fee</Text>
          <Text style={styles.feeValue}>0.50%</Text>
        </View>
      </Screen>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>RUDRAA CASH</Text>
            <Text style={styles.headerSub}>Retailer Dashboard</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => setScreen("notifications")}
          >
            <Text style={styles.notificationText}>N</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>Welcome back</Text>
            <Text style={styles.muted}>
              Manage your retailer business
            </Text>
          </View>

          <View style={styles.logoSmallBox}>
            <Image
              source={LOGO}
              style={styles.logoSmall}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balance}>Rs. 0.00</Text>
          <Text style={styles.balanceSub}>Updated just now</Text>
        </View>

        <Text style={styles.sectionHeading}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          <Action
            icon="T"
            title="Money Transfer"
            onPress={() => setScreen("transfer")}
          />

          <Action
            icon="S"
            title="Settlement"
            onPress={() => setScreen("settlement")}
          />

          <Action
            icon="H"
            title="Transactions"
            onPress={() => setScreen("transactions")}
          />

          <Action
            icon="?"
            title="Support"
            onPress={() => setScreen("support")}
          />
        </View>

        <Text style={styles.sectionHeading}>Today's Overview</Text>

        <View style={styles.statsRow}>
          <Stat title="Transactions" value="0" />
          <Stat title="Pending" value="0" />
          <Stat title="Settled" value="Rs. 0" />
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionHeading}>Recent Transactions</Text>

          <TouchableOpacity onPress={() => setScreen("transactions")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>Rs</Text>

          <Text style={styles.emptyTitle}>No Recent Transactions</Text>

          <Text style={styles.emptyText}>
            Your latest transactions will appear here.
          </Text>
        </View>

        <View style={styles.feeBanner}>
          <Text style={styles.feeTitle}>Platform / Settlement Fee</Text>
          <Text style={styles.feeValue}>0.50%</Text>
        </View>

        <Text style={styles.tagline}>
          Empowering India, Empowering Retailers
        </Text>
      </ScrollView>

      <BottomNav screen={screen} setScreen={setScreen} />
    </SafeAreaView>
  );
}

function Screen({ title, onBack, children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>{title}</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

function Action({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>{icon}</Text>
      </View>

      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function Stat({ title, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function Filter({ text, active }) {
  return (
    <View
      style={[
        styles.filter,
        active ? styles.filterActive : null,
      ]}
    >
      <Text
        style={[
          styles.filterText,
          active ? styles.filterTextActive : null,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>

      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function MenuItem({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>
        <Text style={styles.menuIconText}>{">"}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.chevron}>{">"}</Text>
    </TouchableOpacity>
  );
}

function BottomNav({ screen, setScreen }) {
  return (
    <View style={styles.bottomNav}>
      <NavItem
        icon="H"
        title="Home"
        active={screen === "home"}
        onPress={() => setScreen("home")}
      />

      <NavItem
        icon="T"
        title="Transactions"
        active={screen === "transactions"}
        onPress={() => setScreen("transactions")}
      />

      <NavItem
        icon="S"
        title="Settlement"
        active={screen === "settlement"}
        onPress={() => setScreen("settlement")}
      />

      <NavItem
        icon="P"
        title="Profile"
        active={screen === "profile"}
        onPress={() => setScreen("profile")}
      />
    </View>
  );
}

function NavItem({ icon, title, active, onPress }) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
    >
      <Text
        style={[
          styles.navIcon,
          active ? styles.navActive : null,
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.navTitle,
          active ? styles.navActive : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: WHITE,
  },

  container: {
    padding: 20,
    paddingBottom: 110,
  },

  screenContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  loginContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logoBox: {
    alignSelf: "center",
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 120,
    height: 120,
  },

  brand: {
    fontSize: 22,
    fontWeight: "900",
    color: DARK,
    letterSpacing: 1.5,
  },

  loginSubtitle: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 28,
  },

  loginCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    padding: 20,
  },

  loginTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: DARK,
  },

  loginText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: "800",
    color: DARK,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 13,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 15,
    color: DARK,
    backgroundColor: "#FBFEFF",
  },

  primaryButton: {
    backgroundColor: BLUE,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: BLUE,
    fontSize: 15,
    fontWeight: "800",
  },

  linkText: {
    color: BLUE,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 18,
  },

  demoNote: {
    color: MUTED,
    textAlign: "center",
    fontSize: 11,
    marginTop: 20,
    lineHeight: 17,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSub: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  notificationText: {
    color: BLUE,
    fontSize: 16,
    fontWeight: "900",
  },

  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  welcome: {
    color: DARK,
    fontSize: 18,
    fontWeight: "800",
  },

  muted: {
    color: MUTED,
    marginTop: 4,
    fontSize: 13,
  },

  logoSmallBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: "center",
    alignItems: "center",
  },

  logoSmall: {
    width: 48,
    height: 48,
  },

  balanceCard: {
    backgroundColor: BLUE,
    borderRadius: 22,
    padding: 22,
    marginTop: 22,
  },

  balanceLabel: {
    color: "#DDF4FC",
    fontSize: 13,
    fontWeight: "700",
  },

  balance: {
    color: WHITE,
    fontSize: 34,
    fontWeight: "900",
    marginTop: 8,
  },

  balanceSub: {
    color: "#DDF4FC",
    fontSize: 12,
    marginTop: 6,
  },

  bankStatus: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "900",
    marginTop: 8,
  },

  sectionHeading: {
    color: DARK,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 12,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionCard: {
    width: "48%",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  actionIconText: {
    color: BLUE,
    fontSize: 17,
    fontWeight: "900",
  },

  actionTitle: {
    color: DARK,
    fontWeight: "800",
    marginTop: 12,
    fontSize: 13,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "31%",
    backgroundColor: LIGHT,
    borderRadius: 16,
    padding: 13,
  },

  statValue: {
    color: DARK,
    fontSize: 16,
    fontWeight: "900",
  },

  statTitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 5,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: BLUE,
    fontWeight: "800",
    fontSize: 13,
  },

  emptyCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    backgroundColor: WHITE,
  },

  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: LIGHT,
    textAlign: "center",
    textAlignVertical: "center",
    color: BLUE,
    fontSize: 16,
    fontWeight: "900",
    overflow: "hidden",
    paddingTop: 16,
  },

  emptyTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 13,
  },

  emptyText: {
    color: MUTED,
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },

  feeBanner: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 17,
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  feeTitle: {
    color: DARK,
    fontWeight: "700",
    fontSize: 12,
  },

  feeValue: {
    color: BLUE,
    fontSize: 18,
    fontWeight: "900",
  },

  tagline: {
    color: BLUE,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 22,
    marginBottom: 5,
  },

  topBar: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: BLUE,
    fontSize: 22,
    fontWeight: "900",
  },

  topTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "900",
  },

  infoBanner: {
    backgroundColor: LIGHT,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },

  infoTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "900",
  },

  infoText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  previewCard: {
    backgroundColor: LIGHT,
    borderRadius: 18,
    padding: 18,
    marginTop: 15,
  },

  cardTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 5,
  },

  statusCard: {
    backgroundColor: LIGHT,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  statusIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: WHITE,
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 16,
    color: ORANGE,
    fontSize: 20,
    fontWeight: "900",
  },

  statusTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 15,
  },

  statusText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  rowLabel: {
    color: MUTED,
    fontSize: 13,
    flex: 1,
  },

  rowValue: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
    maxWidth: "55%",
    textAlign: "right",
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  filter: {
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginRight: 8,
  },

  filterActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },

  filterText: {
    color: MUTED,
    fontWeight: "700",
    fontSize: 12,
  },

  filterTextActive: {
    color: WHITE,
  },

  menuCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: LIGHT,
    borderRadius: 20,
    marginBottom: 16,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    color: WHITE,
    fontSize: 23,
    fontWeight: "900",
  },

  profileName: {
    color: DARK,
    fontSize: 17,
    fontWeight: "900",
  },

  profileStatus: {
    color: GREEN,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    marginBottom: 12,
    backgroundColor: WHITE,
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  menuIconText: {
    color: BLUE,
    fontSize: 20,
    fontWeight: "900",
  },

  menuTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "900",
  },

  menuSubtitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  chevron: {
    color: BLUE,
    fontSize: 22,
    fontWeight: "900",
  },

  logoutButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5BABA",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  logoutText: {
    color: "#B53B3B",
    fontWeight: "900",
  },

  aboutLogoBox: {
    alignSelf: "center",
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },

  aboutLogo: {
    width: 120,
    height: 120,
  },

  aboutBrand: {
    textAlign: "center",
    color: DARK,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginTop: 8,
  },

  taglineLarge: {
    textAlign: "center",
    color: BLUE,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 20,
  },

  aboutCard: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  sectionTitle: {
    color: BLUE,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 7,
  },

  sectionText: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
  },

  bottomNav: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    height: 68,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
  },

  navIcon: {
    color: MUTED,
    fontSize: 17,
    fontWeight: "900",
  },

  navTitle: {
    color: MUTED,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 3,
  },

  navActive: {
    color: BLUE,
  },
});
