ScratchTools.verifyUser = async function (callback) {
  var code = await (
    await fetch(`https://data.scratchtools.app/verification/code/`)
  ).json();
  var PROJECT_ID = "854593681";
  var user = ScratchTools.Auth.user.username;
  var connection = new WebSocket("wss://clouddata.scratch.mit.edu");
  connection.onerror = console.error;
  connection.onopen = async () => {
    connection.send(
      JSON.stringify({ method: "handshake", project_id: PROJECT_ID, user }) +
        "\n"
    );
    await new Promise((r) => setTimeout(r, 100));
    connection.send(
      JSON.stringify({
        value: code.code.toString(),
        name: "☁ verify",
        method: "set",
        project_id: PROJECT_ID,
        user,
      }) + "\n"
    );
    connection.close();
    var data = await (
      await fetch("https://data.scratchtools.app/verify/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secret: code.secret }),
      })
    ).json();
    callback(data.code);
  };
};
