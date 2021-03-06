<p align="center" style="text-align: center;">
  <img src="https://cdn.glitch.global/cb2bf217-ffc5-4d43-a8ef-956942c7aa4d/favicon.png?v=1655008522709" style="width: 128px;">
  <h1 align="center">Welcome to ScratchTools!</h1>
</p>

### About Us
We're a browser extension for the Scratch website that makes Scratch look, work, and feel even better. We're fully customizeable, so you can build the Scratch website based on just how you want it to look! We're the fastest-growing browser extension for Scratch, and we're run by the community! Anyone can build a feature!

### Installing
There are multiple ways of installing.
- Chrome: You can download from Chrome [here](https://tools.scratchstatus.org/chrome/). Then just press the Add to Chrome button, and you've downloaded ScratchTools!
- Firefox/Mozilla: You can download for Firefox [here](https://tools.scratchstatus.org/firefox/). You can then just add it to Firefox, and then you have ScratchTools!
- GitHub: Download from GitHub [here](https://github.com/STForScratch/ScratchTools/zipball/master). If it downloads a `.zip` file, unpack it. Then, with the folder, go to `chrome://extensions`, make sure you have developer mode enabled (switch in the top right corner), and drag the downloaded folder onto the page. Make sure you've disabled other versions of ScratchTools.

### Building a Feature
It's not very hard to build a feature, and if you're ever having trouble, our developers are always here to help you! For ideas, code help, beta testing for your features, and more, you can [join our Discord server](https://discord.gg/5AkUsCbEsy). Now, here's how to build a feature!
1. **Fork** the repository. (The STForScratch/ScratchTools repository). Now you have your own version of ScratchTools that you can edit, and, when ready, send us your changes so we can add your changes into ScratchTools. Forking the wrong repo can lead to problems, such as having an outdated version.
2. **Add** your `.js` file to the `/features/` folder. Name it something related to your feature, and something different from the rest of the features. This file will run whenever the feature is enabled. As of right now, it must be a JavaScript file (ending with `.js`).
3. **Edit** the `/features/features.json` file. This is one of the most important files. Make sure you understand JSON before you edit this, or use a [JSON validator](https://jsonlint.com) after editing to make sure it's all correct. In this file, you'll notice each and every ScratchTools feature. Follow the formatting, and add your feature to the bottom of the list. Make sure that the file name is correct, along with the credits, urls, description, and, of course, the title.
4. **Go** to the main repository (the one you're currently in), and create a pull request with the changes from your fork. If you don't know how to do this, you can [quickly read this article from GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). Now, our developers can review your changes and make sure everything works well! You'll get credit for all of your changes as well!

Remember, our developers are always there for you. If you ever need help or have questions, feel free to ask us. You can create an issue or [join our Discord server](https://discord.gg/5AkUsCbEsy). If you need code help, we can help you as well.

### Our APIs
Our APIs are growing slowly, but, as of right now, we have two main ones that we use. As long as your feature's world isn't set to "ISOLATED", these APIs will work for you!
#### vm
`ScratchTools().vm` will return the vm for any project. You can be on the project page, in the editor, or in fullscreen and it will work! You can view all information about the project, from the number of clones to the values of variables. You can also perform actions with it, such as adding event listeners for when sprites are added or turning on turbo mode.
#### blockly
`ScratchTools().blockly` only works in the editor, but you can use it to edit the blocks in a project! It only works for the current sprite. This variable is extremely helpful, as it controls everything in the block editor, including block colors.

### How to Support without Code
Not only do you have to be a developer to code for ScratchTools (technically, we would teach you if you wanted help), but you can also be a beta tester, suggest ideas, design our website, create art, and more! Here are some common things people like to help with:
- **Beta testing.** You can search for bugs and then report them [here](https://tools.scratchstatus.org/bugs/). Just [download](https://github.com/STForScratch/ScratchTools/zipball/master) the newest changes from GitHub, and add them to your browser! [Here's how to add Chrome Extensions without the Chrome Webstore.](https://www.labnol.org/internet/install-chrome-extensions/25817/)
- **Website.** If you know HTML or CSS, we could really use your help on our website! We aren't looking for big changes, but we'd love your help with it anyways! Let us know by creating an issue or contacting a developer!
- **Graphic Designer.** If you're an artist or designer, you can help us! We need banners, cool art, and more! We love all kinds of styles, you can contact us by creating an issue or contacting a developer!
- **Brainstorming.** If you have ideas, you can suggest them on our [feedback section](https://tools.scratchstatus.org/feedback/)!
- **Posting.** Feel free to post about us on social media! We'd love to help as many Scratchers as possible, so every post helps!
