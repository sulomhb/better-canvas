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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CURRENT_USER_EMAIL, getCurrentUserEmail } from "../../../../env";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const handleUpdatePin = async (userEmail, newPin) => {
  try {
    if (await showAlert("Are you sure you want to update the PIN?")) {
      const response = await axios.patch(
        "https://bettercanvas-api.onrender.com/update-pin",
        {
          email: userEmail,
          newPinCode: newPin,
        },
      );

      if (response.status === 200) {
        // PIN has been updated successfully
        Alert.alert("PIN has been updated!");
      } else {
        console.log("Update failed");
      }
    }
  } catch (error) {
    // Handle request error
    console.error("An error occurred during the update of PIN:", error);
  }
};

const showAlert = async (message) => {
  return new Promise((resolve) => {
    Alert.alert(
      "Confirmation",
      message,
      [
        { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
        { text: "OK", onPress: () => resolve(true) },
      ],
      { cancelable: false },
    );
  });
};

const UpdatePinCodeScreen = ({ navigation, email: string }) => {
  const [userEmail, setUserEmail] = useState<string>(getCurrentUserEmail());
  const [newPin, setNewPin] = useState<string>("");
  const [hidePIN, setHidePIN] = useState<boolean>(true);

  return (
    <ScrollView
      className="bg-red-800"
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    ><Text className="text-5xl self-center text-red-50 mt-3 p-3">
    <MaterialCommunityIcons 
              name='form-textbox-password' 
              size={50} 
          />
    Update PIN</Text>
      <View>
        <Text className="text-xl text-red-50 mb-4 font-light">{userEmail}</Text>
        <TextInput
          maxLength={4}
          keyboardType="numeric"
          secureTextEntry={hidePIN}
          textContentType="password"
          className="text-sm w-32 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          placeholder="NEW PIN"
          placeholderTextColor="gray"
          onChangeText={setNewPin}
        />
        <Pressable
          className="bg-red-50 w-32 rounded p-2 self-center"
          onPress={() => handleUpdatePin(userEmail, newPin)}
        >
          <Text className="text-xs text-red-800 self-center font-light p-2 w-32 text-center">
            Update PIN
          </Text>
        </Pressable>
        <Pressable
          className="bg-transparent mt-3 w-16 self-center"
          onPress={() => setHidePIN(!hidePIN)}
        >
          <Text className="text-xs text-red-50 self-center font-light p-2 w-32 text-center">
            {hidePIN ? "Show PIN" : "Hide PIN"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default UpdatePinCodeScreen;

const styles = StyleSheet.create({});
