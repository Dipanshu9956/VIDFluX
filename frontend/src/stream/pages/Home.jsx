import { useState } from "react";
import { useVideo } from "../hooks/useVideo.js";

function Home() {
  const [url, setUrl] = useState("");

  const { video, loading, error, fetchVideoInfo, downloadVideo } = useVideo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-[350px] text-center">
        <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          🚀 VidFlux
        </h1>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Paste YouTube link..."
            className="flex-1 px-4 py-2 rounded-xl 
             bg-white/10 backdrop-blur-md 
             border border-white/20 
             text-white placeholder-gray-300 
             outline-none 
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition-all duration-300"
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={() => fetchVideoInfo(url)}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-white text-nowrap 
             bg-gradient-to-r from-blue-500 to-indigo-600 
             hover:from-indigo-600 hover:to-blue-500 
             transition-all duration-300 shadow-md hover:shadow-lg 
             disabled:opacity-50"
          >
            Get download Link
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-gray-300 animate-pulse">
            ⏳ Fetching video...
          </p>
        )}

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {video && (
          <div className="mt-6">
            <img
              src={video.data}
              alt="thumbnail"
              className="rounded-xl shadow-lg"
            />

            <h3 className="mt-3 text-sm font-semibold">{video.title}</h3>

            <button
              onClick={() => {
                downloadVideo(url);
                console.log(video);
              }}
              className="mt-4 w-full bg-green-500 py-2 rounded-lg hover:bg-green-600 transition"
            >
              ⬇ Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
