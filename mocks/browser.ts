import { setupWorker as setupBrowserWorker } from "msw/browser";
import handlers from "./handlers.ts";

export default setupBrowserWorker(...handlers);
