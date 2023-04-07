import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import * as SecureStore from "expo-secure-store";
import { transformEmailToKey } from "../../utils";
// import { userAtom } from "../../../App";
// import { useAtom } from "jotai";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOver18, setIsOver18] = useState(false);

  const handleSignup = async () => {
    const emailKey = transformEmailToKey(email);
    const userObject = {
      firstName,
      lastName,
      email,
      password,
      isOver18,
    };
    const userObjectString = JSON.stringify(userObject);

    if (!validateEmailFormat(email)) {
      alert("Invalid email format.");
      return;
    }

    if (!validatePasswordLength(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!isOver18) {
      alert("You must be 18 years old or older to sign up.");
      return;
    }

    let result = await SecureStore.getItemAsync(emailKey);
    if (result) {
      alert("Account already exists. Please login.");
      return;
    }
    try {
      await SecureStore.setItemAsync(emailKey, userObjectString);
      alert("Account created successfully!");
      navigation.navigate("Login Page");
    } catch (error) {
      alert(error);
      return;
    }
  };

  const validateEmailFormat = () => {
    const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegExp.test(email);
  };

  const validatePasswordLength = () => {
    return password.length >= 8;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signupTitle}>Sign Up</Text>

      <Text style={styles.inputLabel}>First Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#CFCFCF"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.inputLabel}>Last Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          placeholderTextColor="#CFCFCF"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.inputLabel}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#CFCFCF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <Text style={styles.inputLabel}>Password</Text>
      <View style={styles.passwordContainer}>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            placeholder="8 Characters minimum"
            placeholderTextColor={"#CFCFCF"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
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

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isOver18}
          onValueChange={setIsOver18}
          style={styles.checkbox}
          color="#E6E6E6"
        />
        <Text style={styles.label}>
          I am over 18 years of age and I have read and agree to the
          <Text style={styles.link}> Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy policy</Text>.
        </Text>
      </View>
      <CustomButton title="Create Account" onPress={handleSignup} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login Page")}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink}>Login in Here</Text>
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
  signupTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 42,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: "flex-start",
    marginBottom: 5,
    color: "#A0A0A0",
  },
  input: {
    width: "100%",
    borderRadius: 4,
    padding: 10,
  },
  checkboxContainer: {
    marginRight: 22,
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 37,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: "#A0A0A0",
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
  link: {
    color: "#000000",
  },
  loginText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  loginLink: {
    color: "#000000",
    textDecorationLine: "underline",
  },
  loginButton: {
    marginTop: 10,
  },
});
