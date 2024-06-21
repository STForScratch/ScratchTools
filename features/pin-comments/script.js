export default async function ({ feature, console }) {
    window.feature = feature

    let pinned = await (await fetch(`https://data.scratchtools.app/pinned/${feature.redux.getState().preview.projectInfo.id}/`)).json()
    let { username: author } = feature.redux.getState().preview.projectInfo.author
    let { id } = feature.redux.getState().preview.projectInfo
    let { username } = feature.redux.getState().session?.session?.user

    let AUTHOR = author

    if (pinned.commentId) {
        ScratchTools.waitForElements(".comments-list", async function(list) {
            let data = await (await fetch(`https://api.scratch.mit.edu/users/${pinned.author}/`)).json()
            if (data) {
                let box = document.createElement("div")
                box.className = "ste-pinned-comment"

                let h3 = document.createElement("h3")
                h3.textContent = "Pinned Comment"
                box.appendChild(h3)

                let comment = document.createElement("div")
                comment.className = "flex-row comment-container"
                box.appendChild(comment)

                let inner = document.createElement("div")
                inner.className = "flex-row comment"
                comment.appendChild(inner)

                let a = document.createElement("a")
                a.href = `/users/${pinned.author}/`
                inner.appendChild(a)
                
                let img = document.createElement("img")
                img.src = data.profile.images["90x90"]
                img.className = "avatar"
                a.appendChild(img)

                let main = document.createElement("div")
                main.className = "flex-row comment-body column"
                inner.appendChild(main)

                let topRow = document.createElement("div")
                topRow.className = "flex-row comment-top-row"
                main.appendChild(topRow)

                let author = document.createElement("a")
                author.href = `/users/${pinned.author}/`
                author.className = "username"
                author.textContent = data.username
                topRow.appendChild(author)

                let bubble = document.createElement("div")
                bubble.className = "comment-bubble"
                main.appendChild(bubble)

                let content = document.createElement("span")
                content.textContent = pinned.content
                content.className = "comment-content"
                bubble.appendChild(content)

                let bottomRow = document.createElement("div")
                bottomRow.className = "flex-row comment-bottom-row"
                bubble.appendChild(bottomRow)

                let time = document.createElement("span")
                time.className = "comment-time"
                time.textContent = `Comment pinned by @${AUTHOR}.`
                bottomRow.appendChild(time)

                let goTo = document.createElement("span")
                goTo.className = "comment-goto"
                bottomRow.appendChild(goTo)

                let goToLink = document.createElement("a")
                goToLink.href = `https://scratch.mit.edu/projects/${pinned.projectId}/#comments-${pinned.commentId}`
                goToLink.textContent = "view context"
                goTo.appendChild(goToLink)

                list.parentElement.insertBefore(box, list)
            }
        })
    }

    if (author === username) {
        ScratchTools.waitForElements("div.flex-row.comments-list > div > div.flex-row.comment", function (comment) {
            let actions = comment.querySelector("div.action-list")
            if (!actions || actions.querySelector(".comment-pin")) return;

            if (pinned.commentId?.toString() === comment.id.replace("comments-", "")) {
                let span = document.createElement("span")
                span.className = "comment-pin"
                let innerSpan = document.createElement("span")
                innerSpan.textContent = "Unpin"
                span.appendChild(innerSpan)
                actions.prepend(span)

                span.addEventListener("click", async function () {
                    ScratchTools.verifyUser(async function (token) {
                        let data = await (
                            await fetch("https://data.scratchtools.app/unpin/", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ token, project: id.toString() }),
                            })
                        ).json();

                        if (data.error) {
                            ScratchTools.modals.create({
                                title: "Error",
                                description:
                                    data.error,
                            });
                        } else {
                            ScratchTools.modals.create({
                                title: "Comment Unpinned",
                                description:
                                    "This comment has been unpinned. You may reload the page to see the change.",
                            });
                        }
                    })
                })
            } else {
                let span = document.createElement("span")
                span.className = "comment-pin"
                let innerSpan = document.createElement("span")
                innerSpan.textContent = "Pin"
                span.appendChild(innerSpan)
                actions.prepend(span)

                span.addEventListener("click", async function () {
                    ScratchTools.verifyUser(async function (token) {
                        let data = await (
                            await fetch("https://data.scratchtools.app/pin/", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ token, project: id.toString(), author: comment.querySelector("a").href.split("/")[4], id: comment.id.replace("comments-", ""), content: comment.querySelector(".comment-content").textContent }),
                            })
                        ).json();

                        if (data.error) {
                            ScratchTools.modals.create({
                                title: "Error",
                                description:
                                    data.error,
                            });
                        } else {
                            ScratchTools.modals.create({
                                title: "Comment Pinned",
                                description:
                                    "This comment has been pinned and you may reload the page to see. Please only pin appropriate comments. If the comment you pinned is not appropriate, it may be removed and you may lose the ability to pin comments in the future.",
                            });
                        }
                    })
                })
            }
        })
    }
}
