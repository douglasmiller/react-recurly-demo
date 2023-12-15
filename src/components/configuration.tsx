"use client";

import { useState } from "react";
import { useConfigurationContext } from "./configuration-context";

const apiOptions = {
  production: "https://api.recurly.com/js/v1",
  qa2: "https://api.qa2.recurlyqa.com/js/v1",
  localhost: "https://api.recurly.dev:3000/js/v1",
}

const rjsOptions = {
  production: "https://js.recurly.com/v4/recurly.js",
  localhost: "https://js.recurly.dev:8020/build/recurly.js",
}

export default function Configuration() {
  const [hidden, setHidden] = useState(false);

  const {
    api,
    setApi,
    rjs,
    setRjs,
    publicKey,
    setEnvPublicKey,
    envConfig,
  } = useConfigurationContext();

  const className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <>
      <button
        className="fixed bottom-2 right-2 content-center shadow-xl text-3xl appearance-none"
        type="button"
        onClick={() => setHidden((current) => !current)}
      >⚙️</button>
      {!hidden && <section className="fixed bottom-2 right-11 bg-slate-600 w-1/3 grid grid-cols-2 pl-2 content-center">
        <label htmlFor="rjs-select" className="flex items-center">Recurly.js</label>
        <select
          name="rjs-select"
          value={rjs}
          onChange={(e) => {
            setRjs(e.target.value);
            console.log('reloading')
            window.location.reload();
          }}
          className={className}
        >
          {Object.entries(rjsOptions).map(([key, value]) =>
            <option value={value} key={key}>{key}</option>
          )}
        </select>
        <label htmlFor="api-select" className="flex items-center">Recurly API</label>
        <select
          name="api-select"
          value={api}
          onChange={(e) => {
            setApi(e.target.value);
            console.log('reloading')
            window.location.reload();
          }}
          className={className}
        >
          {Object.entries(apiOptions).map(([key, value]) =>
            <option value={value} key={key}>{key}</option>
          )}
        </select>
        <label htmlFor="public-key" className="flex items-center">Public Key</label>
        <input
          type="text"
          value={envConfig[api].publicKey}
          onChange={(e) => {
            setEnvPublicKey(e.target.value);
            console.log('reloading')
            window.location.reload();
          }}
          className={className}
        />
      </section>}
    </>
  );
}
