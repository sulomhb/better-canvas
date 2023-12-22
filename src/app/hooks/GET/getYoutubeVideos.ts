import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { YOUTUBE_API_KEY } from "../../../../env";

export const useYoutubeVideos = <T>() => {
  const [youtubeVideos, setYoutubeVideos] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = YOUTUBE_API_KEY; // Replace with your YouTube Data API key
  //const query = 'programming tutorials'; // Change the query as needed
  const maxResults = 10; // Adjust the number of results as needed
  const fetchVideos = async (searchQuery: string) => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchQuery}&maxResults=${maxResults}`;
      const response: AxiosResponse<T> = await axios.get(url);
      setYoutubeVideos(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setLoading(false);
    }
  };

  return { youtubeVideos, fetchVideos, loading, error };
};
