const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener("click", () => {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("color: ", color);
    pickColor();
  });
});

async function pickColor() {
  try {
    // Picker
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();

    if (result && result.sRGBHex) {
      const color = result.sRGBHex;
      colorGrid.style.backgroundColor = color;
      colorValue.innerText = color;

      try {
        await navigator.clipboard.writeText(color);
        console.log("Color copied to clipboard");
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
