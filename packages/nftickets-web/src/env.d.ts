/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any }) => Promise<any>;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    providers?: any[];
    selectedAddress?: string;
    networkVersion: string;
  };
} 