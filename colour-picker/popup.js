let colourPickerBtn = document.querySelector(".changeColourBtn");
const colorGrid = document.querySelector(".colourGrid");
const colorValue = document.querySelector(".colourValue");

colourPickerBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColour,
    },
    async (injectionResults) => {
      const [data] = injectionResults;
      console.log(data);
      if (data.result) {
        const color = data.result.sRGBHex;
        console.log(color);
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
            await navigator.clipboard.writeText(color);
        } catch (err) {
            console.error(err);
        }
      }
    }
  );
});
async function pickColour() {
  try {
    const eyeDropper = new EyeDropper();
    const selectedColour = await eyeDropper.open();
    console.log(selectedColour);
    return selectedColour;
  } catch (error) {
    console.error(error);
  }
}
