export default async function () {
    if (!(new Date().getMonth() === 3 && new Date().getDate() === 1)) return;

  if (window.location.pathname.toLowerCase().startsWith("/users/")) {
    let pong = await import("./pong/profile.js");
    pong.default();
  }

  if (
    window.location.pathname.toLowerCase().startsWith("/explore/") ||
    window.location.pathname.toLowerCase().startsWith("/search/")
  ) {
    let jokes = await import("./jokes/script.js");
    jokes.default();
  }

  if (window.location.pathname.toLowerCase().startsWith("/projects/")) {
    let clap = await import("./clap/script.js");
    clap.default();
  }
}