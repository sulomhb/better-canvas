// -- REACT COMPONENTS -- //
import { Video } from "expo-av";
import * as React from "react";
import { useCallback, useState } from "react";
import { View, StyleSheet, Button, Text, Pressable, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

function getVideoAuthor(video: Object) {
  return video?.["snippet"]["channelTitle"];
}

function getVideoTitle(video: Object) {
  return video?.["snippet"]["title"];
}

function getVideoId(video: Object) {
  return video?.["id"]["videoId"];
}

interface VideoCardProps {
  video: Object;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View className="rounded bg-red-50 m-1 p-3">
      <Text className="text-sm text-red-800 self-center font-semibold mb-1">
        {getVideoTitle(video)}
      </Text>
      <Text className="text-sm text-red-800 self-center font-semibold mb-1">
        By: {getVideoAuthor(video)}
      </Text>
      <YoutubePlayer
        height={230}
        play={playing}
        videoId={getVideoId(video)}
        onChangeState={onStateChange}
      />
      <Pressable
        className="bg-red-800 mb-6 rounded p-2 w-32 self-center"
        onPress={togglePlaying}
      >
        <Text className="text-xl self-center font-light text-red-50">
          {playing ? "Pause" : "Play"}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
