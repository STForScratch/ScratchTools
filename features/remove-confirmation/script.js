export default async function ({ feature, console }) {
  ScratchTools.waitForElements("body", () => {
    document.body.addEventListener("click", () => {
      ScratchTools.waitForElements(
        "[class^='delete-confirmation-prompt_ok-button_']",
        (confirmButton) => {
          if (feature.self.enabled) confirmButton.click();
        }
      );
    });
  });
}
