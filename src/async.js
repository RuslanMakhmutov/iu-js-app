const fetch = require('node-fetch')

// параллельные запросы, по завершении всех выводятся в правильном порядке
Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then((res) => res.json())
        .then((data) => {
            // console.log(1)
            return data.filter((item) => item.id % 2 === 0)
        }),
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then((res) => res.json())
        .then((data) => {
            // console.log(2)
            return data.filter((item) => item.title[0] === 'a')
        }),
    fetch('https://jsonplaceholder.typicode.com/users/1/albums')
        .then((res) => res.json())
        .then((data) => {
            // console.log(3)
            return data.filter((item) => item.id > 5)
        })
])
    .then((data) => {
        console.log('комментарии с четным id:', data[0])
        console.log('фотографии с буквой "a" в начале title:', data[1])
        console.log('альбомы с id > 5:', data[2])
    })
    .catch((e) => {
        console.log(e)
    })

// // параллельные никак не связанные запросы, порядок вывода в консоли зависит от скорости ответа от сервера
// fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
//     .then((response) => response.json())
//     .then((data) => {
//         const evenComments = data.filter((item) => item.id % 2 === 0)
//         console.log('комментарии с четным id:', evenComments)
//     })
//
// fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
//     .then((response) => response.json())
//     .then((data) => {
//         const photosStartWithA = data.filter((item) => item.title[0] === 'a')
//         console.log('фотографии с буквой "a" в начале title:', photosStartWithA)
//     })
//
// fetch('https://jsonplaceholder.typicode.com/users/1/albums')
//     .then((response) => response.json())
//     .then((data) => {
//         const albumsHaveIdMoreThan5 = data.filter((item) => item.id > 5)
//         console.log('альбомы с id > 5:', albumsHaveIdMoreThan5)
//     })

// // последовательные запросы, по завершении всех выводятся в правильном порядке
// const printPlaceholders = async () => {
//     const data1 = await fetch(
//         'https://jsonplaceholder.typicode.com/posts/1/comments'
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(1)
//             return data.filter((item) => item.id % 2 === 0)
//         })
//     const data2 = await fetch(
//         'https://jsonplaceholder.typicode.com/albums/1/photos'
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(2)
//             return data.filter((item) => item.title[0] === 'a')
//         })
//     const data3 = await fetch(
//         'https://jsonplaceholder.typicode.com/users/1/albums'
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log(3)
//             return data.filter((item) => item.id > 5)
//         })
//     return [data1, data2, data3]
// }
//
// printPlaceholders().then((data) => {
//     console.log('комментарии с четным id:', data[0])
//     console.log('фотографии с буквой "a" в начале title:', data[1])
//     console.log('альбомы с id > 5:', data[2])
// })
