const electron = require("electron");
const { ipcRenderer } = electron;

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const { path } = document.querySelector("input").files[0];
  // ipcRenderer will send the perticular event
  ipcRenderer.send("video:submit", path);
});
// ipcRenderer will will recieve the event
ipcRenderer.on("video:metadata", (event, format) => {
  let filePath = format.filename.split("/");
  let fileName = filePath[filePath.length - 1];
  document.querySelector("#fileName").innerHTML = `File Name is: ${fileName}`;
  document.querySelector(
    "#result"
  ).innerHTML = `Video duration is: ${format.duration} seconds`;
});
