export default function () {
  let auth = {
    fetch: async function () {
      let data = await (
        await fetch("https://scratch.mit.edu/session/", {
          headers: {
            "x-requested-with": "XMLHttpRequest",
          },
        })
      ).json();
      return data;
    },
    csrf: function() {
        return ScratchTools.cookies.get("scratchcsrftoken")
    },
    cookies: ScratchTools.cookies,
  };
  return auth
}
