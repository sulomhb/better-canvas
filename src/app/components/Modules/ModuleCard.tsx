import { Text, View, Button, Linking, Pressable } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

function convertIsoToCustomFormat(isoDateTime) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(isoDateTime);

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ModuleCard({ module }: { module: Object }) {
  const [showModuleDetails, setShowModuleDetails] = useState(false);

  return (
    <StyledView className="bg-red-50 p-4 m-3 w-72 items-center rounded-lg self-center">
      <StyledText className="text-lg text-red-800 mb-5 self-center font-semibold">
        {module["position"]}. {module["name"]}
      </StyledText>
      {showModuleDetails ? (
        <>
          <StyledText className="text-red-800 text-sm font-semibold">
            ID: {module["id"]}
          </StyledText>
          <StyledText className="text-red-800 text-sm font-semibold">
            State: {module["state"]}
          </StyledText>
          <StyledText className="text-red-800 text-sm font-semibold">
            Completed: {convertIsoToCustomFormat(module["completed_at"])}
          </StyledText>
          <Pressable
          className="bg-red-800 p-3 w-32 m-2 rounded-md"
          onPress={() =>
            Linking.openURL(
              `https://uia.instructure.com/Modules/${module["items_url"]}`,
            )
          }
        >
          <Text className="text-md self-center text-red-50">Description</Text>
        </Pressable>
        </>
      ) : (
        ""
      )}
        <Pressable
          className="bg-red-50 w-64 rounded-md"
          onPress={() => setShowModuleDetails(!showModuleDetails)}
        >
          <Text className="text-md self-center text-red-800">
            {!showModuleDetails ? "Show module details" : "Hide module details"}</Text>
        </Pressable>
    </StyledView>
  );
}
