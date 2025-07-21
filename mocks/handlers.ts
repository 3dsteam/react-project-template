import type { HttpHandler } from "msw";
import { handlers as SignInHandlers } from "./handlers/sign-in.ts";

export const handlers: HttpHandler[] = [...SignInHandlers];
