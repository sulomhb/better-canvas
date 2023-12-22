import {
  View,
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useWindowDimensions } from "react-native";
import React from "react";
import { useGroups } from "../hooks/GET/getGroups";
import GroupCard from "../components/Groups/GroupCard";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const ModulesScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();

  const {
    groups,
    loading: groupsLoading,
    error: groupsError,
  } = useGroups<Array<[]>>();
  console.log("Groups:", groups);
  return (
    <View>
      <ScrollView className="bg-red-800">
      <Text className="text-5xl self-center text-red-50 mt-3 p-3">
          <MaterialCommunityIcons 
                    name='account-group' 
                    size={50} 
                />
          Groups</Text>
        {groups?.map((group) => (
          <GroupCard key={groups["id"]} group={group}></GroupCard>
        ))}
        {groupsLoading ? (
          <ActivityIndicator className="self-center" size="large" color="white" />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ModulesScreen;
