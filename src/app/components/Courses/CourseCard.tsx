import { Text, View, Button, Linking, Pressable } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function CourseCard({ course }: { course: Object }) {
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  return (
    <StyledView className="bg-red-50 p-4 m-3 w-72 items-center rounded-lg self-center">
      <StyledText className="text-lg text-red-800 mb-5 self-center font-semibold">
        {course["name"]}
      </StyledText>
      {showCourseDetails ? (
        <>
          <StyledText className="text-red-800  text-sm font-semibold">
            Course ID: {course["id"]}
          </StyledText>
          <StyledText className="text-red-800 text-sm font-semibold">
            {course["course_code"]}
          </StyledText>
          <Pressable
                className="bg-red-800 p-3 rounded-md mt-3"
                onPress={() => Linking.openURL(course["calendar"]["ics"])}
                >
                <Text className="text-red-50">Add to calendar</Text>
          </Pressable>
          <Pressable
                className="bg-red-800 p-3 rounded-md mt-3"
                onPress={() =>
                  Linking.openURL(
                    `https://uia.instructure.com/courses/${course["id"]}`,
                  )
                }                >
                <Text className="text-red-50">Description</Text>
          </Pressable>

        </>
      ) : (
        ""
      )}
          <Pressable
          className="bg-red-50 w-64 mt-3 rounded-md"
          onPress={() => setShowCourseDetails(!showCourseDetails)}
          >
          <Text className="text-md self-center text-red-800">
            {!showCourseDetails ? "Show course details" : "Hide course details"}</Text>
        </Pressable>
    </StyledView>
  );
}
