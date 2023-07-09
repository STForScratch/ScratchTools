
async function main() {
    if (!window.location.pathname.startsWith('/users/')) return

    let username = window.location.pathname.split('/').reverse().find(v => v.length > 0)
    if (!username) return

    let locationElement = document.querySelector('.location')
    if (!locationElement) return

    if (locationElement.textContent == 'Location not given') {
        console.log('it is location not given', username)
        let data = await (await fetch(`https://api.scratch.mit.edu/users/${username}/`)).json()

        console.log('got data: ', JSON.stringify(data))

        let country = data['profile']['country']
        locationElement.textContent = country

        let badge = document.createElement('span')
        badge.textContent = '?'
        badge.title = 'Location not given'
        Object.assign(badge.style, {
            userSelect: 'none',
            backgroundColor: 'rgb(193 193 193)',
            borderRadius: '99px',
            padding: '0.9px 4.6px',
            marginLeft: '6px',
            fontSize: '9.4px',
            color: 'white',
            fontWeight: '700',
            bottom: '1px',
            position: 'relative',
            textShadow: 'none'
        })

        locationElement.appendChild(badge)
    }
}

try {
    main()
} catch (e) {
    console.error(e)
}


// background-color: #c2b7b7;
// border-radius: 999px;
// padding: 2px 5px;
// margin-left: 1px;
// font-size: 10px;
// color: white;
// font-weight: 700;
// bottom: 1px;
// position: relative;
// text-shadow: none;
// }