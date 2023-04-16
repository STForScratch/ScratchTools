ScratchTools.styles.add(`

.project-loves:before {
    background-image: url(${ScratchTools.Resources["love-gray"]});
    opacity: .5;
}

.project-favorites:before {
    background-image: url(${ScratchTools.Resources["fav-gray"]});
    opacity: .5;
}

.project-remixes:before {
    background-image: url(${ScratchTools.Resources["remix-gray"]});
    opacity: .8;
}

.project-views:before {
    background-image: url(${ScratchTools.Resources["views-gray"]});
    opacity: .8;
}

.project-loves.loved:before {
    opacity: 1;
}

.project-favorites.favorited:before {
    opacity: 1;
}

`, "old-icons")