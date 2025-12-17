// Removed reference to vite/client to fix "Cannot find type definition file" error.
// The types might be missing from the local environment's current search path.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}

// Removed "declare var process" to fix "Cannot redeclare block-scoped variable 'process'".
// TypeScript already recognizes the global 'process' variable if NodeJS types are present; 
// otherwise, we rely on the ProcessEnv augmentation for property access.
