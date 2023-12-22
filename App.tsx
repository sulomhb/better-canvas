import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesScreen from "./src/app/screens/CoursesScreen";
import AssignmentsScreen from "./src/app/screens/AssignmentsScreen";
import HomeScreen from "./src/app/screens/HomeScreen";
import InboxScreen from "./src/app/screens/InboxScreen";
import VideosScreen from "./src/app/screens/VideosScreen";
import RegisterScreen from "./src/app/screens/Authorization/RegisterScreen";
import ModulesScreen from "./src/app/screens/ModulesScreen";
import GroupsScreen from "./src/app/screens/GroupsScreen";
import CanvasGPTScreen from "./src/app/screens/CanvasGPTScreen";
import LoginScreen from "./src/app/screens/Authorization/LoginScreen";
import UpdatePinCodeScreen from "./src/app/screens/Authorization/UpdatePinCodeScreen";
import ForgotPasswordScreen from "./src/app/screens/Authorization/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Sign In" 
        component={LoginScreen}
        options={{ headerBackButtonMenuEnabled: false }} 
        />
        <Stack.Screen name="Sign Up" component={RegisterScreen}
        options={{ headerBackButtonMenuEnabled: false }}
        />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />

        <Stack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{ headerBackButtonMenuEnabled: false }}
        />
        <Stack.Screen name="Courses" component={CoursesScreen} />
        <Stack.Screen name="Assignments" component={AssignmentsScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Modules" component={ModulesScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="CanvasTube" component={VideosScreen} />
        <Stack.Screen name="CanvasGPT" component={CanvasGPTScreen} />
        <Stack.Screen name="Update PIN" component={UpdatePinCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
