interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_READ_ONLY_USER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
