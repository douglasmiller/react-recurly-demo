"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage";

type ConfigurationProps = {
  children: ReactNode;
}

type ConfigurationContext = {
  api: string;
  setApi: Dispatch<string>;
  rjs: string;
  setRjs: Dispatch<SetStateAction<string>>;
  publicKey: string;
  setPublicKey: Dispatch<SetStateAction<string>>;
  braintreeAuth: string;
  setBraintreeAuth: Dispatch<SetStateAction<string>>;
  envConfig: EnvironmentConfigurations;
  setEnvPublicKey: Dispatch<string>;
}

type EnvironmentConfiguration = {
  publicKey: string;
  braintreeAuth: string;
}

type EnvironmentConfigurations = {
  [key: string]: EnvironmentConfiguration;
}

const DEFAULT_API = "https://api.recurly.com/js/v1";
const DEFAULT_RJS = "https://js.recurly.com/v4/recurly.js";

const DEFAULT_ENV_CONFIG = {
  publicKey: '',
  braintreeAuth: '',
} as EnvironmentConfiguration;

const DEFAULT_ENV_CONFIGS = {
  [DEFAULT_API]: DEFAULT_ENV_CONFIG,
} as EnvironmentConfigurations;

export const ConfigurationContext = createContext<ConfigurationContext | null>(null);

export default function ConfigurationContextProvider({ children }: ConfigurationProps) {
  const [api, setApi] = useLocalStorage("recurly-api", DEFAULT_API);
  const [rjs, setRjs] = useLocalStorage("recurly-js", DEFAULT_RJS);
  const [publicKey, setPublicKey] = useLocalStorage("public-key", "");
  const [braintreeAuth, setBraintreeAuth] = useLocalStorage("braintree-auth", "");

  const [envConfig, setEnvConfig] = useLocalStorage<EnvironmentConfigurations>("env-configs", DEFAULT_ENV_CONFIGS);

  const setApiWrapper = (newApi: string) => {
    setEnvConfig((currentEnv: EnvironmentConfigurations) => {
      return {
        ...currentEnv,
        [newApi]: { 
          ...DEFAULT_ENV_CONFIG,
          ...currentEnv[newApi],
        },
      };
    });
    setApi(newApi);
  }

  const setEnvPublicKey = (value: string) => {
    setEnvConfig((currentEnv: EnvironmentConfigurations) => {
      return {
        ...currentEnv,
        [api]: { 
          ...DEFAULT_ENV_CONFIG,
          ...currentEnv[api],
          publicKey: value,
        },
      };
    });
  };

  return (
    <ConfigurationContext.Provider value={{
      api,
      setApi: setApiWrapper,
      rjs,
      setRjs,
      publicKey,
      setPublicKey,
      braintreeAuth,
      setBraintreeAuth,

      envConfig,
      setEnvPublicKey,
    }}>
      {children}
    </ConfigurationContext.Provider>
  )
}

export function useConfigurationContext() {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error("useConfigurationContext must be used within a ConfigurationContextProvider")
  }

  return context
}
