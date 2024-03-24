const app = () => {

    const state = new Proxy({
        data: [],
        isLoaded: false,
        isModalOpen: false,
        currentUserId: null,
    }, {
        set(target, property, value) {
            target[property] = value

            if (property === 'isLoaded') {
                dataFetch(state)
            }

            if (property === 'data') {
                dataRender(state)
            }

            if (property === 'isModalOpen') {
                modalRender(state)
            }
        }
    })

    const mainLayoutRender = () => {
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')


        const header = document.createElement('header')
        header.classList.add('header')

        const main = document.createElement('main')
        main.classList.add('main')

        const footer = document.createElement('footer')
        footer.classList.add('footer')

        wrapper.appendChild(header)
        wrapper.appendChild(main)
        wrapper.appendChild(footer)

        document.body.appendChild(wrapper)
    }

    const headerRender = () => {
        const header = document.querySelector('.header')

        const image = document.createElement('img')
        image.classList.add('logo')
        image.src = './img/logo.svg'
        image.height = 100

        const button = document.createElement('button')
        button.classList.add('btn')
        button.textContent = 'Войти'

        header.appendChild(image)
        header.appendChild(button)
    }

    const footerRender = () => {
        const footer = document.querySelector('.footer')

        const year = document.createElement('div')
        year.textContent = '2024'
        const madeBy = document.createElement('div')
        madeBy.textContent = 'Выполнили в рамках ПИШ'

        footer.appendChild(year)
        footer.appendChild(madeBy)
    }

    const dataFetch = (state) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                state.data = data
            })
    }

    const dataRender = (state) => {
        const main = document.querySelector('.main')
        main.innerHTML = ''

        state.data.forEach(user => {
            const card = document.createElement('div')
            card.classList.add('card')

            const avatar = document.createElement('img')
            avatar.classList.add('card-avatar')
            avatar.src = 'https://placehold.co/128x128'
            avatar.width = 64
            avatar.height = 64

            const name = document.createElement('h2')
            name.classList.add('card-name')
            name.textContent = `${user.name} (${user.username})`

            const address = document.createElement('div')
            address.classList.add('card-address')
            const {geo, ...addresses} = user.address
            address.textContent = Object.values(addresses).join(' ')

            const more = document.createElement('button')
            more.classList.add('card-more')
            more.textContent = 'подробнее'

            more.addEventListener('click', () => {
                state.currentUserId = user.id
                state.isModalOpen = true
            })

            card.appendChild(avatar)
            card.appendChild(name)
            card.appendChild(address)
            card.appendChild(more)

            main.appendChild(card)
        })
    }

    const modalRender = (state) => {
        if (state.isModalOpen === true) {
            const currentUser = state.data.find((user) => user.id === state.currentUserId)

            const modal = document.createElement('div')
            modal.classList.add('modal')

            const modalContent = document.createElement('div')
            modalContent.classList.add('modal-content')

            const modalAvatar = document.createElement('img')
            modalAvatar.classList.add('card-avatar')
            modalAvatar.src = 'https://placehold.co/128x128'
            modalAvatar.width = 64
            modalAvatar.height = 64

            const modalName = document.createElement('div')
            modalName.classList.add('card-name')
            modalName.textContent = `${currentUser.name} (${currentUser.username})`

            const modalAddress = document.createElement('div')
            modalAddress.classList.add('card-address')
            const {geo, ...addresses} = currentUser.address
            modalAddress.textContent = Object.values(addresses).join(' ')

            const modalPhone = document.createElement('div')
            modalPhone.classList.add('card-phone')
            modalPhone.textContent = currentUser.phone

            const modalSite = document.createElement('div')
            modalSite.classList.add('card-phone')
            modalSite.textContent = currentUser.website

            const modalClose = document.createElement('button')
            modalClose.classList.add('modal-close')
            modalClose.textContent = 'Закрыть'

            modalClose.addEventListener('click', () => {
                state.currentUserId = null
                state.isModalOpen = false
            })

            modalContent.appendChild(modalAvatar)
            modalContent.appendChild(modalName)
            modalContent.appendChild(modalAddress)
            modalContent.appendChild(modalPhone)
            modalContent.appendChild(modalSite)
            modalContent.appendChild(modalClose)

            modal.appendChild(modalContent)

            document.body.appendChild(modal)
        }

        if (state.isModalOpen === false) {
            document.querySelector('.modal').remove()
        }
    }

    mainLayoutRender()
    headerRender()
    footerRender()

    document.addEventListener('DOMContentLoaded', () => {
        state.isLoaded = true;
    })

    window.addEventListener('load', async () => {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./sw.js')
            } catch (e) {
                console.error(e)
            }
        }
    })
}

app();