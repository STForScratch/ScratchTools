export default async function ({ addon, console, msg }) {

    addon.self.addEventListener("disabled", (e)=>{
        console.log(e)
    })

    let head = await addon.tab.waitForElement("head")
    function add(_boolean, _class, _e) {
        if (_boolean) {
            let _element = document.createElement("style")
            _element.className = _class
            _element.innerHTML = _e
            head.append(_element)
        }
    }
    function addbyURL(_boolean, _class, _URL) {
        if (_boolean) {
            let _element = document.createElement("link")
            _element.href = _URL
            _element.rel = "stylesheet"
            _element.className = _class
            head.append(_element)
        }
    }
    function matchesURL(_check) {
        const pattern = new URLPattern(_check, "https://scratch.mit.edu");
        // console.log(pattern.pathname); // /books
        return(pattern.test(window.location.href)); // true
    }
    // addbyURL("SA-box-icons", addon.self.dir + "/Box.css")

    add(matchesURL("/*"), "SA-variables", `
    :root {
        --activity-box-content-max-hight: 450px;
        --box-header-height: 47.594px;
        --box-shadow: 0px 0px 20px -2px;
        --text-shadow: 0px 0px 9px;
    }

    @media (prefers-color-scheme: light) {
        :root{
            --main-blue: #4081ff;
            --footer-border-blue: #2a83ff;
            --click-blue: #3367cc;
            --scrollbar-gray: #aeb8cc;
            --box-gray: #d9e5ff;
            --background-color: white;
            --button-text-color: #ffffff;
            --footer-text-color: #ffffff;
            --main-text-color: #000000;


            --projects-color-a-1: #4081ff;
            --projects-color-a-2: #d9e6ff;
            --projects-color-a-3: #3a73e6;
            --projects-color-a-4: #3367cc;
            --projects-color-a-5: #3367cc70;

            --projects-color-b-1: #ff6680;
            --projects-color-b-2: #ffe0e6;
            --projects-color-b-3: #e65c73;
            --projects-color-b-4: #cc5266;
            --projects-color-b-5: #cc526670;

            --projects-color-c-1: #0fbd8c;
            --projects-color-c-2: #cff2e8;
            --projects-color-c-3: #0eaa7e;
            --projects-color-c-4: #0c9770;
            --projects-color-c-5: #0c977070;

            --projects-color-d-1: #ffbf00;
            --projects-color-d-2: #fff2cc;
            --projects-color-d-3: #e6ac00;
            --projects-color-d-4: #cc9900;
            --projects-color-d-5: #cc990070;

            --projects-color-e-1: #9966ff;
            --projects-color-e-2: #ebe0ff;
            --projects-color-e-3: #8352e5;
            --projects-color-e-4: #7a52cc;
            --projects-color-e-5: #7a52cc90;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root{
            --main-blue: #4081ff;
            --footer-border-blue: #216bff;
            --click-blue: #3367cc;
            --scrollbar-gray: #aeb8cc;
            --box-gray: #0d1933;
            --background-color: #010305;
            --button-text-color: #ffffff;
            --footer-text-color: #ffffff;
            --main-text-color: #ffffff;


            --projects-color-a-1: #4081ff;
            --projects-color-a-2: #0d1a33;
            --projects-color-a-3: #3a73e6;
            --projects-color-a-4: #3366cc;
            --projects-color-a-5: #3366cc90;

            --projects-color-b-1: #ff6680;
            --projects-color-b-2: #33141a;
            --projects-color-b-3: #e65c73;
            --projects-color-b-4: #cc5266;
            --projects-color-b-5: #cc526690;

            --projects-color-c-1: #0fbd8c;
            --projects-color-c-2: #03261c;
            --projects-color-c-3: #0eaa7e;
            --projects-color-c-4: #0c9770;
            --projects-color-c-5: #0c977090;

            --projects-color-d-1: #ffbf00;
            --projects-color-d-2: #332600;
            --projects-color-d-3: #e6ac00;
            --projects-color-d-4: #cc9900;
            --projects-color-d-5: #cc990090;

            --projects-color-e-1: #9966ff;
            --projects-color-e-2: #1f1433;
            --projects-color-e-3: #8352e5;
            --projects-color-e-4: #7a52cc;
            --projects-color-e-5: #7a52cc90;
        }
    }
    `)

    add(matchesURL("/"), "SA-ViewAll-icon", `
    .box-header a {
        background-image: url(${addon.self.dir}/Icons/ShowMore/ViewAll.svg) !important;
    }
    `)

    add((addon.settings.get("BoxIcons")&&(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/"))))), "SA-icons", `
    .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Undefined/QuestionMark.svg);
    }
    .SA-activity .box-header h4{
        background-image: url(${addon.self.dir}/Icons/Follow/WhatIsNew.svg);
    }
    .SA-scratchNews .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/News/ScratchNews.svg);
    }
    .SA-featuredProject .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Project/FeaturedProjects.svg);
    }
    .SA-featuredStudios .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Studio/FeaturedStudios.svg);
    }
    .SA-scratch-design-studio .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Studio/ScratchDesignStudio.svg);
    }
    .SA-a-projectsLovedByScratchersFollowing .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Follow/LovedByScratchersImFollowing.svg);
    }
    .SA-communityRemixing .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Remix/WhatTheCommunityIsRemixing.svg);
    }
    .SA-communityLoving .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Love/WhatTheCommunityIsLoving.svg);
    }
    .scratchtoolsCustomStudio .box-header h4 {
        background-image: url(${addon.self.dir}/Icons/Extra/ScratchTools.svg);
    }
    .scratchtoolsOnline .box-head h4 {
        background-image: url(${addon.self.dir}/Icons/Extra/ScratchTools.svg);
    }
    `)
    

    add(matchesURL("/"), "SA-for-spesific-boxes", `
    /* SA-a-project */
    .SA-a-project {
        box-shadow: var(--box-shadow) var(--projects-color-a-5) !important;
    }
    .SA-a-project .box-header h4, .SA-a-project .box-header a{
        background-color: var(--projects-color-a-3) !important;
    }
    .SA-a-project .box-header {
        background-color: var(--projects-color-a-1) !important;
    }
    .SA-a-project .box-content {
        background-color: var(--projects-color-a-2) !important;
        padding-bottom: 0px;
    }

    /* SA-b-project */
    .SA-b-project {
        box-shadow: var(--box-shadow) var(--projects-color-b-5) !important;
    }
    .SA-b-project .box-header h4, .SA-b-project .box-header a{
        background-color: var(--projects-color-b-3) !important;
    }
    .SA-b-project .box-header {
        background-color: var(--projects-color-b-1) !important;
    }
    .SA-b-project .box-content {
        background-color: var(--projects-color-b-2) !important;
        padding-bottom: 0px;
    }

    /* SA-c-project */
    .SA-c-project {
        box-shadow: var(--box-shadow) var(--projects-color-c-5) !important;
    }
    .SA-c-project .box-header h4, .SA-c-project .box-header a{
        background-color: var(--projects-color-c-3) !important;
    }
    .SA-c-project .box-header {
        background-color: var(--projects-color-c-1) !important;
    }
    .SA-c-project .box-content {
        background-color: var(--projects-color-c-2) !important;
        padding-bottom: 0px;
    }

    /* SA-d-project */
    .SA-d-project {
        box-shadow: var(--box-shadow) var(--projects-color-d-5) !important;
    }
    .SA-d-project .box-header h4, .SA-d-project .box-header a{
        background-color: var(--projects-color-d-3) !important;
    }
    .SA-d-project .box-header {
        background-color: var(--projects-color-d-1) !important;
    }
    .SA-d-project .box-content {
        background-color: var(--projects-color-d-2) !important;
        padding-bottom: 0px;
    }

    /* SA-e-project */
    .SA-e-project {
        box-shadow: var(--box-shadow) var(--projects-color-e-5) !important;
    }
    .SA-e-project .box-header h4, .SA-e-project .box-header a{
        background-color: var(--projects-color-e-3) !important;
    }
    .SA-e-project .box-header {
        background-color: var(--projects-color-e-1) !important;
    }
    .SA-e-project .box-content {
        background-color: var(--projects-color-e-2) !important;
        padding-bottom: 0px;
    }

    /* for thin devices */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .splash .splash-header .box {
            width: 28.75em !important;
        }
    }
    /* SA-activity */
    .SA-activity {
        width: calc(55% - 20px) !important;
        max-height: calc(var(--box-header-height)+var(--activity-box-content-max-hight));
    }
    .SA-activity span {
        color: var(--main-text-color) !important;
    }
    .activity-img {
        border-radius: 5px;
        padding-right: 0px !important;
        margin-right: 0.825rem;
    }
    .activity-ul::-webkit-scrollbar {
        width: 15px;
    }
    .activity-ul::-webkit-scrollbar-track {
        background: var(--scrollbar-gray);
        border: 5px solid var(--box-gray);
        border-radius: 100px;
    }
    .activity-ul::-webkit-scrollbar-thumb {
        background: var(--main-blue);
        border-radius: 100px;
    }
    .activity-ul {
        height: 100% !important;
        max-height: var(--activity-box-content-max-hight);
    }

    /* SA-scratchNews */
    .SA-scratchNews {
        width: 45% !important;
    }
    .SA-scratchNews p {
        color: var(--main-text-color) !important;
    }

    /* SA-featuredProject */
    /*.SA-featuredProject {
        box-shadow: var(--box-shadow) var(--projects-color-a-5) !important;
    }
    .SA-featuredProject .box-header h4, .SA-featuredProject .box-header a {
        background-color: var(--projects-color-a-3) !important;
    }
    .SA-featuredProject .box-header {
        background-color: var(--projects-color-a-1) !important;
    }
    .SA-featuredProject .box-content {
        background-color: var(--projects-color-a-2) !important;
    }*/

    /* SA-featuredStudios */
    /*.SA-featuredStudios {
        box-shadow: var(--box-shadow) var(--projects-color-a-5) !important;
    }
    .SA-featuredStudios .box-header h4, .SA-featuredStudios .box-header a {
        background-color: var(--projects-color-a-3) !important;
    }
    .SA-featuredStudios .box-header {
        background-color: var(--projects-color-a-1) !important;
    }
    .SA-featuredStudios .box-content {
        background-color: var(--projects-color-a-2) !important;
    }*/

    /* SA-scratch-design-studio */
    /*.SA-scratch-design-studio {
        box-shadow: var(--box-shadow) var(--projects-color-c-5) !important;
    }
    .SA-scratch-design-studio .box-header h4, .SA-scratch-design-studio .box-header a {
        background-color: var(--projects-color-c-3) !important;
    }
    .SA-scratch-design-studio .box-header {
        background-color: var(--projects-color-c-1) !important;
    }
    .SA-scratch-design-studio .box-content {
        background-color: var(--projects-color-c-2) !important;
    }*/

    /* splash.projectsLovedByScratchersFollowing */
    /*.SA-a-projectsLovedByScratchersFollowing {
        box-shadow: var(--box-shadow) var(--projects-color-b-5) !important;
    }
    .SA-a-projectsLovedByScratchersFollowing .box-header h4, .SA-a-projectsLovedByScratchersFollowing .box-header a {
        background-color: var(--projects-color-b-3) !important;
    }
    .SA-a-projectsLovedByScratchersFollowing .box-header {
        background-color: var(--projects-color-b-1) !important;
    }
    .SA-a-projectsLovedByScratchersFollowing .box-content {
        background-color: var(--projects-color-b-2) !important;
    }*/

    /* SA-communityRemixing */
    /*.SA-communityRemixing {
        box-shadow: var(--box-shadow) var(--projects-color-b-5) !important;
    }
    .SA-communityRemixing .box-header h4, .SA-communityRemixing .box-header a {
        background-color: var(--projects-color-b-3) !important;
    }
    .SA-communityRemixing .box-header {
        background-color: var(--projects-color-b-1) !important;
    }
    .SA-communityRemixing .box-content {
        background-color: var(--projects-color-b-2) !important;
    }*/

    /* SA-communityLoving */
    /*.SA-communityLoving {
        box-shadow: var(--box-shadow) var(--projects-color-b-5) !important;
    }
    .SA-communityLoving .box-header h4 {
        background-color: var(--projects-color-b-3) !important;
    }
    .SA-communityLoving .box-header {
        background-color: var(--projects-color-b-1) !important;
    }
    .SA-communityLoving .box-content {
        background-color: var(--projects-color-b-2) !important;
    }*/

    /* Don't mind this! */
    /*.scratchtoolsCustomStudio {
        box-shadow: var(--box-shadow) var(--projects-color-d-5) !important;
    }
    .scratchtoolsCustomStudio .box-header h4, .scratchtoolsCustomStudio .box-header a {
        background-color: var(--projects-color-d-3) !important;
    }
    .scratchtoolsCustomStudio .box-header {
        background-color: var(--projects-color-d-1) !important;
    }
    .scratchtoolsCustomStudio .box-content {
        background-color: var(--projects-color-d-2) !important;
    }*/
    `)

    add(matchesURL("/"), "SA-box", `
    /* the whole box */
    .box {
        background-color: var(--box-gray) !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: none !important;
        box-shadow: var(--box-shadow) var(--projects-color-c-5);
    }

    /* bottom part of box */
    .box .box-content {
        padding-bottom: 0px !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        /* border: none !important; */
        /* height: fit-content; */
        /* max-height: var(--activity-box-content-max-hight); */

        background-color: var(--projects-color-c-2);
    }

    /* top part of box */
    .box-header {
        height: var(--box-header-height) !important;
        border: none !important;

        background-color: var(--projects-color-c-1) !important;
    }

    /* title on box (h4) */
    .box-header h4 {
        border-radius: 100px;
        padding: 15px;
        color: var(--button-text-color) !important;
        ${ addon.settings.get("BoxIcons") ? "padding-left: 50px;" : "" }
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 40px 40px;

        background-color: var(--projects-color-c-3);

    }

    /* view all link on box (a) */
    .box-header a {
        /* display: none ; */
        height: 17.594px;
        width: 17.594px;
        border-radius: 100px;
        padding: 15px;
        font-size: 0px;
        float: right;
        background-color: var(--projects-color-c-3);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 40px 40px;
    }
    .box-header a:empty {
        display: none;
    }
    `)

    add(matchesURL("/"), "SA-scrollbar", `
    .box *::-webkit-scrollbar {
        width: 15px;
    }
    .box *::-webkit-scrollbar-track {
        background: var(--scrollbar-gray);
        border: 5px solid var(--box-gray);
        border-radius: 100px;
    }
    .box *::-webkit-scrollbar-thumb {
        background: var(--main-blue);
        border-radius: 100px;
    }
    `)

    add((matchesURL("/*")), "SA-footer", `
    /* the footer */
    #footer {
        border-top: 1.5px solid var(--footer-border-blue) !important;
        background-color: var(--main-blue);
        color: var(--footer-text-color);
        transition: 0.5s cubic-bezier(0.25, 0.1, 0.24, 1.2);
    }
    #donor {
        background-color: var(--main-blue);
    }
    #footer a:link {
        color: #aaddff !important;
    }
    #footer a:visited {
        color: #bbbbff !important;
    }
    #footer a:hover {
        color: #ffffff !important;
    }
    #footer #donor-text {
        color: var(--main-text-color) !important;
    }
    `)

    add(addon.settings.get("HideFooter")&&(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ) ), "SA-hide-footer", `
    /* the footer */
    #footer {
        display: none;
    }
    body, #content {
        padding-bottom: 0px !important;
    }
    `)

    add(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ), "SA-background", `
    /* background to website */
    .project-lower-container {
        background-color: transparent !important;
    }
    #view, body {
        background-color: var(--background-color) !important;
    }
    /*color on navigation bar */
    #navigation {
        background-color: var(--main-blue);
    }
    .inner.mod-splash:not(.inner.mod-splash:nth-of-type(1)) {
        margin-top: 0px;
    }
    .link.right.messages a {
        background-image: url(${addon.self.dir}/Icons/Messages/Messages.svg) !important;
        background-size: 80% !important;
    }
    .link.right.mystuff a {
        background-image: url(${addon.self.dir}/Icons/Folder/MyStuff.svg) !important;
        background-size: 80% !important;
    }
    `)

    add(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ), "SA-search-input", `
    #frc-q-1088, #search-input{
        padding-left: 30px !important;
        padding-right: 30px !important;
        border-radius: 100px !important;
        text-align: center;
    }
    `)

    add(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ), "SA-password-and-username", `
    .input#frc-username-1088, .input#frc-password-1088 {
        border-radius: 100px;
        z-index: 1;
        text-align: center;
    }
    `)

    add(matchesURL("/")||( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ), "SA-hide-arrow-profile", `
    .user-info::after, .caret, .account-nav_dropdown-caret-position_295CX {
        display: none !important;
    }
    `)

    add(matchesURL("/"), "SA-a-project", `
    .img-added .SA-a-project-user-image img {
        border-radius: 5px;
        width: 30px;
        height: 30px;
    }
    .img-added .SA-a-project-user-image {
        display: inline-block !important;
        width: 30px;
        height: 30px;
        margin-right: 10px;
        margin-top: 10px;
    }
    .img-added.thumbnail-creator {
        text-align: center;
    }
    .img-added.thumbnail-creator a:not(.SA-a-project-user-image) {
        display: unset !important;
        position: relative;
        top: calc(-.8462em);
    }
    .box-content .carousel {
        padding-bottom: 10px;
    }
    .thumbnail-image img{
        border-radius: 10px;
    }

    .slick-track ::-webkit-scrollbar {
        width: 15px;
    }
    .slick-track ::-webkit-scrollbar-track {
        background: var(--scrollbar-gray);
        border: 5px solid var(--box-gray);
        border-radius: 100px;
    }
    .slick-track ::-webkit-scrollbar-thumb {
        background: var(--main-blue);
        border-radius: 100px;
    }
    .thumbnail .thumbnail-loves, .thumbnail .thumbnail-favorites, .thumbnail .thumbnail-remixes, .thumbnail .thumbnail-views {
        margin-right: 50% !important;
        margin-left: 50% !important;
        color: var(--main-text-color);
    }
    @media (prefers-color-scheme: dark) {
        .thumbnail-remixes:before {
            background-image: url(${addon.self.dir}/Icons/Remix/RemixTypeWhite.svg) !important;
        }
        .thumbnail-loves:before {
            background-image: url(${addon.self.dir}/Icons/Love/LoveTypeWhite.svg) !important;
        }
    }

    `)

    add( ( ( matchesURL("/projects/*") && (!matchesURL("/projects/*/editor/")) ) ), "SA-project-test", `
    .inplace-input {
        border: 2px dashed #ffffff88 !important;
    }
    .see-inside-button {
        background-color: var(--main-blue);
    }
    .share-date {
        color: var(--main-text-color) !important;
    }
    .title {
        margin: auto 0px;
    }
    .stage_stage_1fD7k {
        border: none !important;
    }
    .project-header .avatar {
        /* filter: drop-shadow(0px 0px 5px); */
        width: 80px !important;
        height: 80px !important;
        padding: 10px;
    }

    .comments-container {
        box-shadow: var(--box-shadow) var(--projects-color-a-5) !important;
        background-color: var(--box-gray) !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: none !important;
        padding: 0 !important;
    }
    .comments-container .comments-header h4 {
        background-color: var(--projects-color-a-3) !important;
        border-radius: 100px;
        padding: 15px;
        color: var(--button-text-color) !important;
        ${ addon.settings.get("BoxIcons") ? `padding-left: 50px; background-image: url(${addon.self.dir}/Icons/Messages/Messages.svg);` : "" }
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 40px 40px;

        background-color: var(--projects-color-c-3);
        line-height: 1.1rem;
        font-size: 1.1rem;
    }
    .comments-container .comments-header {
        background-color: var(--projects-color-a-1) !important;
        height: fit-content !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 8px 20px !important;
        flex-wrap: unset;
        border-radius: 10px 10px 0 0 !important;
    }
    .comments-container .comments-content {
        background-color: var(--projects-color-a-2) !important;
        padding-bottom: 0px;
    }
    .comments-root-reply {
        padding: 20px 20px 0px 20px;
    }
    .comments-list {
        padding: 20px 20px 0 20px;
    }
    /* bottom part of box */
    .comments-container .comments-root-reply, .comments-container .comments-list {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .column {
        margin-left: 30px;
    }

    .remix-list {
        box-shadow: var(--box-shadow) var(--projects-color-e-5) !important;
        margin-bottom: 30px;
        border-radius: 10px;
    }
    .studio-list {
        box-shadow: var(--box-shadow) var(--projects-color-c-5) !important;
        border-radius: 10px;
    }
    .remix-list, studio-list {
        background-color: var(--box-gray) !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: none !important;
        padding: 0 !important;
    }
    .remix-list .list-header {
        background-color: var(--projects-color-e-1) !important;
    }
    .studio-list .list-header {
        background-color: var(--projects-color-c-1) !important;
    }
    .list-header {
        height: fit-content !important;
        border: none !important;
        padding: 8px 20px !important;
        flex-wrap: unset;
        border-radius: 10px 10px 0 0 !important;
    }
    .remix-list .list-title {
        background-color: var(--projects-color-e-3) !important;
        ${ addon.settings.get("BoxIcons") ? `padding-left: 50px; background-image: url(${addon.self.dir}/Icons/Remix/WhatTheCommunityIsRemixing.svg);` : "" }
    }
    .studio-list .list-title {
        background-color: var(--projects-color-c-3) !important;
        ${ addon.settings.get("BoxIcons") ? `padding-left: 50px; background-image: url(${addon.self.dir}/Icons/Studio/ScratchDesignStudio.svg);` : "" }
    }
    .list-title {
        border-radius: 100px;
        padding: 15px;
        color: var(--button-text-color) !important;
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 40px 40px;

        line-height: 1.1rem !important;
        font-size: 1.1rem !important;
        margin-left: 0 !important;
    }
    .remix-list .thumbnail-column {
        background-color: var(--projects-color-e-2) !important;
    }
    .studio-list .thumbnail-column {
        background-color: var(--projects-color-c-2) !important;
    }
    .thumbnail-column {
        border-radius: 0px 0px 10px 10px;
    }
    .preview .remix-list, .preview .studio-list {
        flex-direction: unset !important;
    }
    .list-header-link {
        margin-right: 0 !important;
    }
    .remix-list .list-header-link a {
        background-color: var(--projects-color-e-3);
    }
    .studio-list .list-header-link a {
        background-color: var(--projects-color-c-3);
    }
    .list-header-link a {
        background-image: url(${addon.self.dir}/Icons/ShowMore/ViewAll.svg) !important;
        height: 17.594px;
        width: 17.594px;
        border-radius: 100px;
        padding: 15px;
        font-size: 0px;
        float: right;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 40px 40px;
    }
    .box-header a:empty {
        display: none;
    }

    .replies.collapsed>.comment:last-of-type:after {
        background: linear-gradient(rgba(230, 240, 255, 0), var(--box-gray));
    }
    .guiPlayer.fullscreen .stage-header_stage-button-icon_3zzFK {
        background-image: url((${addon.self.dir}/Icons/Player/ProjectFullScreen.svg) !important;
    }
    /* SA-d-project */
    .scratchtoolsOnline {
        background-color: var(--box-gray) !important;
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        border: none !important;
        box-shadow: var(--box-shadow) var(--projects-color-d-5);
        margin-top: 32px;
    }
    .scratchtoolsOnline .box-head h4 {
        border-radius: 100px !important;
        padding: 15px !important;
        color: var(--button-text-color) !important;
        background-repeat: no-repeat !important;
        background-position: 10px center !important;
        background-size: 40px 40px !important;
        background-color: var(--projects-color-d-3) !important;
        display: inline-block !important;
        float: left !important;
        line-height: 1.1rem !important;
        font-size: 1.1rem !important;
        ${ addon.settings.get("BoxIcons") ? "padding-left: 50px !important;" : "" }
    }
    .scratchtoolsOnline .box-head {
        height: var(--box-header-height) !important;
        border: none !important;
        display: block !important;
        clear: both !important;
        margin: 0 !important;
        border-radius: 10px 10px 0 0 !important;
        padding: 8px 20px !important;
        overflow: hidden !important;
        background-color: var(--projects-color-d-1) !important;
    }
    .scratchtoolsOnline .box-content {
        background-color: var(--projects-color-d-2) !important;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 20px !important;
    }
    @media only screen and (max-width: 767px) {
        .preview .preview-row.force-row {
            flex-direction: column;
        }
    }
    .preview .remix-list .thumbnail-column, .preview .studio-list .thumbnail-column {
        max-width: none;
    }
    `)

    if (matchesURL("/")) {

        // add class

        async function classAdd (_querySelector, _className) {
            let rem = await addon.tab.waitForElement(_querySelector)
            rem.classList += _className;
        }

        // console.log(addon.tab.scratchMessage("Comments"))

        classAdd(".activity", " SA-activity SA-a-project")
        classAdd(".news", " SA-scratchNews SA-a-project")
        classAdd(".scratchtoolsCustomStudio", " SA-d-project")

        async function remB(){
            let rem_a = document.querySelector(".thumbnail-creator:not(.read)")
            // let rem = document.createElement("div")
            if (rem_a == undefined) return;
            rem_a.classList.add("read")
            let rem_b = rem_a.querySelector("a")
            // let rem_a = document.createElement("div")
            // let rem_b = document.createElement("a")
            let user
            try {

                user = await (await fetch(rem_b.href.replace("https://", "https://api."))).json()
            } catch (error) {
                // console.log(error)
            }
            if (!(user.profile == undefined)) {
                // let img = document.createElement("img")
                let img
                new Promise((resolve) => {
                    img = new Image()
                    img.onload = () => resolve(img)
                    img.src = user.profile.images["90x90"]
                })
                let rem = document.createElement("a")
                rem.className = "SA-a-project-user-image"
                rem.href = rem_b.href
                rem.append(img)
                rem_a.insertBefore(rem, rem_b)
                rem_a.classList.add("img-added")
            }

            // console.log(rem_a, img)
        }
        if(addon.settings.get("BoxProcjetUserProfilePicture")){
            setInterval(() => {
                remB()
            }, 50);
        }

        await new Promise((resolve, reject) => {
            setTimeout(async function(){
                await addon.tab.waitForElement(".inner.mod-splash")
                resolve();
            })
        })

        let list_name1 = [
            addon.tab.scratchMessage("splash.featuredProjects"),
            addon.tab.scratchMessage("splash.featuredStudios"),
            addon.tab.scratchMessage("splash.communityRemixing"),
            addon.tab.scratchMessage("splash.communityLoving"),
            addon.tab.scratchMessage("splash.projectsLovedByScratchersFollowing"),
            addon.tab.scratchMessage("splash.scratchDesignStudioTitle"),
        ]
        let list_name2 = [
            " SA-featuredProject SA-a-project",
            " SA-featuredStudios SA-a-project",
            " SA-communityRemixing SA-b-project",
            " SA-communityLoving SA-b-project",
            " SA-a-projectsLovedByScratchersFollowing SA-b-project",
            " SA-scratchDesignStudioTitle SA-b-project",
        ]
        let rem_elements = [

        ]
        // console.log(list_name1, list_name2)

        async function remA(){
            while (true) {
                let rem = await addon.tab.waitForElement(".box .box-header h4", {markAsSeen: true,})
                rem_elements.push(rem.parentNode.parentNode)
                // let rem = document.createElement("h4")
                if (list_name1.includes(rem.innerText)) {
                    // console.log(list_name2[list_name1.indexOf(rem.innerText)])
                    rem.parentNode.parentNode.classList += list_name2[list_name1.indexOf(rem.innerText)];
                }
            }
        }
        remA()
        addEventListener("keydown", (e)=>{
            if (e.key == " ") {
                console.log(rem_elements)
            }
        })
    }
}
