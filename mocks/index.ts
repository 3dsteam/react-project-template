import { setupWorker as setupBrowserWorker } from "msw/browser";
import handlers from "./handlers.ts";

export const browserWorker = setupBrowserWorker(...handlers);
