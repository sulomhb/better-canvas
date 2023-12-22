import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const handleForgotPassword = async (
  userEmail: string,
  navigation,
) => {
  try {
    const response = await axios.post(
      "https://bettercanvas-api.onrender.com/forgot",
      {
        email: userEmail,
      },
    );

    // Check if the registration was successful
    if (response.status == 200) {
      // Navigate to the dashboard or perform any other desired action
      Alert.alert("If this user exists, you should get your PIN code in your e-mail.")
      navigation.replace("Sign In");
    } else {
      // Handle registration failure
      console.log("Forgot password failed");
    }
  } catch (error) {
    // Handle request error
    Alert.alert("Please write an e-mail!")
    console.error("An error occurred during sending PIN to mail:", error);
  }
};

const ForgotPasswordScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(153 27 27)" }}>
<Text className="text-5xl self-center text-red-50 mt-3 p-3">
          <MaterialCommunityIcons 
                    name='lock' 
                    size={50} 
                />
          Forgot Pin?</Text>
          <View className="items-center mt-10">
          <Text className="text-lg self-center text-red-50 mb-3 font-light">Please insert your account e-mail</Text>
        <TextInput
          className="text-sm w-64 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          onChangeText={(text) => setUserEmail(text)}
          placeholder="E-mail"
          placeholderTextColor={"gray"}
        ></TextInput>
        <View>
        </View>
 
        <Pressable
          className="bg-red-50 rounded p-2 w-32"
          onPress={() => handleForgotPassword(userEmail, navigation)}
        >
          <Text className="text-lg self-center text-red-800 font-light">Retrieve PIN</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

[1,4,9,16,25]

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
