import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { styled } from "nativewind";

// Importing Screen components - make sure these paths are correct
import AnnouncementsScreen from "../../screens/ModulesScreen";
import AssignmentsScreen from "../../screens/AssignmentsScreen";
import CoursesScreen from "../../screens/CoursesScreen";
import InboxScreen from "../../screens/InboxScreen";
import HomeScreen from "../../screens/HomeScreen";

const StyledView = styled(View);
const StyledText = styled(Text);

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <StyledView className="text-sm bg-gray-600">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
          <Stack.Screen name="Assignments" component={AssignmentsScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
          <Stack.Screen name="Inbox" component={InboxScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StyledView>
  );
};

export default Navigation;
