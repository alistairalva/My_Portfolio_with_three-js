import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();

const jobs = [
  {
    input: "src/assets/herobg.png",
    outputs: [
      { output: "src/assets/herobg.webp", width: 1600, quality: 72 },
      { output: "src/assets/herobg-mobile.webp", width: 640, quality: 62 },
    ],
  },
  {
    input: "src/assets/emergencyapp.png",
    outputs: [
      { output: "src/assets/emergencyapp.webp", width: 1200, quality: 72 },
      {
        output: "src/assets/emergencyapp-mobile.webp",
        width: 640,
        quality: 64,
      },
    ],
  },
  {
    input: "src/assets/restaurant.png",
    outputs: [
      { output: "src/assets/restaurant.webp", width: 1200, quality: 72 },
      { output: "src/assets/restaurant-mobile.webp", width: 640, quality: 64 },
    ],
  },
  {
    input: "src/assets/youtubecharts.png",
    outputs: [
      { output: "src/assets/youtubecharts.webp", width: 1200, quality: 72 },
      {
        output: "src/assets/youtubecharts-mobile.webp",
        width: 640,
        quality: 64,
      },
    ],
  },
  {
    input: "src/assets/company/goodLife.png",
    outputs: [
      { output: "src/assets/company/goodLife.webp", width: 640, quality: 68 },
    ],
  },
];

const formatKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

const run = async () => {
  for (const job of jobs) {
    const inputPath = path.join(root, job.input);

    for (const item of job.outputs) {
      const outputPath = path.join(root, item.output);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      await sharp(inputPath)
        .resize({ width: item.width, withoutEnlargement: true })
        .webp({ quality: item.quality, effort: 5 })
        .toFile(outputPath);

      const [inputStat, outputStat] = await Promise.all([
        fs.stat(inputPath),
        fs.stat(outputPath),
      ]);

      const savings =
        inputStat.size > 0
          ? (
              ((inputStat.size - outputStat.size) / inputStat.size) *
              100
            ).toFixed(1)
          : "0.0";

      console.log(
        `${job.input} -> ${item.output} (${formatKB(inputStat.size)} -> ${formatKB(outputStat.size)}, ${savings}% smaller)`,
      );
    }
  }
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
