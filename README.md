<br />
<div align="center">
  <a href="https://github.com/STForScratch/ScratchTools">
    <img src="extras/icons/icon128.png" alt="Logo" width="130" height="130">
    <h1 align="center">Welcome to ScratchTools!</h1>
  </a>

  <p align="center">
    The perfect extension for Scratch.
    <br />
    <a href="https://docs.scratchtools.app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/xXuZAWTmXng">Feature Showcase</a>
    ·
    <a href="https://github.com/STForScratch/ScratchTools/issues/new?assignees=&labels=bug&projects=&template=--bug.yml">Report a Bug</a>
    ·
    <a href="https://github.com/STForScratch/ScratchTools/issues/new?assignees=&labels=feature&template=feature_request.md&title=">Request feature</a>
  </p>
</div>  

### Table of Contents
- [About Us](#about-us)
- [Installing](#installing)
- [Building a Feature](#building-a-feature)
- [Our APIs](#our-apis)
  - [Auth](#auth)
  - [Scratch APIs](#scratch-apis)
    - [Basics](#basics)
    - [Blockly Context Menus](#blockly-context-menus)
    - [Sound, GUI and Paint-Mode](#sound--gui-and-paint-mode)
  - [Logging](#logging)
- [How to Support without Code](#how-to-support-without-code)

### About Us
We're a browser extension for the Scratch website that makes Scratch look, work, and feel even better. We're fully customizable, so you can build the Scratch website based on just how you want it to look! We're the fastest-growing browser extension for Scratch, and we're run by the community! Anyone can build a feature!

### Installing
There are multiple ways of installing.
- Chrome: You can download from Chrome's Extension Webstore [here](https://chrome.google.com/webstore/detail/scratchtools/jjnpbalpllpfdpgplpbcbadkgdmleopm). Then just press the Add to Chrome button, and you've downloaded ScratchTools!

> [!NOTE]
> If you are using a browser based on Chromium (eg. Brave), then this is your way of installing unless your browser has it's own extension store.

- Firefox/Mozilla: You can download from Firefox Addons (Works on Firefox forks) [here](https://addons.mozilla.org/en-US/firefox/addon/scratchtools/). You can then just add it to Firefox, and then you have ScratchTools!

> [!NOTE]
> The Firefox version of Scratchtools is behind compared to the chrome version of Scratchtools due to technical difficulties. Until a solution is found, the Firefox version will remain behind.

- Microsoft Edge: You can download from Edge's addon webstore [here](https://microsoftedge.microsoft.com/addons/detail/scratchtools/aaidjeidbnhpjhblbianjeghjopbimmk). You can then just add it to Edge, and then you have ScratchTools!
- Safari (macOS, iPadOS and iOS): You can build the extension by typing `make` for macOS, and `make ios` for the iOS app (you will have to sign it on Xcode), make sure you have enabled Developer mode and allowed unsigned extensions.

- GitHub (For Chrome/Chromium): Download the zipball from the GitHub repository [here](https://github.com/STForScratch/ScratchTools/zipball/master). After the `.zip` file is downloaded, unpack it. Then, with the folder, go to `chrome://extensions` (On Chromium forks, you will often need to replace "chrome" with your browser's name. (eg. `brave://extensions`)), make sure you have developer mode enabled (switch in the top right corner), and drag the downloaded folder onto the page. Make sure you've disabled other versions of ScratchTools.

- GitHub (For Firefox & Firefox Forks): Download from the GitHub repository [here](https://github.com/STForScratch/ScratchTools/zipball/master). After the `.zip` file is downloaded, unpack it. Then, with the folder, go to `about:debugging`, click "This Firefox" and click "Load temporary extension", go into the extension folder and select the `manifest.json`.

> [!WARNING]
> Extensions loaded this way onto Safari indeed temporary. Once you close the window, it will be gone. In addition, ScratchTools is still outdated on Firefox at the time of writing this.

- Installing with Git: Open the code dropdown on the extension's repository, copy the HTTPS url and then execute `git clone  https://github.com/STForScratch/ScratchTools.git -b main` in Git, and you have installed ScratchTools! To pull changes instead of cloning the repository, enter the folder and execute `git remote add upstream https://github.com/STForScratch/ScratchTools.git -b main`. When a commit is made to the repository, you can just run `git pull upstream master` to pull the changes, note that sometimes you may need to refresh ScratchTools.

### Building a Feature
It's not very hard to build a feature, and if you're ever having trouble, our developers are always here to help you! For ideas, code help, beta testing for your features, and more, you can [join our Discord server](https://discord.gg/5AkUsCbEsy). Now, here's how to build a feature!
1. **Fork** the repository. (The STForScratch/ScratchTools repository). Now you have your own version of ScratchTools that you can edit, and, when ready, send us your changes so we can add your changes into ScratchTools. Forking the wrong repo can lead to problems, such as having an outdated version.
2. **Add** your `.js` file to the `/features/` folder. Name it something related to your feature, and something different from the rest of the features. This file will run whenever the feature is enabled. As of right now, it must be a JavaScript file (ending with `.js`).
3. **Edit** the `/features/features.json` file. This is one of the most important files. Make sure you understand JSON before you edit this, or use a [JSON validator](https://jsonlint.com) after editing to make sure it's all correct. In this file, you'll notice each and every ScratchTools feature. Follow the formatting, and add your feature to the bottom of the list. Make sure that the file name is correct, along with the credits, urls, description, and, of course, the title.
4. **Go** to the main repository (the one you're currently in), and create a pull request with the changes from your fork. If you don't know how to do this, you can [quickly read this article from GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). Now, our developers can review your changes and make sure everything works well! You'll get credit for all of your changes as well!

Remember, our developers are always there for you. If you ever need help or have questions, feel free to ask us. You can create an issue or [join our Discord server](https://discord.gg/5AkUsCbEsy). If you need code help, we can help you as well. Also ScratchTools has a [YouTube channel](https://www.youtube.com/channel/UCYZiKwxZ_8gJaMwbxHmP0KA) with tutorials such as how to make the website use a custom font or how to install the Beta version of ScratchTools to test out features before they are released to the public.

### Our APIs
Our APIs are growing slowly, but, as of right now, we have two main ones that we use. As long as your feature's world isn't set to "ISOLATED", these APIs will work for you!
#### Auth
Using `ScratchTools.Auth`, you can access the authentication info for the signed in user. This includes the session ID, username, profile picture, and more. This is the only API that requires you to wait for a value when using it immediately after your userscript has loaded. You can also use `await ScratchTools.Session()` to get the same information.
#### Scratch APIs
##### Basics
Using `ScratchTools.Scratch.blockly` and `ScratchTools.Scratch.vm`, you can access the Blockly and Virtual Machine from inside the editor (or on the project page with vm). Blockly must wait for the editor to load, but the virtual machine is ready instantly.
##### Blockly Context Menus
If you want to control what appears in a context menu, you easily can with the `ScratchTools.Scratch.waitForContextMenu()` API. The only input you need is JSON, which must include the block ID for the context menu, the ID you want to set for the context menu option (lets you change the context menu option, so don't use the same ID as another feature), and the callback for when the context menu is opened. The callback function will also have an input, which is the context menu itself. That way, you can add the context menu option when the context menu is opened.
##### Sound , GUI and Paint-Mode
Using `ScratchTools.Scratch.scratchSound`and `ScratchTools.Scratch.scratchGui`, you can return sound from the editor as well as access Graphical User Interface inside the editor. `ScratchTools.Scratch.scratchPaint` can be used in selecting the paint editor mode.

#### Logging
Logging can be very important, especially when testing. You can use `ScratchTools.console.log()`, `ScratchTools.console.warn()`, and `ScratchTools.console.error()` to log, warn, and error in the console, specifically for ScratchTools.

### How to Support without Code
Not only do you have to be a developer to code for ScratchTools (technically, we would teach you if you wanted help), but you can also be a beta tester, suggest ideas, design our website, create art, and more! Here are some common things people like to help with:
- **Beta testing.** You can search for bugs and then report them [here](https://www.scratchtools.app/feedback/). Just [download](https://github.com/STForScratch/ScratchTools/zipball/master) the newest changes from GitHub, and add them to your browser! [Here's how to add Chrome Extensions without the Chrome Webstore.](https://www.labnol.org/internet/install-chrome-extensions/25817/)
- **Website.** If you know HTML or CSS, we could really use your help on our website! We aren't looking for big changes, but we'd love your help with it anyways! Let us know by creating an issue or contacting a developer!
- **Graphic Designer.** If you're an artist or designer, you can help us! We need banners, cool art, and more! We love all kinds of styles, you can contact us by creating an issue or contacting a developer!
- **Brainstorming.** If you have ideas, you can suggest them on our [feedback page](https://scratchtools.app/feedback/), [Community Discord](https://server.scratchtools.app/) or [create an issue suggesting it](https://github.com/STForScratch/ScratchTools/issues/new?assignees=&labels=new+feature&projects=&template=--feature.yml)!
- **Posting.** Feel free to post about us on social media! We'd love to help as many Scratchers as possible, so every post helps!

