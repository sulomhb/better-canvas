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
import { CANVAS_API_TOKEN } from "../../../../env";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const handleRegistration = async (
  apiToken: string,
  userName: string,
  userEmail: string,
  userPin: string,
  navigation,
  registrationFailed,
  setRegistrationFailed,
) => {
  try {
    if (apiToken === "") {
      Alert.alert("Please fill out API - Token");
      setRegistrationFailed(true);
      return registrationFailed;
    } else {
      setRegistrationFailed(false);
    }

    if (userName === "") {
      Alert.alert("Please fill out Username");
      setRegistrationFailed(true);
      return registrationFailed;
    } else {
      setRegistrationFailed(false);
    }

    if (userEmail === "") {
      Alert.alert("Please fill out E-mail");
      setRegistrationFailed(true);
      return registrationFailed;
    } else {
      setRegistrationFailed(false);
    }

    if (userPin === "") {
      Alert.alert("Please fill out PIN code");
      setRegistrationFailed(true);
      return registrationFailed;
    } else {
      setRegistrationFailed(false);
    }

    if (!registrationFailed) {
      const response = await axios.post(
        "https://bettercanvas-api.onrender.com/register",
        {
          apiToken: apiToken,
          name: userName,
          email: userEmail,
          pinCode: userPin,
        },
      );
      // Check if the registration was successful
      if (response.status == 200 || response.status == 201) {
      Alert.alert("Your account has been created! You will now be redirected to the Sign In page!")
navigation.reset({
    index: 0,
    routes: [{ name: 'Sign In' }] // Replace 'Sign In' with your actual screen name
  });      } else {
        Alert.alert("Your account could not be created! Please try again!")
        console.log("Registration failed");
      }
    }
  } catch (error) {
    // Handle request error
    console.error("An error occurred during registration:", error);
  }
};

const RegisterScreen = ({ navigation }) => {
  const [apiToken, setAPIToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPin, setUserPin] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [registrationFailed, setRegistrationFailed] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center",  backgroundColor: "rgb(153 27 27)"}}>
      <Text className="text-5xl self-center text-red-50 mt-3 p-3">
          <MaterialCommunityIcons 
                    name='account-edit' 
                    size={50} 
                />
          Sign Up</Text>
      <Text className="text-xl text-red-50 self-center mb-3 font-light mt-3">
        Don't have Canvas token?
      </Text>
      <Text className="text-lg text-red-50 self-center mb-3 font-light">Create here:</Text>

      <Text className="text-sm text-red-50 self-center font-extralight mb-3 italic">
        You have to scroll down to: "Ny tilgangsnøkkel" or "New key".
      </Text>
      <Pressable
        className="bg-red-50 rounded p-2 w-32"
        onPress={() =>
          Linking.openURL(
            "https://uia.instructure.com/profile/settings#access_tokens_holder",
          )
        }
      >
        <Text className="text-sm self-center font-light">Get API-token</Text>
      </Pressable>
      <View className="items-center mt-10">
        <TextInput
          className="text-sm w-64 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          onChangeText={(text) => setAPIToken(text)}
          placeholder="API - token"
          placeholderTextColor={"gray"}
        ></TextInput>
        <TextInput
          className="text-sm w-64 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          onChangeText={(text) => setUserName(text)}
          placeholder="Name"
          placeholderTextColor={"gray"}
        ></TextInput>
        <TextInput
          className="text-sm w-64 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          onChangeText={(text) => setUserEmail(text)}
          placeholder="E-mail"
          placeholderTextColor={"gray"}
        ></TextInput>
        <View>
          <TextInput
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={hidePassword}
            textContentType="password"
            className="text-sm w-32 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
            placeholder="PIN"
            placeholderTextColor="gray"
            onChangeText={setUserPin}
          />
          <Text className="text-xs text-red-50 italic self-center mb-3 font-light">
            Used for log-in (4 digits)
          </Text>

          <Pressable
            className="bg-transparent bg-red-50 rounded-md w-16 self-center mb-6"
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Text className="text-xs text-red-800 self-center font-light p-2 w-32 text-center">
              {hidePassword ? "Show PIN" : "Hide PIN"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          className="bg-red-50 rounded p-2 w-32"
          onPress={() =>
            handleRegistration(
              apiToken,
              userName,
              userEmail,
              userPin,
              navigation,
              registrationFailed,
              setRegistrationFailed,
            )
          }
        >
          <Text className="text-lg self-center text-red-800 font-light">Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
