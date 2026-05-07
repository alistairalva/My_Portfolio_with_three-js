import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = (...parts) => path.resolve(__dirname, ...parts);

const isProd = process.env.NODE_ENV === "production";
const app = express();

let vite;
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

app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template;
    let render;

    if (!isProd) {
      template = await fs.readFile(resolvePath("index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = await fs.readFile(
        resolvePath("dist/client/index.html"),
        "utf-8",
      );
      render = (await import(resolvePath("dist/server/entry-server.js")))
        .render;
    }

    const { appHtml } = await render(url);
    const html = template.replace("<!--app-html-->", appHtml);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    vite?.ssrFixStacktrace(error);
    next(error);
  }
});

const port = Number(process.env.PORT) || 5173;
app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`);
});
