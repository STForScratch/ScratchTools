ScratchTools.getScratch.waitForCommentBox(warnUser);

function warnUser(el) {
  el.addEventListener("input", function () {
    if (
      el.value.toLowerCase().includes("scratchtools") ||
      el.value.toLowerCase().includes("scratch tools")
    ) {
      if (document.scratchtoolsMentioned === undefined) {
        document.scratchtoolsMentioned = true;
        ScratchTools.createModal(
          "Warning",
          "Mentioning ScratchTools on Scratch can get you in trouble due to their browser extension policy. If you have feedback to leave, you can do it at https://scratchtools.app/feedback - just remember this and be careful if you do choose to post this comment anyways.",
          [
            {
              label: "Feedback",
              type: "link",
              href: "https://scratchtools.app/feedback",
            },
            { label: "Close", type: "close" },
          ]
        );
      }
    }
  });
}
