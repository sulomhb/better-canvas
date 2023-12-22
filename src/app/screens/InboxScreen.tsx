import {
  View,
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useInbox } from "../hooks/GET/getInbox";
import InboxCard from "../components/Inbox/InboxCard";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const InboxScreen = ({ navigation }) => {
  const {
    inbox,
    loading: inboxLoading,
    error: inboxError,
  } = useInbox<Array<[]>>();

  useEffect(() => {
    console.log(inbox);
  }, []);

  return (
    <View>
      <ScrollView className="bg-red-800">
      <Text className="text-5xl self-center text-red-50 mt-3 p-3">
          <MaterialCommunityIcons 
                    name='inbox' 
                    size={50} 
                />
          Inbox</Text>
        {inbox?.map((inboxItem) => (
          <InboxCard key={inboxItem["id"]} inboxItem={inboxItem}></InboxCard>
        ))}
        {inboxLoading ? (
          <ActivityIndicator className="self-center" size="large" color="white" />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default InboxScreen;
