import ytDlp from "yt-dlp-exec";

function isValidVideoUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export async function streamController(req, res) {
  const { url } = req.query;

  if (!url || !isValidVideoUrl(url)) {
    return res.status(400).json({
      message: "Invalid URL",
    });
  }

  try {
    const process = ytDlp(url, {
      format: "best",
      output: "-",
      noPlaylist: true,
    });

    res.setHeader("Content-Type", "video/mp4");

    process.stdout.pipe(res);

    process.stderr.on("data", (data) => {
      console.log("yt-dlp:", data.toString());
    });

    process.on("close", (code) => {
      console.log("yt-dlp process exited:", code);
    });

    process.on("error", (error) => {
      console.error("yt-dlp process error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          message: "Failed to download video",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Stream error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to stream video",
        error: error.message,
      });
    }
  }
}

export async function infoController(req, res) {
  const { url } = req.query;

  if (!url || !isValidVideoUrl(url)) {
    return res.status(400).json({
      message: "Invalid URL",
    });
  }

  try {
    const process = ytDlp(url, {
      dumpSingleJson: true,
      noPlaylist: true,
      skipDownload: true,
    });

    let data = "";

    process.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    process.stderr.on("data", (chunk) => {
      console.log("yt-dlp:", chunk.toString());
    });

    process.on("close", (code) => {
      try {
        if (code !== 0) {
          return res.status(500).json({
            message: "Failed to fetch video information",
          });
        }

        const json = JSON.parse(data);

        return res.status(200).json({
          title: json.title,
          thumbnail: json.thumbnail,
        });
      } catch (error) {
        console.error("JSON parse error:", error);

        return res.status(500).json({
          message: "Failed to parse video information",
          error: error.message,
        });
      }
    });

    process.on("error", (error) => {
      console.error("yt-dlp error:", error);

      if (!res.headersSent) {
        res.status(500).json({
          message: "yt-dlp failed",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Info error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to fetch video info",
        error: error.message,
      });
    }
  }
}