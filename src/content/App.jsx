import React, { useState, useEffect } from 'react';
import fetchWiki from './api';

const App = () => {
  const [selection, setSelection] = useState();
  const [isEnabled, setIsEnabled] = useState();

  useEffect(() => {
    document.onselectionchange = () => {
      setSelection(document.getSelection().toString());
    };

    const { runtime, storage } = chrome;

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

  const isPopupVisible = isEnabled && selection.length;

  return isPopupVisible && (
    <div>
      <span>{selection}</span>
      <button onClick={() => fetchWiki(selection)}>search</button>
    </div>
  );
};

export default App;
