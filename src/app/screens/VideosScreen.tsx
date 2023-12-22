import {
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Pressable,
  View,
} from "react-native";
import React, { useState } from "react";
import { useYoutubeVideos } from "../hooks/GET/getYoutubeVideos";
import VideoCard from "../components/Video/VideoCard";
import { BarIndicator } from "react-native-indicators";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const VideosScreen = () => {
  const {
    youtubeVideos,
    fetchVideos,
    loading: youtubeVideosLoading,
    error: youtubeVideosError,
  } = useYoutubeVideos<Array<[]>>();

  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <ScrollView className="bg-red-800">
     <View className="p-3">
       <Text className="text-5xl self-center text-red-50 mt-3 p-3">
            <MaterialCommunityIcons 
                    name='youtube-tv' 
                    size={50} 
                /> CanvasTube</Text>
      </View>
      {!youtubeVideos ? (
        <>
          <Text className="self-center text-xl m-2 font-light italic text-red-50">
            What do you want to learn about today?
          </Text>
        </>
      ) : null}

      <TextInput
        className="self-center p-5 m-3 text-center border-b-2 border-red-200 text-lg text-red-50 w-96 bg-red-800"
        placeholderTextColor="white"
        placeholder="How to get started with React Native..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Pressable
        className="bg-red-50 rounded p-2 w-32 self-center mb-3"
        onPress={() => fetchVideos(searchQuery)}
      >
        <Text className="text-xl self-center text-red-800 font-light">Search</Text>
      </Pressable>
      {youtubeVideos ? (
        <Text className="self-center text-xl m-2 font-semibold text-red-50 italic">
          Search results:
        </Text>
      ) : null}
      {youtubeVideosLoading ? <BarIndicator size="20" color="white" /> : null}
      {youtubeVideos
        ? youtubeVideos["items"]?.map((video) =>
            video?.["snippet"]?.["title"] ? (
              <VideoCard video={video}></VideoCard>
            ) : (
              <ActivityIndicator
                key={video.id}
                className="self-center"
                size="large"
                color="red"
              />
            ),
          )
        : null}
    </ScrollView>
  );
};

export default VideosScreen;
