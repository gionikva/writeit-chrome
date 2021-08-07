import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

// const chrome : any = {};

type StorageOnChangedCallback = (changes: {
  [key: string]: chrome.storage.StorageChange;
}, areaName: "sync" | "local" | "managed") => void

const Popup = () => {
  let debugCount = useRef(0);
  const [enabled, _setEnabled] = useState(true);
  const [debugString, setDebugString] = useState('');
  const [currentURL, setCurrentURL] = useState<string>();
  const printDebug = (str: string) => {
    setDebugString(`${debugString} \n${debugCount.current++}: ${str}\n`);
  }
  useEffect(() => {
    // printDebug("initial useEffect run");
    chrome.storage.sync.get(({ enabled }) => _setEnabled(enabled));
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
    // const enabledChangedCallback: StorageOnChangedCallback = (changes, namespace) => {
    //   printDebug("valueChanged");
    //   _setEnabled(changes.enabled.newValue!);
    // }
    // chrome.storage.onChanged.addListener(enabledChangedCallback);
    // return () => {
    //   chrome.storage.onChanged.removeListener(enabledChangedCallback);
    // }
  }, []);

  const setEnabled = (enabled: boolean) => {
    // printDebug(`tried to set enabled to ${enabled}`);

    chrome.storage.sync.set({ enabled });
    _setEnabled(enabled);
  }

  const changeBackground = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          {
            color: "#555555",
          },
          (msg) => {
            console.log("result message:", msg);
          }
        );
      }
    });
  };

  return (
    <><div id="menuRoot" style={{
      width: 200,
      height: "min-content"
    }}> <div>Debug: <br></br> {debugString} </div>
      <div> WriteIt is <span style={{
        color: enabled ? "lime" : "red"
      }}> {enabled ? "enabled" : "disabled"} </span>  </div>

      <button
        onClick={() => setEnabled(!enabled)}
        style={{}}
      >
        {enabled ? "Disable" : "Enable"}
      </button></div>

    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
