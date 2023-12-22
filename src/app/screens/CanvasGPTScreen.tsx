import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, Button, Alert, Pressable, View } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { useGPTAnswer } from "../hooks/GET/getGPTAnswer";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const CanvasGPTScreen = ({ navigation }) => {
  const [gptQuery, setGptQuery] = useState("");
  const {
    fetchGPTAnswer,
    gptAnswer,
    loading: gptAnswerLoading,
    error: gptAnswerError,
  } = useGPTAnswer();

  const [asked, setAsked] = useState(false);
  const [gptAnswerContent, setGptAnswerContent] = useState(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const isQueryEmpty = gptQuery.trim() === "";

  const handleAsk = () => {
    if (!isQueryEmpty) {
      setGptAnswerContent(null);
      setAsked(true);
      setRequestInProgress(true);
      fetchGPTAnswer(gptQuery);
    } else {
      Alert.alert("Please write something in the field");
    }
  };

  useEffect(() => {
    if (!gptAnswerLoading && gptAnswer) {
      setRequestInProgress(false);
    }
  }, [gptAnswerLoading, gptAnswer]);

  const renderLoading = () => (
    <>
      <Text className="text-lg self-center font-semibold mb-3 text-red-50">
        Getting your answer...
      </Text>
      <BarIndicator size="20" color="white" />
    </>
  );

  const renderAnswer = () => (
    <>
      <ScrollView className="p-5 bg-red-50">
      <Text className="self-center text-xl font-semibold text-red-800 mb-3">Answer:</Text>
        <Text className="self-center text-sm font-light text-red-800">{gptAnswer}</Text>
      </ScrollView>
    </>
  );

  const renderError = () => (
    <>
      <Text className="text-lg self-center text-red-50 font-semibold mb-3">
        Something went wrong....
      </Text>
      <BarIndicator size="20" color="black" />
    </>
  );

  const renderWaiting = () => (
    <>
      <Text className="text-lg self-center text-red-50 font-semibold mb-3">
      CanvasGPT is listening...
      </Text>
      <BarIndicator size="20" color="white" />
    </>
  );

  return (
    <ScrollView className="bg-red-800">
      <View className="p-3">
       <Text className="text-5xl self-center text-red-50 mt-3 p-3">
            <MaterialCommunityIcons 
                    name='brain' 
                    size={50} 
                /> CanvasGPT</Text>
      </View>
      <TextInput
        className="text-lg text-center self-center font-light w-full m-3 border-b-2 border-red-50 rounded-sm p-3 text-red-50"
        placeholder="Ask for anything.."
        placeholderTextColor={"white"}
        value={gptQuery}
        multiline={true}
        onChangeText={setGptQuery}
      />
      <Pressable
          className="bg-white self-center p-3 w-64 m-2 rounded-md"
          onPress={handleAsk}         >
          <Text className="text-xl self-center text-red-800">
            Ask</Text>
        </Pressable>
      <ScrollView className="mt-5">
        {asked
          ? requestInProgress
            ? renderLoading()
            : gptAnswer
            ? renderAnswer()
            : gptAnswerError
            ? renderError()
            : null
          : renderWaiting()}
      </ScrollView>
    </ScrollView>
  );
};

export default CanvasGPTScreen;
