import { jsx as _jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
export async function render(url) {
    const appHtml = renderToString(_jsx(StaticRouter, { location: url, children: _jsx(App, {}) }));
    return { appHtml };
}
