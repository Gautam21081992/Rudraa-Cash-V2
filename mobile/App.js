import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const BLUE = "#0077B6";
const DARK = "#123047";
const LIGHT = "#F5FAFD";
const BORDER = "#D9E7EF";
const MUTED = "#6B7C87";
const WHITE = "#FFFFFF";
const GREEN = "#168A45";
const ORANGE = "#E58A00";
const RED = "#C62828";

const LOGO = require("./assets/rudraa_logo_clean_transparent.png");

export default function App() {
  const [screen, setScreen] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [beneficiary, setBeneficiary] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  const sendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setOtpSent(true);
    Alert.alert("OTP Sent", "Demo OTP screen activated.");
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter 6-digit OTP.");
      return;
    }

    setLoggedIn(true);
    setScreen("home");
  };

  const startTransfer = () => {
    if (!beneficiary.trim()) {
      Alert.alert("Required", "Please enter beneficiary name.");
      return;
    }

    if (account.trim().length < 6) {
      Alert.alert(
        "Invalid Account",
        "Please enter a valid account number."
      );
      return;
    }

    if (!amount.trim() || Number(amount) <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid transfer amount."
      );
      return;
    }

    setScreen("transferInfo");
  };

  const confirmTransfer = () => {
    Alert.alert(
      "API Required",
      "Real money transfer will work only after approved banking/payment APIs, secure backend, KYC and authentication are connected."
    );
  };

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={styles.loginContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={LOGO}
            style={styles.loginLogo}
            resizeMode="contain"
          />

          <Text style={styles.loginTitle}>Rudraa Cash</Text>

          <Text style={styles.loginSubtitle}>
            Empowering India, Empowering Retailers
          </Text>

          <View style={styles.loginCard}>
            <Text style={styles.sectionTitle}>
              Retailer Login
            </Text>

            <Text style={styles.inputLabel}>
              Mobile Number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#9AAAB4"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />

            {!otpSent ? (
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={sendOtp}
              >
                <Text style={styles.primaryButtonText}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.inputLabel}>
                  6-Digit OTP
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit OTP"
                  placeholderTextColor="#9AAAB4"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={setOtp}
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={verifyOtp}
                >
                  <Text style={styles.primaryButtonText}>
                    Verify and Continue
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setOtp("");
                    setOtpSent(false);
                  }}
                >
                  <Text style={styles.secondaryButtonText}>
                    Change Mobile Number
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <Text style={styles.demoText}>
              Secure retailer access will be connected with
              production authentication and OTP service.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  /* MONEY TRANSFER */

  if (screen === "transfer") {
    return (
      <Screen
        title="Money Transfer"
        onBack={() => setScreen("home")}
      >
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            Send Money
          </Text>

          <Text style={styles.infoText}>
            Enter beneficiary details and transfer amount to
            continue.
          </Text>
        </View>

        <Text style={styles.inputLabel}>
          Beneficiary Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter beneficiary name"
          placeholderTextColor="#9AAAB4"
          value={beneficiary}
          onChangeText={setBeneficiary}
        />

        <Text style={styles.inputLabel}>
          Bank Account Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          placeholderTextColor="#9AAAB4"
          keyboardType="number-pad"
          value={account}
          onChangeText={setAccount}
        />

        <Text style={styles.inputLabel}>
          Transfer Amount
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount in Rs."
          placeholderTextColor="#9AAAB4"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.feeCard}>
          <Text style={styles.feeTitle}>
            Transfer Status
          </Text>

          <Text style={styles.feeText}>
            Production banking/payment API required
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={startTransfer}
        >
          <Text style={styles.primaryButtonText}>
            Review Transfer
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "transferInfo") {
    return (
      <Screen
        title="Review Transfer"
        onBack={() => setScreen("transfer")}
      >
        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>
            Transfer Details
          </Text>

          <Row
            title="Beneficiary"
            value={beneficiary || "Not Added"}
          />

          <Row
            title="Account Number"
            value={account || "Not Added"}
          />

          <Row
            title="Amount"
            value={`Rs. ${amount || "0.00"}`}
          />

          <Row
            title="Status"
            value="API Required"
          />
        </View>

        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>
            Secure Transfer API Required
          </Text>

          <Text style={styles.statusText}>
            Actual money transfer will be enabled only after
            approved banking/payment APIs, secure backend
            services, authentication, KYC and transaction
            verification are connected.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={confirmTransfer}
        >
          <Text style={styles.primaryButtonText}>
            Confirm Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setScreen("transfer")}
        >
          <Text style={styles.secondaryButtonText}>
            Edit Details
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  /* TRANSACTIONS */

  if (screen === "transactions") {
    return (
      <TransactionsScreen
        setScreen={setScreen}
      />
    );
  }

  if (screen === "transactionDetails") {
    return (
      <Screen
        title="Transaction Details"
        onBack={() => setScreen("transactions")}
      >
        <View style={styles.transactionStatusCard}>
          <View style={styles.successCircle}>
            <Text style={styles.successCheck}>✓</Text>
          </View>

          <Text style={styles.transactionStatusTitle}>
            Transaction Status
          </Text>

          <Text style={styles.pendingStatus}>
            API Required
          </Text>

          <Text style={styles.transactionStatusText}>
            This is a transaction-detail preview. Actual
            transaction status will be received from the secure
            production backend.
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsHeading}>
            Transaction Information
          </Text>

          <Row
            title="Transaction ID"
            value="RC-TXN-000001"
          />

          <Row
            title="Type"
            value="Money Transfer"
          />

          <Row
            title="Beneficiary"
            value="Demo Beneficiary"
          />

          <Row
            title="Account"
            value="XXXXXX1234"
          />

          <Row
            title="Amount"
            value="Rs. 0.00"
          />

          <Row
            title="Date"
            value="Not Available"
          />

          <Row
            title="Status"
            value="API Required"
          />
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "Transaction Support",
              "Production transaction support will be connected with the backend support system."
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            Need Help?
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  /* SETTLEMENT */

  if (screen === "settlement") {
    return (
      <Screen
        title="Settlement"
        onBack={() => setScreen("home")}
      >
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            Settlement Balance
          </Text>

          <Text style={styles.balanceAmount}>
            Rs. 0.00
          </Text>

          <Text style={styles.balanceSub}>
            Available for settlement
          </Text>
        </View>

        <MenuItem
          title="Bank Account"
          subtitle="Not Added"
          onPress={() => setScreen("bank")}
        />

        <MenuItem
          title="Settlement Fee"
          subtitle="0.50%"
          onPress={() => {}}
        />

        <MenuItem
          title="Settlement Status"
          subtitle="API Required"
          onPress={() => setScreen("settlementInfo")}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("settlementInfo")}
        >
          <Text style={styles.primaryButtonText}>
            Request Settlement
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setScreen("settlementHistory")}
        >
          <Text style={styles.secondaryButtonText}>
            Settlement History
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "settlementInfo") {
    return (
      <Screen
        title="Settlement Status"
        onBack={() => setScreen("settlement")}
      >
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>
            Bank API Required
          </Text>

          <Text style={styles.statusText}>
            Real settlement requires verified bank details,
            secure backend services and approved banking/payment
            APIs.
          </Text>
        </View>

        <MenuItem
          title="Settlement Fee"
          subtitle="0.50%"
          onPress={() => {}}
        />

        <MenuItem
          title="Bank Verification"
          subtitle="Required"
          onPress={() => setScreen("bank")}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "API Required",
              "Settlement cannot be processed until the production backend and approved banking/payment API are connected."
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            Request Settlement
          </Text>
        </TouchableOpacity>
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
          <Text style={styles.emptyIcon}>₹</Text>

          <Text style={styles.emptyTitle}>
            No Settlement History
          </Text>

          <Text style={styles.emptyText}>
            Settlement records will appear here after successful
            settlement requests.
          </Text>
        </View>
      </Screen>
    );
  }

  /* PROFILE */

  if (screen === "profile") {
    return (
      <Screen
        title="Profile"
        onBack={() => setScreen("home")}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>
              Rudraa Retailer
            </Text>

            <Text style={styles.profileSub}>
              Retailer Account
            </Text>
          </View>
        </View>

        <MenuItem
          title="KYC"
          subtitle="Verification required"
          onPress={() => setScreen("kyc")}
        />

        <MenuItem
          title="Bank Account"
          subtitle="Not Added"
          onPress={() => setScreen("bank")}
        />

        <MenuItem
          title="Account Status"
          subtitle="Active"
          onPress={() => {}}
        />

        <MenuItem
          title="Support"
          subtitle="Customer Support"
          onPress={() => setScreen("support")}
        />

        <MenuItem
          title="About Rudraa Cash"
          subtitle="Company information"
          onPress={() => setScreen("about")}
        />
      </Screen>
    );
  }

  /* KYC */

  if (screen === "kyc") {
    return (
      <Screen
        title="KYC"
        onBack={() => setScreen("profile")}
      >
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>
            KYC Verification Required
          </Text>

          <Text style={styles.statusText}>
            Production KYC verification will be connected with
            approved KYC and compliance services.
          </Text>
        </View>

        <MenuItem
          title="Identity Verification"
          subtitle="Pending"
          onPress={() => setScreen("kycInfo")}
        />

        <MenuItem
          title="Address Verification"
          subtitle="Pending"
          onPress={() => setScreen("kycInfo")}
        />

        <MenuItem
          title="KYC Status"
          subtitle="API Required"
          onPress={() => setScreen("kycInfo")}
        />
      </Screen>
    );
  }

  if (screen === "kycInfo") {
    return (
      <Screen
        title="KYC Information"
        onBack={() => setScreen("kyc")}
      >
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            KYC & Compliance
          </Text>

          <Text style={styles.infoText}>
            Secure KYC verification, document validation and
            compliance checks will be handled by the production
            backend and approved service providers.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "KYC API Required",
              "Connect approved KYC provider before enabling real verification."
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            Start KYC Verification
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  /* BANK */

  if (screen === "bank") {
    return (
      <Screen
        title="Bank Account"
        onBack={() => setScreen("profile")}
      >
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>₹</Text>

          <Text style={styles.emptyTitle}>
            No Bank Account Added
          </Text>

          <Text style={styles.emptyText}>
            Add and verify a bank account to enable production
            settlement.
          </Text>
        </View>

        <MenuItem
          title="Bank Verification"
          subtitle="API Required"
          onPress={() => setScreen("bankInfo")}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setScreen("bankInfo")}
        >
          <Text style={styles.primaryButtonText}>
            Add Bank Account
          </Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (screen === "bankInfo") {
    return (
      <Screen
        title="Bank Account Setup"
        onBack={() => setScreen("bank")}
      >
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>!</Text>

          <Text style={styles.statusTitle}>
            Secure Bank API Required
          </Text>

          <Text style={styles.statusText}>
            Bank account verification and settlement setup require
            secure backend integration and approved banking/payment
            services.
          </Text>
        </View>

        <MenuItem
          title="Account Verification"
          subtitle="Pending"
          onPress={() => {}}
        />

        <MenuItem
          title="Settlement"
          subtitle="0.50% platform fee"
          onPress={() => setScreen("settlement")}
        />
      </Screen>
    );
  }

  /* NOTIFICATIONS */

  if (screen === "notifications") {
    return (
      <Screen
        title="Notifications"
        onBack={() => setScreen("home")}
      >
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            Notifications
          </Text>

          <Text style={styles.infoText}>
            Important updates about your account, transactions
            and settlements will appear here.
          </Text>
        </View>

        <MenuItem
          title="Account Updates"
          subtitle="Your account and KYC updates will appear here."
          onPress={() => {}}
        />

        <MenuItem
          title="Transaction Updates"
          subtitle="Transaction status and important alerts."
          onPress={() => {}}
        />

        <MenuItem
          title="Settlement Updates"
          subtitle="Settlement status and payout notifications."
          onPress={() => {}}
        />

        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>i</Text>

          <Text style={styles.statusTitle}>
            Notification Backend Required
          </Text>

          <Text style={styles.statusText}>
            Real-time notifications will be connected to the
            production backend and notification service.
          </Text>
        </View>
      </Screen>
    );
  }

  /* SUPPORT */

  if (screen === "support") {
    return (
      <Screen
        title="Customer Support"
        onBack={() => setScreen("home")}
      >
        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            How can we help?
          </Text>

          <Text style={styles.infoText}>
            Support for account, transaction and settlement issues.
          </Text>
        </View>

        <MenuItem
          title="Transaction Issue"
          subtitle="Report a transaction problem"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Settlement Issue"
          subtitle="Get help with settlement"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Account and KYC"
          subtitle="Help with account verification"
          onPress={() => setScreen("supportInfo")}
        />

        <MenuItem
          title="Contact Support"
          subtitle="Support team contact"
          onPress={() => setScreen("supportInfo")}
        />
      </Screen>
    );
  }

  if (screen === "supportInfo") {
    return (
      <Screen
        title="Support"
        onBack={() => setScreen("support")}
      >
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>?</Text>

          <Text style={styles.statusTitle}>
            Support Backend Required
          </Text>

          <Text style={styles.statusText}>
            Customer support tickets and communication will be
            connected with the production support system.
          </Text>
        </View>

        <MenuItem
          title="Transaction Support"
          subtitle="Transaction issue assistance"
          onPress={() => {}}
        />

        <MenuItem
          title="Settlement Support"
          subtitle="Settlement issue assistance"
          onPress={() => {}}
        />

        <MenuItem
          title="Contact Support"
          subtitle="Support channel required"
          onPress={() =>
            Alert.alert(
              "Support",
              "Production support contact will be connected here."
            )
          }
        />
      </Screen>
    );
  }

  /* ABOUT */

  if (screen === "about") {
    return (
      <Screen
        title="About Rudraa Cash"
        onBack={() => setScreen("profile")}
      >
        <View style={styles.aboutCard}>
          <Image
            source={LOGO}
            style={styles.aboutLogo}
            resizeMode="contain"
          />

          <Text style={styles.aboutTitle}>
            Rudraa Cash
          </Text>

          <Text style={styles.aboutTagline}>
            Empowering India, Empowering Retailers
          </Text>
        </View>

        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            Vision
          </Text>

          <Text style={styles.infoText}>
            To build a trusted digital financial ecosystem that
            empowers retailers and businesses across India.
          </Text>
        </View>

        <View style={styles.infoBanner}>
          <Text style={styles.infoTitle}>
            Mission
          </Text>

          <Text style={styles.infoText}>
            To provide secure, accessible and technology-driven
            financial services for retailers and business partners.
          </Text>
        </View>

        <MenuItem
          title="Platform Fee"
          subtitle="Settlement: 0.50%"
          onPress={() => {}}
        />

        <MenuItem
          title="App Status"
          subtitle="API-ready prototype"
          onPress={() => {}}
        />
      </Screen>
    );
  }

  /* HOME */

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.homeContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={LOGO}
            style={styles.logoSmall}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => setScreen("notifications")}
          >
            <Text style={styles.notificationText}>
              N
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>
              Welcome, Retailer
            </Text>

            <Text style={styles.muted}>
              Manage your retailer business
            </Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            Available Balance
          </Text>

          <Text style={styles.balanceAmount}>
            Rs. 0.00
          </Text>

          <Text style={styles.balanceSub}>
            Updated just now
          </Text>
        </View>

        <Text style={styles.sectionHeading}>
          Quick Actions
        </Text>

        <View style={styles.actionGrid}>
          <Action
            icon="↗"
            title="Money Transfer"
            onPress={() => setScreen("transfer")}
          />

          <Action
            icon="₹"
            title="Settlement"
            onPress={() => setScreen("settlement")}
          />

          <Action
            icon="≡"
            title="Transactions"
            onPress={() => setScreen("transactions")}
          />

          <Action
            icon="?"
            title="Support"
            onPress={() => setScreen("support")}
          />
        </View>

        <Text style={styles.sectionHeading}>
          Today's Overview
        </Text>

        <View style={styles.statsRow}>
          <Stat
            title="Transfers"
            value="0"
          />

          <Stat
            title="Settlements"
            value="0"
          />

          <Stat
            title="Pending"
            value="0"
          />
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionHeading}>
            Recent Transactions
          </Text>

          <TouchableOpacity
            onPress={() => setScreen("transactions")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>
            ₹
          </Text>

          <Text style={styles.emptyTitle}>
            No Recent Transactions
          </Text>

          <Text style={styles.emptyText}>
            Your latest transaction activity will appear here.
          </Text>
        </View>

        <View style={styles.feeBanner}>
          <Text style={styles.feeTitle}>
            Settlement Fee: 0.50%
          </Text>

          <Text style={styles.feeText}>
            Transparent platform fee for settlement services.
          </Text>
        </View>

        <View style={styles.taglineCard}>
          <Text style={styles.tagline}>
            Empowering India, Empowering Retailers
          </Text>
        </View>

        <BottomNav
          screen={screen}
          setScreen={setScreen}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* TRANSACTION SCREEN COMPONENT */

function TransactionsScreen({ setScreen }) {
  const [filter, setFilter] = useState("All");

  const openDetails = () => {
    setScreen("transactionDetails");
  };

  return (
    <Screen
      title="Transactions"
      onBack={() => setScreen("home")}
    >
      <View style={styles.infoBanner}>
        <Text style={styles.infoTitle}>
          Transaction History
        </Text>

        <Text style={styles.infoText}>
          View transfers, settlement activity and transaction
          status from one place.
        </Text>
      </View>

      <Text style={styles.filterHeading}>
        Filter Transactions
      </Text>

      <View style={styles.filterRow}>
        {["All", "Success", "Pending", "Failed"].map(
          (item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filter,
                filter === item && styles.filterActive,
              ]}
              onPress={() => setFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item &&
                    styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={styles.transactionPreviewCard}>
        <View style={styles.transactionTop}>
          <View style={styles.transactionIcon}>
            <Text style={styles.transactionIconText}>
              ₹
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.transactionName}>
              Demo Transaction
            </Text>

            <Text style={styles.transactionId}>
              RC-TXN-000001
            </Text>
          </View>

          <Text style={styles.transactionAmount}>
            Rs. 0.00
          </Text>
        </View>

        <View style={styles.transactionBottom}>
          <Text style={styles.transactionDate}>
            Money Transfer
          </Text>

          <Text style={styles.apiStatus}>
            API Required
          </Text>
        </View>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={openDetails}
        >
          <Text style={styles.detailsButtonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusIcon}>
          i
        </Text>

        <Text style={styles.statusTitle}>
          Production Transaction Data Required
        </Text>

        <Text style={styles.statusText}>
          This preview is ready for backend integration. Real
          transaction records, statuses and timestamps will be
          loaded from the secure production API.
        </Text>
      </View>
    </Screen>
  );
}

function Screen({ title, onBack, children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.screenHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.screenTitle}>
          {title}
        </Text>

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
      activeOpacity={0.8}
    >
      <View style={styles.actionIcon}>
        <Text style={styles.actionIconText}>
          {icon}
        </Text>
      </View>

      <Text style={styles.actionTitle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function Stat({ title, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statTitle}>
        {title}
      </Text>
    </View>
  );
}

function Row({ title, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>
        {title}
      </Text>

      <Text style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

function MenuItem({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Text style={styles.menuArrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

function BottomNav({ screen, setScreen }) {
  return (
    <View style={styles.bottomNav}>
      <NavItem
        icon="⌂"
        title="Home"
        active={screen === "home"}
        onPress={() => setScreen("home")}
      />

      <NavItem
        icon="≡"
        title="Transactions"
        active={
          screen === "transactions" ||
          screen === "transactionDetails"
        }
        onPress={() => setScreen("transactions")}
      />

      <NavItem
        icon="₹"
        title="Settlement"
        active={
          screen === "settlement" ||
          screen === "settlementInfo" ||
          screen === "settlementHistory"
        }
        onPress={() => setScreen("settlement")}
      />

      <NavItem
        icon="R"
        title="Profile"
        active={
          screen === "profile" ||
          screen === "kyc" ||
          screen === "kycInfo" ||
          screen === "bank" ||
          screen === "bankInfo"
        }
        onPress={() => setScreen("profile")}
      />
    </View>
  );
}

function NavItem({
  icon,
  title,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.navIcon,
          active && styles.navActive,
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.navTitle,
          active && styles.navActive,
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

  loginContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
    backgroundColor: WHITE,
  },

  loginLogo: {
    width: 190,
    height: 100,
    alignSelf: "center",
    marginBottom: 12,
  },

  loginTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
  },

  loginSubtitle: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  loginCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: DARK,
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: DARK,
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: DARK,
    backgroundColor: LIGHT,
  },

  primaryButton: {
    height: 52,
    backgroundColor: BLUE,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },

  primaryButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: "800",
  },

  secondaryButton: {
    height: 50,
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  secondaryButtonText: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "800",
  },

  demoText: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    marginTop: 16,
  },

  homeContainer: {
    padding: 18,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  logoSmall: {
    width: 145,
    height: 58,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationText: {
    fontSize: 17,
    fontWeight: "800",
    color: BLUE,
  },

  welcomeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  welcome: {
    fontSize: 24,
    fontWeight: "800",
    color: DARK,
  },

  muted: {
    color: MUTED,
    fontSize: 13,
    marginTop: 4,
  },

  balanceCard: {
    backgroundColor: BLUE,
    borderRadius: 20,
    padding: 22,
    marginBottom: 22,
  },

  balanceLabel: {
    color: "#E8F7FF",
    fontSize: 13,
    fontWeight: "700",
  },

  balanceAmount: {
    color: WHITE,
    fontSize: 32,
    fontWeight: "900",
    marginTop: 8,
  },

  balanceSub: {
    color: "#D5EFFA",
    fontSize: 12,
    marginTop: 5,
  },

  sectionHeading: {
    fontSize: 17,
    fontWeight: "800",
    color: DARK,
    marginBottom: 12,
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  actionCard: {
    width: "48%",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    minHeight: 115,
    elevation: 1,
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  actionIconText: {
    fontSize: 20,
    fontWeight: "800",
    color: BLUE,
  },

  actionTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  statCard: {
    width: "31%",
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    borderRadius: 14,
    padding: 13,
  },

  statValue: {
    color: BLUE,
    fontSize: 21,
    fontWeight: "900",
  },

  statTitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 12,
  },

  emptyCard: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },

  emptyIcon: {
    fontSize: 30,
    fontWeight: "900",
    color: BLUE,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 12,
    color: MUTED,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 7,
  },

  feeBanner: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  feeTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  feeText: {
    color: MUTED,
    fontSize: 12,
    marginTop: 5,
    lineHeight: 17,
  },

  taglineCard: {
    padding: 18,
    alignItems: "center",
    marginBottom: 18,
  },

  tagline: {
    color: BLUE,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },

  screenHeader: {
    height: 68,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: WHITE,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 30,
    lineHeight: 32,
    color: BLUE,
    fontWeight: "500",
  },

  screenTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: DARK,
  },

  screenContainer: {
    padding: 18,
    paddingBottom: 35,
  },

  infoBanner: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 16,
    padding: 17,
    marginBottom: 16,
  },

  infoTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "800",
  },

  infoText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },

  feeCard: {
    backgroundColor: LIGHT,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 15,
    marginTop: 16,
  },

  feeCardTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  reviewCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  reviewTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF3F6",
  },

  rowTitle: {
    color: MUTED,
    fontSize: 12,
  },

  rowValue: {
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
    maxWidth: "55%",
    textAlign: "right",
  },

  statusCard: {
    backgroundColor: "#FFF9EF",
    borderWidth: 1,
    borderColor: "#F0D9AA",
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
  },

  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ORANGE,
    color: WHITE,
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "900",
    marginBottom: 10,
  },

  statusTitle: {
    color: DARK,
    fontSize: 15,
    fontWeight: "800",
  },

  statusText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },

  filterHeading: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 9,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  filter: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    marginRight: 7,
  },

  filterActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },

  filterText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: "700",
  },

  filterTextActive: {
    color: WHITE,
  },

  transactionPreviewCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  transactionTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  transactionIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  transactionIconText: {
    color: BLUE,
    fontSize: 19,
    fontWeight: "900",
  },

  transactionName: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  transactionId: {
    color: MUTED,
    fontSize: 10,
    marginTop: 4,
  },

  transactionAmount: {
    color: DARK,
    fontSize: 14,
    fontWeight: "900",
  },

  transactionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEF3F6",
  },

  transactionDate: {
    color: MUTED,
    fontSize: 11,
  },

  apiStatus: {
    color: ORANGE,
    fontSize: 11,
    fontWeight: "800",
  },

  detailsButton: {
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 10,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  detailsButtonText: {
    color: BLUE,
    fontSize: 13,
    fontWeight: "800",
  },

  transactionStatusCard: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    marginBottom: 16,
  },

  successCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#E8F7EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  successCheck: {
    color: GREEN,
    fontSize: 30,
    fontWeight: "900",
  },

  transactionStatusTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
  },

  pendingStatus: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 5,
  },

  transactionStatusText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
  },

  detailsCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  detailsHeading: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },

  menuItem: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 11,
  },

  menuTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },

  menuSubtitle: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  menuArrow: {
    color: BLUE,
    fontSize: 27,
    marginLeft: 10,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 17,
    marginBottom: 17,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  avatarText: {
    color: WHITE,
    fontSize: 23,
    fontWeight: "900",
  },

  profileName: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
  },

  profileSub: {
    color: MUTED,
    fontSize: 12,
    marginTop: 4,
  },

  aboutCard: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
  },

  aboutLogo: {
    width: 180,
    height: 90,
    marginBottom: 8,
  },

  aboutTitle: {
    color: DARK,
    fontSize: 23,
    fontWeight: "900",
  },

  aboutTagline: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },

  bottomNav: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    height: 68,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  navIcon: {
    fontSize: 19,
    color: MUTED,
    fontWeight: "800",
  },

  navTitle: {
    fontSize: 10,
    color: MUTED,
    fontWeight: "700",
    marginTop: 3,
  },

  navActive: {
    color: BLUE,
  },
});
