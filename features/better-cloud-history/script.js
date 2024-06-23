export default async function ({ feature, console }) {
    let avatars = {}

    let projectId = window.location.pathname.split("/")[2]

    let data = await (await fetch(`https://clouddata.scratch.mit.edu/logs?projectid=${projectId}&limit=40&offset=0`)).json()
    data.push(...(await (await fetch(`https://clouddata.scratch.mit.edu/logs?projectid=${projectId}&limit=40&offset=40`)).json()).filter((el) => !data.find((old) => old.timestamp === el.timestamp)))
    data.push(...(await (await fetch(`https://clouddata.scratch.mit.edu/logs?projectid=${projectId}&limit=40&offset=80`)).json()).filter((el) => !data.find((old) => old.timestamp === el.timestamp)))

    let currentOffset = 0

    let div = await ScratchTools.waitForElement("div.box-content.v-tabs-content")

    let table = makeTable()
    feature.self.hideOnDisable(table)
    div.appendChild(table)

    await addData(data)

    async function addData(data) {
        for (var i in data) {
            let tr = document.createElement("tr")

            let user = document.createElement("td")
            let a = document.createElement("a")
            a.href = `/users/${data[i].user}`

            let img = document.createElement("img")
            if (avatars[data[i].user]) {
                img.src = avatars[data[i].user]
            } else {
                let { images } = (await (await fetch(`https://api.scratch.mit.edu/users/${data[i].user}/`)).json()).profile
                img.src = images["90x90"]
                avatars[data[i].user] = images["90x90"]
            }
            a.appendChild(img)

            let span = document.createElement("span")
            span.textContent = data[i].user
            a.appendChild(span)

            user.appendChild(a)
            tr.appendChild(user)

            let action = document.createElement("td")
            action.textContent = data[i].verb.split("_")[0].toUpperCase()
            tr.appendChild(action)

            let variable = document.createElement("td")
            let varName = document.createElement("span")
            varName.textContent = data[i].name
            varName.className = "ste-cloud-variable"
            variable.appendChild(varName)
            tr.appendChild(variable)

            varName.addEventListener("click", function () {
                let varId = this.textContent

                if (!table.className.includes("sort")) {
                    table.querySelectorAll("tr").forEach(function (tr) {
                        if (!tr.querySelector("th")) {
                            if (tr.querySelector("td:nth-child(3)")?.textContent !== varId) {
                                tr.style.display = "none"
                                tr.classList.add("ste-cloud-dontshow")
                            }
                        }
                    })
                    table.classList.add("sort")
                } else {
                    table.querySelectorAll("tr").forEach(function (tr) {
                        tr.style.display = null
                        tr.classList.remove("ste-cloud-dontshow")
                    })
                    table.classList.remove("sort")
                }
            })

            let content = document.createElement("td")
            content.textContent = data[i].value
            content.className = "ste-cloud-content"
            tr.appendChild(content)

            let time = document.createElement("td")
            time.textContent = new Date(data[i].timestamp).toLocaleString()
            time.title = data[i].timestamp.toString()
            tr.appendChild(time)

            document.querySelector(".ste-cloud-table").appendChild(tr)
        }
    }

    function makeTable() {
        let table = document.createElement("table")
        table.className = "ste-cloud-table"

        let tr = document.createElement("tr")
        table.appendChild(tr)

        let user = document.createElement("th")
        user.textContent = "User"
        tr.appendChild(user)

        let action = document.createElement("th")
        action.textContent = "Action"
        tr.appendChild(action)

        let variable = document.createElement("th")
        variable.textContent = "Variable"
        tr.appendChild(variable)

        let content = document.createElement("th")
        content.textContent = "Content"
        tr.appendChild(content)

        let time = document.createElement("th")
        time.textContent = "Time"
        tr.appendChild(time)

        return table
    }
}