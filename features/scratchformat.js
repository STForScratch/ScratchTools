// javascript.js

if (sf == undefined) {
  // Simply a .5 second timer after page load. JS onload doesn't seem
  // to work very well here.
  setTimeout(function () {
    var messages = document.getElementsByClassName("comment-text");
    if (messages.length == 0) {
      sf.init();
    } else {
      for (var i = 0; i < messages.length; i++) {
        // Clean comment before sending it to parser
        var comment = messages[i].innerText;
        comment = comment.replace(/\</g, "&lt;");
        comment = comment.replace(/\>/g, "&gt;");

        messages[i].textContent = sf.parse(comment);
      }
    }
  }, 500);
} else {
  console.log("ScratchFormat loaded more than once, quitting");
}

// The initial SF app object
// Create the initial formatter element
var sf = {
  formatter: null,
};

// Use a simple DOM element to check Scratch 3/2 UI.
sf.version = 3;
if (document.body.children[0].id == "pagewrapper") {
  sf.version = 2;
}

// Create the SF "tags"
// Everything is customizable here.
// (local images don't work yet, but who cares.
// this is the internet.)
sf.tags = [
  {
    name: "bold",
    tag: "b",
    src: "https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/icons/Editor/bold.svg",
    fillers: ["**", "**"],
    formatter: function (part1, part2) {
      return "<b>" + part2 + "</b>";
    },
  },
  {
    name: "italics",
    tag: "i",
    src: "https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/icons/Editor/italic.svg",
    fillers: ["*", "*"],
    formatter: function (part1, part2) {
      return "<i>" + part2 + "</i>";
    },
  },
  {
    name: "code",
    tag: "code",
    src: "https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/icons/Editor/code-view.svg",
    fillers: ["`", "`"],
    formatter: function (part1, part2) {
      return "<code class='sfcode'>" + part2 + "</code>";
    },
  },
  {
    name: "underline",
    tag: "u",
    src: "https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/icons/Editor/underline.svg",
    fillers: ["[u]", "[/u]"],
    formatter: function (part1, part2) {
      return "<u>" + part2 + "</u>";
    },
  },
  {
    name: "easteregg",
    tag: "easteregg",
    dontshow: true,
    fillers: ["[easteregg]"],
    formatter: function (part1, part2) {
      return "( ͡° ͜ʖ ͡°)";
    },
  },
  {
    name: "help",
    help: true,
    src: "https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/icons/Editor/question-mark.svg",
    ignore: true,
  },
];

// First, initialize the formatter, and its icons.
// This is executed on the next block
sf.init = function () {
  var textareaFinder = "[name=compose-comment],[name=content]";

  // Helpful first textarea message
  var findFirst = document.querySelectorAll(textareaFinder);
  if (findFirst.length > 0) {
    findFirst[0].placeholder = "Click here to activate ScratchFormat";
  } else {
    // Kill all if there are no textareas
    return;
  }

  sf.formatter = document.createElement("div");
  sf.formatter.id = "formatter";
  for (var t = 0; t < sf.tags.length; t++) {
    if (sf.tags[t].dontshow) {
      // Skip to next part int this loop
      continue;
    }

    var icon = document.createElement("img");
    icon.src = sf.tags[t].src;
    icon.title = sf.tags[t].name;

    // Simply put a margin before underline because it separates
    // Markdown options and SFCode
    if (sf.tags[t].name == "underline") {
      icon.style.marginLeft = "20px";
    }

    // Help icon
    if (sf.tags[t].help) {
      icon.style.float = "right";
      icon.addEventListener("click", function () {
        // Popup message HTML got a bit out of hand here
        smod.dialogText({
          title: "ScratchFormat Help",
          text: helpMsg,
        });
      });

      sf.formatter.appendChild(icon);
      continue;
    }

    // Set up code for each icon
    icon.fillers = sf.tags[t].fillers;
    icon.onclick = function (event) {
      var textarea = event.target.parentElement.parentElement.children[1];
      var fillers = event.target.fillers;

      // Grab the selected text
      var selection = textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd
      );

      if (selection.length == 0) {
        selection = "text";
      }

      // Generate new text, if just 1 filler, ex [br], don't attempt
      // to use second part.
      var newText = textarea.value.substring(0, textarea.selectionStart);
      if (fillers.length > 1) {
        newText += fillers[0] + selection + fillers[1];
      } else {
        newText += fillers[0];
      }

      newText += textarea.value.substring(textarea.selectionEnd);

      textarea.value = newText;
      textarea.focus();
    };

    sf.formatter.appendChild(icon);
  }

  // Move formatter if user clicks on textarea.
  document.body.onclick = function (event) {
    // Note: duplicate of "textareaFinder"
    if (
      event.target.name == "content" ||
      event.target.name == "compose-comment"
    ) {
      // Check if it already has formatter.
      // A somewhat messy solution, but it is fine.
      if (event.target.parentElement.children[0].id !== "formatter") {
        event.target.parentElement.prepend(sf.formatter);
        event.target.style.height = "250px";
        //sf.formatter.style.width = event.target.offsetWidth + "px";
        event.target.style.resize = "vertical";
      }
    }
  };

  // Initial background formatting loop.
  // This just checks for new comments
  setInterval(function () {
    sf.format();
  }, 300);
};

