import React, { useState, useEffect } from 'react';

const css = {
  position: 'absoulte',
  left: '20px',
  top: '20px',
  zIndex: 9999,
  width: '250px',
  height: '250px',
  background: 'green',
};

const Popup = () => {
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

  return <div style={css}>{selection}</div>;
}

export default Popup;
