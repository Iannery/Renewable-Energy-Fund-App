import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../../components/CustomButton";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function validateCredentials(email, password) {
    let result = await SecureStore.getItemAsync(email);
    if (result) {
      if (result.password === password) {
        alert("Login successful!");
      } else {
        alert("Incorrect password.");
      }
    } else {
      alert("Account not found. Please sign up.");
    }
  }

  const validateEmailFormat = () => {
    const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegExp.test(email);
  };

  const validatePasswordLength = () => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    if (!validateEmailFormat(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!validatePasswordLength(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    await validateCredentials(email, password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.inputLabel(focusedEmail)}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor={"#CFCFCF"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedEmail(true)}
          onBlur={() => setFocusedEmail(false)}
        />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.inputLabel(focusedPassword)}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="8 Characters minimum"
            placeholderTextColor={"#CFCFCF"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Signup Page")}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Text style={styles.signupTextButton}>Sign Up</Text> here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#F4F4F4",
    borderRadius: 4,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 42,
  },
  inputLabel: (isFocused) => ({
    fontSize: 14,
    fontWeight: isFocused ? "500" : "400",
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "#A0A0A0",
  }),
  input: {
    width: "100%",
    borderRadius: 4,
    padding: 10,
  },
  passwordContainer: {
    width: "100%",
    marginBottom: 37,
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingRight: 10,
    backgroundColor: "#F4F4F4",
  },
  eyeIcon: {
    marginLeft: "auto",
  },
  signupText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  signupTextButton: {
    fontSize: 14,
    color: "#A0A0A0",
    textDecorationLine: "underline",
  },
});
