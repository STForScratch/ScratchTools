
const TargetSearchProjectsLinksFeature = {
    targetAndRemoveDuplicates: async () => {
        const projectDescriptions = await ScratchTools.waitForElements('.project-description', function (element) {
            TargetSearchProjectsLinksFeature.handleProjectDescription(element);
        });
    },

    handleProjectDescription: (projectDescription) => {
        const links = Array.from(projectDescription.querySelectorAll('a[href*="/search/projects?q="]'));

        if (links.length > 1) {
            const uniqueLinks = new Set();

            links.forEach(link => {
                const linkHref = link.getAttribute('href');

                if (!uniqueLinks.has(linkHref)) {
                    uniqueLinks.add(linkHref);
                } else {
                   
                    link.style.display = 'none';
                }
            });
        }
    }
};

TargetSearchProjectsLinksFeature.targetAndRemoveDuplicates();

