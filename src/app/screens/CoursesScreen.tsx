import { ScrollView, Text, Button, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import CourseCard from "../components/Courses/CourseCard";
import { useCourses } from "../hooks/GET/getCourses";
import { useFavoriteCourses } from "../hooks/GET/getFavoriteCourses";
import { useWindowDimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";

const CoursesScreen = ({ navigation }) => {
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useCourses<Array<[]>>();
  const {
    favoriteCourses,
    loading: favoriteCoursesLoading,
    error: favoriteCoursesError,
  } = useFavoriteCourses<Array<[]>>();

  useEffect(() => {
    if (favoriteCourses) {
      favoriteCourses?.map((course) =>
        console.log("FAVORITE COURSE WHOLE OBJECT:", course),
      );
    }
  }, []);

  useEffect(() => {
    if (courses) {
      courses?.map((course) => console.log("COURSE:", course));
    }
  }, []);

  const { width } = useWindowDimensions();
  return (
    <ScrollView className="bg-red-800">
      <Text className="text-5xl self-center text-red-50 mt-3 p-3">
        <MaterialCommunityIcons
          name='heart'
          size={50}
        />
        Favorites 
      </Text>
      {favoriteCoursesLoading ? (
        <ActivityIndicator className="self-center" size="large" color="red" />
      ) : null}
      {favoriteCourses?.map((favoriteCourse) => (
        <CourseCard
          key={favoriteCourse["id"]}
          course={favoriteCourse}
        ></CourseCard>
      ))}
 <Text className="text-5xl self-center text-red-50 mt-3 p-3">
        <MaterialCommunityIcons
          name='archive'
          size={50}
        />
        All 
      </Text>      
      {coursesLoading ? (
        <ActivityIndicator className="self-center" size="large" color="white" />
      ) : null}
      {courses?.map((course) => (
        <CourseCard key={course["id"]} course={course}></CourseCard>
      ))}
    </ScrollView>
  );
};

export default CoursesScreen;
