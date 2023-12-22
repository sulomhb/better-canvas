import React, { useEffect, useState } from "react";

// -- REACT COMPONENTS -- //
import { Text, View } from "react-native";

function formatDate(originalDate) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObj = new Date(originalDate);

  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");

  return `${dayOfWeek}, ${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}

function calculateCountdown(targetDate) {
  const targetTime = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  const oneMinute = 1000 * 60;

  const days = Math.floor(difference / oneDay);
  const hours = Math.floor((difference % oneDay) / oneHour);
  const minutes = Math.floor((difference % oneHour) / oneMinute);
  const seconds = Math.floor((difference % oneMinute) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function AssignmentDueDate({
  assignment,
}: {
  assignment: Object;
}) {
  const [countdown, setCountdown] = useState(
    calculateCountdown(assignment["due_at"]),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdown = calculateCountdown(assignment["due_at"]);
      setCountdown(updatedCountdown);
    }, 1000);

    return () => clearInterval(interval);
  }, [assignment["due_at"]]);

  return (
    <View>
      <Text className="text-lg mb-5 text-red-800 self-center font-semibold">Due date:</Text>
      <Text className="text-lg mb-5 self-center font-semibold  text-red-800">
        {formatDate(assignment["due_at"])}
      </Text>
      {countdown.hours > 0 && (
        <>
          <Text className="text-lg mb-5 self-center font-semibold text-red-800">
            Countdown:{" "}
          </Text>
          <Text className="text-lg mb-5 self-center font-semibold  text-red-800">
            {countdown.days} days, {countdown.hours} hours, {countdown.minutes}{" "}
            minutes, {countdown.seconds} seconds
          </Text>
        </>
      )}
    </View>
  );
}
