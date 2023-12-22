import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import {
  CANVAS_API_TOKEN,
  setCanvasAPIToken,
  setCurrentUserEmail,
} from "../../../../env";

const handleAuthentication = async (
  userEmail: string,
  userPin: string,
  navigation,
) => {
  try {
    const response = await axios.post(
      "https://bettercanvas-api.onrender.com/authenticate",
      {
        email: userEmail,
        pinCode: userPin,
      },
    );

    let apiToken = response.data.user.apiToken;
    let currentUserEmail = response.data.user.email;

    // Check if the registration was successful
    if (response.status == 200) {
      // Navigate to the dashboard or perform any other desired action
      setCanvasAPIToken(apiToken);
      setCurrentUserEmail(currentUserEmail);
      navigation.replace("Dashboard");
    } else {
      // Handle registration failure
      console.log("Registration failed");
    }
  } catch (error) {
    // Handle request error
    Alert.alert("Please check your credentials!")
    console.log("An error occurred during registration:", error);
  }
};

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPin, setUserPin] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", backgroundColor: "#990011" }}>
        <View className="bg-white p-4 w-full">
                <Text className="text-4xl p-3 self-center text-red-800">🎒betterCanvas</Text>
              </View>
      <View className="items-center mt-10">
        <Text className="text-3xl text-red-50 mb-3">Sign In</Text>
        <TextInput
          className="text-sm w-72 rounded text-center p-3 border-red-50 bg-red-50 self-center font-light mb-4"
          onChangeText={(text) => setUserEmail(text)}
          placeholder="E-mail"
          placeholderTextColor={"gray"}
        ></TextInput>
        <View>
          <View>
          <View style={styles.container}> 
          <TextInput
            maxLength={4}
            keyboardType="numeric"
            secureTextEntry={hidePassword}
            textContentType="password"
            className="p-3"
            placeholder="PIN"
            placeholderTextColor="gray"
            onChangeText={setUserPin}
          />
           <MaterialCommunityIcons 
                    name={!hidePassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={() => setHidePassword(!hidePassword)} 
                /> 
              </View>
          </View>
          <Text className="text-xs italic self-center mt-1 text-red-50 font-light">
            (4 digits)
          </Text>
          <Pressable
            className="bg-transparent w-16 self-center mt-5 mb-10"
            onPress={() => navigation.navigate("Forgot")}
          >
            <View className="rounded self-center bg-white p-2 w-20 items-center">
              <Text className="text-xs text-red-800">
              Forgot PIN?
            </Text>
            </View>
            
          </Pressable>

        </View>

        {/* Sign In */}
        <Pressable
          className="bg-red-50 rounded p-2 w-32"
          onPress={() => handleAuthentication(userEmail, userPin, navigation)}
        >
          <Text className="text-lg self-center text-red-800 font-light">Sign In</Text>
        </Pressable>
        
        {/* Sign Up */}
        <Text className="text-lg self-center font-light mt-10 mb-3 text-red-50">Not registered?</Text>
        <Pressable
          className="bg-red-50 rounded p-2 w-32"
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text className="text-lg self-center font-light text-red-800">Sign Up</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({ 
   mainContainer: { 
        marginTop: 70, 
        margin: 40, 
    }, 
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f3f3f3', 
        borderRadius: 8, 
        paddingHorizontal: 14, 
    }, 
    input: { 
        flex: 1, 
        color: '#333', 
        paddingVertical: 10, 
        paddingRight: 10, 
        fontSize: 16, 
    }, 
    icon: { 
        marginLeft: 10, 
    }, 
    heading: { 
        alignItems: 'center', 
        fontSize: 20, 
        color: 'green', 
        marginBottom: 20, 
    }, 
}); 