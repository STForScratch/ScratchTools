createModal("What's New in ScratchTools v2.6", "This new version has made a lot of changes. First, it added a beta feature that hides likely generic projects from the trending page. It also added some significant UI updates to the settings popup to make it look much nicer.")
function createModal(title, description) {
var div = document.createElement('div')
    div.className = 'ReactModalPortal ScratchToolsNew'
    div.innerHTML = `<div class="ReactModal__Overlay ReactModal__Overlay--after-open modal_modal-overlay_1Lcbx"><div style="width: 50vw;" class="ReactModal__Content ReactModal__Content--after-open modal_modal-content_1h3ll prompt_modal-content_1BfWj" tabindex="-1" role="dialog" aria-label="New Variable"><div style="width: 50vw;" class="box_box_2jjDp" dir="ltr"><div class="modal_header_1h7ps"><div class="modal_header-item_2zQTd modal_header-item-title_tLOU5">${title}</div><div class="modal_header-item_2zQTd modal_header-item-close_2XDeL"></div></div><div class="prompt_body_18Z-I box_box_2jjDp"><div class="prompt_label_tWjYZ box_box_2jjDp">${description}</div><center><div class="prompt_button-row_3Wc5Z box_box_2jjDp"><a href="https://github.com/STForScratch/ScratchTools/releases/tag/v2.5.0" target="_blank" style="margin-right: 1vw;"><button class="prompt_ok-buttonScratchTools"><span>Release Info</span></button></a><button class="prompt_ok-button_3QFdD"><span>OK</span></button></div></center></div></div></div></div>`
    document.body.appendChild(div)
var style = document.createElement('style')
style.innerHTML = `
@media only screen and (max-width : 479px){#view{text-align:center}.inner{margin:0 auto;width:100%}}@media only screen and (min-width : 480px)and (max-width : 767px){#view{text-align:center}.inner{margin:0 auto;width:480px}}@media only screen and (min-width : 768px)and (max-width : 941px){#view{text-align:center}.inner{margin:0 auto;width:768px}}@media only screen and (min-width : 942px){.inner{margin:0 auto;width:942px}}html,body{display:block;margin:0;background-color:#4280d7;padding:0;color:#575e75;font-family:"Helvetica Neue","Helvetica",Arial,sans-serif}h1,h2,h3,h4{margin:0;border:0;padding:0;color:#575e75;font-weight:bold}h1{font-size:2.5rem;font-weight:bold}h2{font-size:2rem;font-weight:bold}h3{font-size:1.4rem;font-weight:bold}h4{font-size:1rem;font-weight:bold}h5{text-transform:uppercase;letter-spacing:2px;font-size:.85rem;font-weight:bold}p.legal{font-size:.8rem}p.intro{font-size:1.1rem}p.callout{margin:1.5em 0;border:1px solid rgba(0,0,0,.1);border-radius:.5rem;background-color:rgba(77,151,255,.1);padding:1.25em}p.callout.orange{background-color:rgba(244,157,37,.1)}p a{white-space:nowrap}b,strong{font-weight:bold}a{cursor:pointer;color:#4d97ff;font-weight:bold}a:link,a:visited,a:active{text-decoration:none;color:#4d97ff}a:hover{text-decoration:none;color:#4280d7}.empty{border:1px solid rgba(0,0,0,.1);border-radius:5px;background-color:rgba(77,151,255,.1);padding:10px;text-align:center;line-height:2rem;color:#575e75}.empty h4{color:#575e75}h1,h2,h3,h4,h5,p{line-height:1.7em;color:#575e75}p{font-size:1rem;font-weight:normal}::selection{background-color:rgba(77,151,255,.25)}ol,ul{padding-left:20px;line-height:1.5em;font-size:1rem;font-weight:normal}ol li,ul li{margin:.75em 0}dl{line-height:1.5rem;font-size:1rem;font-weight:normal}dl dt{font-weight:bold}dl dd{margin:0}#view{display:inline-block;margin-top:50px;background-color:#fcfcfc;padding:20px 0;min-width:100%;min-height:680px}

/* #E5F0FF */ /* #E9F1FC */ /* #D9E3F2 */ /* 90% transparent version of motion-primary */ /* #FFFFFF */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 15% transparent version of black */ /* #575E75 */ /* #4C97FF */ /* #3373CC */ /* 35% transparent version of motion-primary */ /* 15% transparent version of motion-primary */ /* #FF661A */ /* #E64D00 */ /* #CF63CF */ /* #BD42BD */ /* #FFAB19 */ /* #FF8C1A */ /* #0FBD8C */ /* #0FBD8C */ /* #FF8C1A */ /* #FFB366 */ /* #FF8C1A */ /* #0FBD8C */ /* #0B8E69 */ /* 35% transparent version of extensions-primary */ /* opaque version of extensions-transparent, on white bg */ /* lighter than motion-primary */ /* make sure to keep these in sync with other constants,
e.g. STAGE_DIMENSION_DEFAULTS in lib/screen-utils.js */ /* layout contants from `+"`layout-constants.js`"+` */ /*
    Contains constants for the z-index values of elements that are part of the global stack context.
    In other words, z-index values that are "inside" a component are not added here.
    This prevents conflicts between identical z-index values in different components.
*/ /* Toolbox z-index: 40; set in scratch-blocks */ /* tooltips should go over add buttons if they overlap */ /* monitors go over add buttons */ /* "ask" block text input goes above monitors */ /* menu-bar should go over monitors, alerts and tutorials */ /* Block drag z-index: 1000; default 50 is overriden in blocks.css */ /* so it is draggable into other panes */ /* in most interfaces, the context menu is always on top */ .modal_modal-overlay_1Lcbx {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 510;
    background-color: hsla(215, 100%, 65%, 0.9);
} .modal_modal-content_1h3ll * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} .modal_modal-content_1h3ll {
    margin: 100px auto;
    outline: none;
    border: 4px solid hsla(0, 100%, 100%, 0.25);
    padding: 0;
    border-radius: 0.5rem;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: hsla(225, 15%, 40%, 1);
    overflow: hidden;
} .modal_modal-content_1h3ll.modal_full-screen_FA4cr {
    position: absolute;

    display: -webkit-box;

    display: -webkit-flex;

    display: -ms-flexbox;

    display: flex;
    height: 100%;
    width: 100%;

    overflow-y: auto;
    -webkit-overflow-scrolling: 'touch';
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    background-color: hsla(215, 75%, 95%, 1);

    /* Default modal resets */
    margin: 0;
    border: none;
    border-radius: 0;
} /*
    Modal header has 3 items:
    |filter     title       x|

    Use the same width for both side item containers,
    so that title remains centered
*/ .modal_header_1h7ps {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    height: 3.125rem;

    -webkit-box-sizing: border-box;

            box-sizing: border-box;
    width: 100%;
    background-color: hsla(215, 100%, 65%, 1);

    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: normal;
} .modal_header-item_2zQTd {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
        -ms-flex-align: center;
            align-items: center;
    padding: 1rem;
    text-decoration: none;
    color: hsla(0, 100%, 100%, 1);
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
} [dir="ltr"] .modal_header-image_2KMDd {
    margin-right: 0.5rem;
} [dir="rtl"] .modal_header-image_2KMDd {
    margin-left: 0.5rem;
} .modal_header-item-filter_3W-ah {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-basis: 20rem;
        -ms-flex-preferred-size: 20rem;
            flex-basis: 20rem;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
} .modal_header-item-title_tLOU5 {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    -webkit-flex-shrink: 0;
        -ms-flex-negative: 0;
            flex-shrink: 0;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    letter-spacing: 0.4px;
    cursor: default;
} [dir="ltr"] .modal_header-item-title_tLOU5 {
    margin: 0 -20rem 0 0;
} [dir="rtl"] .modal_header-item-title_tLOU5 {
    margin: 0 0 0 -20rem;
} .modal_full-screen_FA4cr [dir="ltr"] .modal_header-item-title_tLOU5 {
    margin: 0 0 0 -20rem;
} .modal_full-screen_FA4cr [dir="rtl"] .modal_header-item-title_tLOU5 {
    margin: 0 -20rem 0 0;
} .modal_header-item-close_2XDeL {
    -webkit-flex-basis: 20rem;
        -ms-flex-preferred-size: 20rem;
            flex-basis: 20rem;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
            justify-content: flex-end;
    z-index: 1;
} .modal_full-screen_FA4cr .modal_header-item-close_2XDeL {
    -webkit-box-ordinal-group: 0;
    -webkit-order: -1;
        -ms-flex-order: -1;
            order: -1;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
} .modal_back-button_2ej6v {
    font-weight: normal;
    padding-right: 0;
    padding-left: 0;
} [dir="rtl"] .modal_back-button_2ej6v img {
    -webkit-transform: scaleX(-1);
        -ms-transform: scaleX(-1);
            transform: scaleX(-1);
} .modal_header-item-help_UZFrJ {
    padding: 0;
    z-index: 1;
} [dir="ltr"] .modal_header-item-help_UZFrJ {
    margin-right: -4.75rem;
} [dir="rtl"] .modal_header-item-help_UZFrJ {
    margin-left: -4.75rem;
} .modal_help-button_dLhZu {
    font-weight: normal;
    font-size: 0.75rem;
} [dir="ltr"] .modal_help-button_dLhZu {
    padding-right: 0;
} [dir="rtl"] .modal_help-button_dLhZu {
    padding-left: 0;
}

/* #E5F0FF */ /* #E9F1FC */ /* #D9E3F2 */ /* 90% transparent version of motion-primary */ /* #FFFFFF */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 25% transparent version of ui-white */ /* 15% transparent version of black */ /* #575E75 */ /* #4C97FF */ /* #3373CC */ /* 35% transparent version of motion-primary */ /* 15% transparent version of motion-primary */ /* #FF661A */ /* #E64D00 */ /* #CF63CF */ /* #BD42BD */ /* #FFAB19 */ /* #FF8C1A */ /* #0FBD8C */ /* #0FBD8C */ /* #FF8C1A */ /* #FFB366 */ /* #FF8C1A */ /* #0FBD8C */ /* #0B8E69 */ /* 35% transparent version of extensions-primary */ /* opaque version of extensions-transparent, on white bg */ /* lighter than motion-primary */ /* make sure to keep these in sync with other constants,
e.g. STAGE_DIMENSION_DEFAULTS in lib/screen-utils.js */ /* layout contants from `+"`layout-constants.js`"+` */ .prompt_modal-content_1BfWj {
    width: 360px;
} .prompt_body_18Z-I {
    background: hsla(0, 100%, 100%, 1);
    padding: 1.5rem 2.25rem;
} .prompt_body_18Z-I input[type="checkbox"],
.prompt_body_18Z-I input[type="radio"] {
    margin: 3px;
} .prompt_label_tWjYZ {
    font-weight: 500;
    margin: 0 0 0.75rem;
} .prompt_disabled-label_3Y-7h {
    opacity: 0.5;
} .prompt_variable-name-text-input_1iu8- {
    margin-bottom: 1.5rem;
    width: 100%;
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    border-radius: 5px;
    padding: 0 1rem;
    height: 3rem;
    color: hsla(225, 15%, 40%, 0.75);
    font-size: .875rem;
} .prompt_info-message_-WcQL {
    font-weight: normal;
    font-size: .875rem;
    margin-bottom: 1.5rem;
    text-align: center;
} .prompt_options-row_36JmB {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    font-weight: normal;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-bottom: 1.5rem;
} .prompt_button-row_3Wc5Z {
    font-weight: bolder;
    text-align: right;
} .prompt_button-row_3Wc5Z button {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    background: white;
    border: 1px solid hsla(0, 0%, 0%, 0.15);
    font-weight: 600;
    font-size: 0.85rem;
} .prompt_button-row_3Wc5Z button.prompt_ok-button_3QFdD {
    background: hsla(215, 100%, 65%, 1);
    border: hsla(215, 100%, 65%, 1);
    color: white;
} [dir="ltr"] .prompt_button-row_3Wc5Z button + button {
    margin-left: 0.5rem;
} [dir="rtl"] .prompt_button-row_3Wc5Z button + button {
    margin-right: 0.5rem;
} .prompt_cloud-option_1jjSa {
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    border-top: 1px dashed hsla(0, 0%, 0%, .25);
    overflow: visible;
    padding: 1rem 0;
    text-align: center;
    width: 100%;
    margin: 0 auto;
} .prompt_cloud-option-text_P1r8J {
    opacity: .5;
}

`
document.body.appendChild(style)
    document.querySelector('button.prompt_ok-button_3QFdD').onclick = function() {
        document.querySelector('div.ScratchToolsNew').remove()
    }
}
