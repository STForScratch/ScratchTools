const updateProjectDescription = () => {
    const projectDescriptions = document.querySelectorAll('.project-description');
    let found = false;

    projectDescriptions.forEach((projectDescription) => {
        const descriptionText = projectDescription.innerHTML;

        if (descriptionText.trim() !== '') {
            const tagRegex = /<a\s+href="[^"]*"[^>]*>[^<]*<\/a>/g;
            const tags = descriptionText.match(tagRegex);

            if (tags) {
                const uniqueTags = new Set();
                const updatedDescription = descriptionText.replace(tagRegex, (match) => {
                    if (!uniqueTags.has(match)) {
                        uniqueTags.add(match);
                        return match;
                    } else {
                        return '';
                    }
                });
                projectDescription.innerHTML = updatedDescription;
            }

            found = true;
        }
    });
};
window.addEventListener('load', updateProjectDescription);
