import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

type RenderResult = {
  appHtml: string;
};

export async function render(url: string): Promise<RenderResult> {
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

  return { appHtml };
}
