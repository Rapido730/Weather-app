const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSec = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent='Loading...'
    messageSec.textContent=''

    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent=data.error
        } else {
            messageOne.textContent = data.location
            messageSec.textContent = data.forecast
        }
    })
})
    
})