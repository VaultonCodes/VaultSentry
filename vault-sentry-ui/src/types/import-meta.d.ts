/// <reference types="vite/client" />

declare module '@vite/client' {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_API_BASE_URL: string;
    // 添加其他环境变量...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob: <T = Record<string, unknown>>(
      pattern: string,
      options?: {
        eager?: boolean;
        as?: string;
        query?: string;
      }
    ) => Record<string, { default: T }>;
    globEager: <T = Record<string, unknown>>(
      pattern: string,
      options?: {
        as?: string;
        query?: string;
      }
    ) => Record<string, { default: T }>;
  }
}

export {};
