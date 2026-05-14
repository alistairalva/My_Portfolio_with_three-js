import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { createServer as createViteServer, type ViteDevServer } from "vite";

type HeroAssets = {
  desktopPath: string;
  mobilePath: string;
};

type RenderResult = {
  appHtml: string;
};

type RenderFn = (url: string) => Promise<RenderResult>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = (...parts: string[]): string =>
  path.resolve(__dirname, ...parts);
const HERO_DESKTOP_DEV_PATH = "/src/assets/herobg.webp";
const HERO_MOBILE_DEV_PATH = "/src/assets/herobg-mobile.webp";

const isProd = process.env.NODE_ENV === "production";
const app = express();

let cachedProdHeroAssets: HeroAssets | null = null;

const isHomeRoute = (url: string): boolean => {
  const pathname = new URL(url, "http://localhost").pathname;
  return pathname === "/";
};

const buildHeroPreloadTags = ({
  desktopPath,
  mobilePath,
}: HeroAssets): string => {
  return [
    `<link rel="preload" as="image" href="${mobilePath}" media="(max-width: 768px)" type="image/webp" fetchpriority="high" data-hero-lcp="mobile" />`,
    `<link rel="preload" as="image" href="${desktopPath}" media="(min-width: 769px)" type="image/webp" fetchpriority="high" data-hero-lcp="desktop" />`,
  ].join("\n    ");
};

const injectHeadTags = (template: string, headTags: string): string => {
  if (!headTags || template.includes("data-hero-lcp")) {
    return template;
  }

  return template.replace("</head>", `    ${headTags}\n  </head>`);
};

const resolveProdHeroAssets = async (): Promise<HeroAssets> => {
  if (cachedProdHeroAssets) {
    return cachedProdHeroAssets;
  }

  const assetsDir = resolvePath("dist/client/assets");

  try {
    const files = await fs.readdir(assetsDir);
    const desktopFile = files.find(
      (fileName) =>
        fileName.startsWith("herobg-") &&
        !fileName.startsWith("herobg-mobile-") &&
        fileName.endsWith(".webp"),
    );
    const mobileFile = files.find(
      (fileName) =>
        fileName.startsWith("herobg-mobile-") && fileName.endsWith(".webp"),
    );

    cachedProdHeroAssets = {
      desktopPath: desktopFile
        ? `/assets/${desktopFile}`
        : HERO_DESKTOP_DEV_PATH,
      mobilePath: mobileFile ? `/assets/${mobileFile}` : HERO_MOBILE_DEV_PATH,
    };
  } catch {
    cachedProdHeroAssets = {
      desktopPath: HERO_DESKTOP_DEV_PATH,
      mobilePath: HERO_MOBILE_DEV_PATH,
    };
  }

  return cachedProdHeroAssets;
};

let vite: ViteDevServer | undefined;
if (!isProd) {
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  app.use(
    express.static(resolvePath("dist/client"), {
      index: false,
    }),
  );
}

app.use("*", async (req: Request, res: Response, next: NextFunction) => {
  const url = req.originalUrl;

  try {
    let template: string;
    let render: RenderFn;

    if (!isProd) {
      const viteServer = vite;
      if (!viteServer) {
        throw new Error("Vite dev server is not initialized");
      }

      template = await fs.readFile(resolvePath("index.html"), "utf-8");
      template = await viteServer.transformIndexHtml(url, template);
      render = (await viteServer.ssrLoadModule("/src/entry-server.tsx"))
        .render as RenderFn;
    } else {
      template = await fs.readFile(
        resolvePath("dist/client/index.html"),
        "utf-8",
      );
      render = (await import(resolvePath("dist/server/entry-server.js")))
        .render as RenderFn;
    }

    const { appHtml } = await render(url);

    let heroPreloadTags = "";
    if (isHomeRoute(url)) {
      const heroAssets = isProd
        ? await resolveProdHeroAssets()
        : {
            desktopPath: HERO_DESKTOP_DEV_PATH,
            mobilePath: HERO_MOBILE_DEV_PATH,
          };
      heroPreloadTags = buildHeroPreloadTags(heroAssets);
    }

    const html = injectHeadTags(
      template.replace("<!--app-html-->", appHtml),
      heroPreloadTags,
    );

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error: unknown) {
    if (error instanceof Error) {
      vite?.ssrFixStacktrace(error);
    }
    next(error);
  }
});

const port: number = Number(process.env.PORT) || 5173;
app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`);
});