// Function to format comments that are not already
// formatted
sf.oldComments = 0;
sf.format = function () {
  // Quit if we already formatted those comments.
  // Checks for last vs new length.
  var comments = document.querySelectorAll(".content, .emoji-text");
  if (sf.oldComments == comments.length) {
    return;
  }

  sf.oldComments = comments.length;

  for (var c = 0; c < comments.length; c++) {
    comments[c].style.whiteSpace = "pre-line";
    if (comments[c].className == "emoji-text") {
      comments[c].style.marginLeft = "3px";
    }

    // Go through all the text child nodes and replace them with a span
    // element.
    for (var i = 0; i < comments[c].childNodes.length; i++) {
      if (comments[c].childNodes[i].nodeName == "#text") {
        var p = document.createElement("span");

        var comment = comments[c].childNodes[i].data;
        comment = comment.replace(/\</g, "&lt;");
        comment = comment.replace(/\>/g, "&gt;");
        p.innerHTML = " " + sf.parse(comment) + " ";
        comments[c].childNodes[i].replaceWith(p);
      }
    }
  }
};

sf.parseMD = function (text) {
  // Allow asterisks in code block
  text = text.replace(/[`].+[`]/gm, function (x) {
    return x.replace(/\*/gm, "&ast;");
  });

  text = text.replace(/```((.|\n*)*?)```/gm, "<code class='sfcode'>$1</code>");
  text = text.replace(/`(.*?)`/g, "<code>$1</code>");

  // Bold, then italics
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");

  // Don't format links that already have a tag with them
  // Sorry, I cheated with Stackoverflow :\
  // https://stackoverflow.com/a/8943487
  text = text.replace(
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
    "<a href='$1'>$1</a>"
  );
  return text;
};

// Custom regex SFCode* parser. It parses differently than BBcode. Instead
// Of replacing [b] with <b>, it it replaces both tags with
// text between them. Therefore, "[b][b]Hello[/b][/b]" will not work.
// It doesn't really matter though, and won't be changed unless it
// is able to cause significant issues in the future.
// *ScratchFormat Markup Language (basically BBCode)
sf.parse = function (text) {
  // Note that the new scratchformat standard is [],
  // and the () is outdated, and a bit harder to type.
  // But, we will detect both for historical reasons
  let startBracket = "[\\(|\\[]";
  let endBracket = "[\\)|\\]]";

  for (var t = 0; t < sf.tags.length; t++) {
    if (sf.tags[t].ignore) {
      continue;
    }

    // First part of tag
    var regex = "";
    regex += startBracket;
    regex += sf.tags[t].tag;
    if (sf.tags[t].sensitive) {
      regex += "[=]*([a-zA-Z0-9#(),]*)";
    } else {
      regex += "[=]*([^\\]\\[\\)\\(]*)";
    }

    regex += endBracket;

    // If just 1 tag (Ex [easteregg])
    if (sf.tags[t].fillers.length > 1) {
      // Lazy matching (?)
      // Since we can't use the s flag in Firefox,
      // This is an alternative that matches it using |
      regex += "((.|\n*)*?)";

      // Second part of tag
      regex += startBracket;
      regex += "/";
      regex += sf.tags[t].tag;
      regex += endBracket;
    }

    regex = new RegExp(regex, "gm");
    text = text.replace(regex, sf.tags[t].formatter("$1", "$2"));
  }

  // Format trailing breaklines and spaces
  text = text.replace(/^(\n| )+/gm, "");
  text = text.trim("\n"); // Trim last newlines

  text = sf.parseMD(text);

  return text;
};

// smod.js
// MIT License
var smod = {
  dialog2: function (title, element) {
    openDialogue(element, {
      title: gettext(title),

      open: function (e, t) {
        // Runs once popup is opened.
      },

      close: function (e, t) {
        $(this).dialog("destroy");
        $(".ui-widget-overlay.ui-front").remove();
      },

      show: {
        effect: "clip",
        duration: 250,
      },

      hide: {
        effect: "clip",
        duration: 250,
      },
    });
  },

  // This is bad, bad, bad. If anybody can find the native
  // way to create popups in Scratch 3.0 React.js, let me know.
  dialog3: function (title, text) {
    var html =
      `"<div class="ReactModalPortal"><div class="modal-overlay modal-overlay"><div aria-label="Report Comment" class="modal-content mod-report modal-sizes modal-content mod-report" role="dialog" tabindex="-1"><div class="modal-content-close" onclick="this.parentElement.parentElement.parentElement.outerHTML = null;"><img alt="close-icon" class="modal-content-close-img" draggable="true" src="/svgs/modal/close-x.svg"></div><div><div class="report-modal-header" style="background-color: #395c79; box-shadow: inset 0 -1px 0 0 #001fff;"><div class="report-content-label"><span>` +
      title +
      `</span></div></div><div class="report-modal-content" style="padding-bottom: 50px;"><div><div class="instructions"><span>` +
      text +
      `</span></div></div></div></div></div></div>"</div>`;
    document.body.innerHTML += html;
  },

  dialogText: function (obj) {
    // Another good way to check 2.0 vs 3.0 is
    // window["openDialogue"] == undefined

    if (document.body.children[0].id == "pagewrapper") {
      var popupContent = document.createElement("div");
      popupContent.textContent = obj.text;
      this.dialog2(obj.title, popupContent);
    } else {
      this.dialog3(obj.title, obj.text);
    }
  },
};

// from style.css

var style = document.createElement("style");
style.innerHTML = `
/* Code from Scratch 2.0 style interface */
#formatter {
	border: 1px solid rgb(169, 169, 169);
	box-shadow: inset 0 1px 1px #ccc;
	background-color: white;
	border-radius: 3px;
	margin-bottom: 10px;
	width: 500px;

	/* Size of icon */
	height: 24px;
}

.sfcode {
	display: block;
	border: 1px solid black;
	width: auto;
	background: lightgray;

	padding-bottom: 20px;
}

/* Formatter icons */
#formatter img {
	height: 24px;
}

#formatter img:hover {
	background-color: #e6e6e6;
}

#formatter img:active {
	background-color: #c9c9c9;
}
`;
document.body.appendChild(style);
