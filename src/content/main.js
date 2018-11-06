const { runtime, storage, browserAction } = chrome;

document.onselectionchange = () => {
  console.log(document.getSelection());
};

runtime.onMessage.addListener((request, _sender, sendResp) => {
  if (request.name !== 'toggle') return;

  storage.sync.get(['isEnabled'], ({ isEnabled }) => {
    const newVal = !isEnabled;
    storage.sync.set({ isEnabled: newVal }, () => sendResp({ isEnabled: newVal }));
  });

  return true;
});
