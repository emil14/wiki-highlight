import React, { useState, useEffect } from 'react';

const App = () => {
  const [selection, setSelection] = useState();
  const [isEnabled, setIsEnabled] = useState();

  useEffect(() => {
    document.onselectionchange = () => {
      setSelection(document.getSelection().toString());
    };

    const { runtime, storage, browserAction } = chrome;

    runtime.onMessage.addListener((request, _sender, sendResp) => {
      if (request.name !== 'toggle') return;

      storage.sync.get(['isEnabled'], ({ isEnabled }) => {
        const newValue = !isEnabled;

        storage.sync.set({ isEnabled: newValue }, () => {
          setIsEnabled(newValue);
          sendResp({ isEnabled: newValue });
        });
      });

      return true;
    });
  }, []);

  return isEnabled && <div>{selection}</div>;
}

export default App;
