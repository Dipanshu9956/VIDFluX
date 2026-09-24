import { useContext } from "react";
import VideoContext from "../stream.context.jsx";
import { getVideoInfo,downloadVideo } from "../service/video.api.js";

export const useVideo = () => {
  const { video, loading, error, setError, setLoading, setVideo } =
    useContext(VideoContext);

  const fetchVideoInfo = async (videoUrl) => {
    if (!videoUrl) {
      setError("Please enter a valid URL");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await getVideoInfo(videoUrl);
      setVideo(data);
    } catch {
      setError("Failed to fetch video");
    } finally {
      setLoading(false);
    }
  };
  return {
    video,
    loading,
    error,
    fetchVideoInfo,
    downloadVideo,
  };
};
