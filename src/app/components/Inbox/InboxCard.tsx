import { Text, View, Button, Linking, Pressable } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";

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

/* 
{inboxItem["participants"].map((participant) => {
        <StyledText className="text-lg mb-5 self-center font-semibold">
          {participant.name}
        </StyledText>;
      })}
      */
const StyledView = styled(View);
const StyledText = styled(Text);

const InboxCard = ({ inboxItem }) => {
  const [showInboxDetails, setShowInboxDetails] = useState(false);

  return (
    <StyledView className="bg-red-50 p-4 m-3 w-72 items-center rounded-lg self-center">
      <StyledText className="text-lg text-red-800 mb-5 self-center font-light">
        Subject:
      </StyledText>
      <StyledText className="text-lg text-red-800 mb-5 self-center font-semibold">
        {inboxItem["subject"] ? inboxItem["subject"] : "No subject"}
      </StyledText>
      <StyledView className="mb-3">
        {inboxItem["participants"].map((participant, index) => (
          <StyledText key={index} className="text-xs text-red-800 self-center font-light">
            {index == 0
              ? `Sent by: ${participant.name}`
              : `To: ${participant.name}`}
          </StyledText>
        ))}
      </StyledView>

      {showInboxDetails ? (
        <>
          <StyledText className="text-red-800 text-sm font-light">
            {inboxItem["context_name"]}
          </StyledText>
          <StyledText className="text-red-800 text-sm font-light mb-3">
            {convertIsoToCustomFormat(inboxItem["last_authored_message_at"])}
          </StyledText>
          <StyledText className="text-red-800 mt-3 text-sm font-semibold">
            Sent message:
          </StyledText>
          <StyledText className="text-red-800 text-sm font-light">
            {inboxItem["last_authored_message"]}
          </StyledText>
          <StyledText className="text-red-800 mt-3 text-sm font-semibold">
            Last message:
          </StyledText>
          <StyledText className="text-red-800 text-sm font-light">
            {inboxItem["last_message"]}
          </StyledText>
        </>
      ) : (
        ""
      )}
       <Pressable
                className="bg-red-800 p-3 rounded-md mt-3"
                onPress={() => setShowInboxDetails(!showInboxDetails)}
                >
                <Text className="text-red-50">{!showInboxDetails ? "Show conversation" : "Hide conversation"}</Text>
          </Pressable>
    </StyledView>
  );
};

export default InboxCard;
