declare module "*.css";
/// <reference types="vite/client" />

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";

interface ImportMetaEnv {
  readonly VITE_BACKEND_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}