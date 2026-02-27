// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROUTER_MODE: 'hash' | 'history';
  // 可以继续添加其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
