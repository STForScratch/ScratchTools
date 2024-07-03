export default async function({ feature, console }) {
    let tabName = ScratchTools.Storage["customtab"];
    
    function updateRedirect() {
        const exploreLink = document.querySelector('li.link.explore > a');
        if (exploreLink && window.location.href === 'https://scratch.mit.edu/explore/projects/all') {
            exploreLink.href = `https://scratch.mit.edu/explore/projects/${tabName}`;
            window.location.href = exploreLink.href;
        }
    }

    await ScratchTools.waitForElement('li.link.explore > a');
    updateRedirect();

    feature.options.addEventListener('changed', async ({ key, value }) => {
        if (key === 'customtab') {
            tabName = value;
            updateRedirect();
        }
    });
}