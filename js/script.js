// select element
const backdrop = document.querySelector('#backdrop')
const inpSignUpUsername = document.querySelector('#inp-signUp>input:nth-of-type(1)')
const inpSignUpEmail = document.querySelector('#inp-signUp>input:nth-of-type(2)')
const inpSignUpPassword = document.querySelector('#inp-signUp>input:nth-of-type(3)')
const inpSignUpBtn = document.querySelector('#inp-signUp>button')
const inpSignUpShowPassword = document.querySelector('#inp-signUp>i')
const errAlert = document.querySelector('#err-alert')
const inpSignInEmail = document.querySelector('#inp-signIn>input:first-of-type')
const inpSignInPassword = document.querySelector('#inp-signIn>input:last-of-type')
const inpSignInBtn = document.querySelector('#inp-signIn>button')
const inpSignInA = document.querySelector('#inp-signIn>a')
const inpSignInShowPassword = document.querySelector('#inp-signIn>i')
const list = document.querySelector('#list')
const main1 = document.querySelector('#main1')
const main2 = document.querySelector('#main2')
const backBtn = document.querySelector('#back-btn')
const searchInp = document.querySelector('#search')
const editList = document.querySelector('#edit-list')
const inpUsernameEdit = document.querySelector('#inp-username-edit')
const inpEmailEdit = document.querySelector('#inp-email-edit')
const inpPasswordEdit = document.querySelector('#inp-password-edit')
const saveEdit = document.querySelector('#save-edit')
const closeEdit = document.querySelector('#close-edit')
// select element


// symbol
const token = Symbol('tk')

const key = {
    ['token']: '67b6e6602bddacfb270cbdc6',
    ['endPoint']: 'users'
}
// symbol


// change backdrop
let flag = 1
backdrop.children[2].addEventListener('click', () => {
    if (flag % 2) {
        backdrop.style.transform = 'translateX(100%)'
        setTimeout(() => {
            backdrop.children[0].innerText = 'Hello, Friend!'
            backdrop.children[1].innerText = 'Enter your personal details and start journey with us'
            backdrop.children[2].innerText = 'Sign Up'
        }, 500)
    } else {
        backdrop.style.transform = 'translateX(0)'
        setTimeout(() => {
            backdrop.children[0].innerText = 'Welcome Back!'
            backdrop.children[1].innerText = 'To keep connected with us please login with your personal info'
            backdrop.children[2].innerText = 'Sign In'
        }, 500)
    }
    flag++
})
// change backdrop


// error handler
function errHandler(message, bgColor) {
    errAlert.style.transform = 'scale(1)'
    errAlert.innerText = message
    errAlert.style.backgroundColor = bgColor
    setTimeout(() => {
        errAlert.style.transform = 'scale(0)'
        inpSignUpUsername.value = ''
        inpSignUpEmail.value = ''
        inpSignUpPassword.value = ''
        inpSignInEmail.value = ''
        inpSignInPassword.value = ''
    }, 1500)
}
// error handler


// show password
inpSignUpShowPassword.addEventListener('click', () => {
    if (inpSignUpPassword.type === 'password') {
        inpSignUpPassword.type = 'text'
        inpSignUpShowPassword.classList.remove('bi-eye')
        inpSignUpShowPassword.classList.add('bi-eye-slash')

    } else {
        inpSignUpPassword.type = 'password'
        inpSignUpShowPassword.classList.add('bi-eye')
        inpSignUpShowPassword.classList.remove('bi-eye-slash')
    }
})

inpSignInShowPassword.addEventListener('click', () => {
    if (inpSignInPassword.type === 'password') {
        inpSignInPassword.type = 'text'
        inpSignInShowPassword.classList.remove('bi-eye')
        inpSignInShowPassword.classList.add('bi-eye-slash')

    } else {
        inpSignInPassword.type = 'password'
        inpSignInShowPassword.classList.add('bi-eye')
        inpSignInShowPassword.classList.remove('bi-eye-slash')
    }
})
// show password


// check email exist or not and create user
inpSignUpBtn.addEventListener('click', () => {
    const fullNameRegex = /^[a-zA-Z_-\s]{3,26}$/
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

    const usernameValue = inpSignUpUsername.value.trim()
    const emailValue = inpSignUpEmail.value.trim()
    const passwordValue = inpSignUpPassword.value.trim()

    if (!fullNameRegex.test(usernameValue) || !emailRegex.test(emailValue) || !passwordRegex.test(passwordValue)) {
        if (!fullNameRegex.test(usernameValue)) {
            inpSignUpUsername.nextElementSibling.style.opacity = '1'
            setTimeout(() => inpSignUpUsername.nextElementSibling.style.opacity = '0', 2300)
        }

        if (!emailRegex.test(emailValue)) {
            inpSignUpEmail.nextElementSibling.style.opacity = '1'
            setTimeout(() => inpSignUpEmail.nextElementSibling.style.opacity = '0', 2300)
        }

        if (!passwordRegex.test(passwordValue)) {
            inpSignUpPassword.nextElementSibling.style.opacity = '1'
            setTimeout(() => inpSignUpPassword.nextElementSibling.style.opacity = '0', 2300)
        }

    } else {
        const newUser = {
            username: usernameValue,
            email: emailValue,
            password: passwordValue
        }

        const url = new URL('https://' + key['token'] + '.mockapi.io/' + key['endPoint'])
        url.searchParams.append('email', newUser.email)
        fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            if (res.ok) return res.json()
        }).then(tasks => {
            if (tasks == '' || tasks == undefined) {
                fetch('https://' + key['token'] + '.mockapi.io/' + key['endPoint'], {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(newUser)
                }).then(res => {
                    if (res.ok) return res.json()
                })
                    .then(task => errHandler('Your registration was successful', 'green'))
                    .catch(error => errHandler('There is an Error..', 'red'))
            }
            else errHandler('Email Already Exist..', 'red')
        }).catch(error => errHandler('Wait a Minute..', 'red'))
    }
})
// check email exist or not and create user


// set superAdmin
inpSignInA.addEventListener('click', () => {
    inpSignInEmail.value = 'rezageshaniweb@gmail.com'
    inpSignInPassword.value = 'rezaRE32@#$'
})
// set superAdmin


// back to login page
backBtn.addEventListener('click', () => location.reload())
// back to login page


// Read (login)
inpSignInBtn.addEventListener('click', () => {
    const emailValue = inpSignInEmail.value.trim()
    const passwordValue = inpSignInPassword.value.trim()

    if (emailValue === '' || passwordValue === '') {
        errHandler('Inputs must be filled..', 'red')
        return null
    }

    // login superAdmin
    if (emailValue === 'rezageshaniweb@gmail.com' || passwordValue === 'rezaRE32@#$') {
        errHandler('Welcome Dear Admin..', 'green')
        fetch('https://' + key['token'] + '.mockapi.io/' + key['endPoint'])
            .then(res => res.json())
            .then(users => {
                addDOM(users)
                main2.classList.remove('hidden')
                main1.classList.add('hidden')
                searchUsers(users)
            })
            .catch(error => errHandler('Wait a Minute..', 'red'))
        return null
    }
    // login superAdmin

    fetch('https://' + key['token'] + '.mockapi.io/' + key['endPoint'])
        .then(res => res.json())
        .then(users => {
            const user = users.find(user => user.email === emailValue && user.password === passwordValue)
            if (user) errHandler('Welcome User !', 'green')
            else errHandler('User Not Found..', 'red')
        })
        .catch(error => errHandler('Wait a Minute..', 'red'))
})
// Read (login)


// add to DOM
function addDOM(users) {
    list.innerHTML = ''
    users.map(val => {
        const div = document.createElement('div')
        div.className = 'flex h-[55px] bg-white border-b border-slate-300'
        div.innerHTML = `
            <span class="w-[20%] capitalize flex justify-center items-center">${val.id}</span>
            <span class="w-[20%] capitalize flex justify-center items-center">${val.username}</span>
            <span class="w-[20%] capitalize flex justify-center items-center">${val.email}</span>
            <span class="w-[20%] capitalize flex justify-center items-center">${val.password}</span>
            <span class="w-[20%] capitalize flex justify-center items-center gap-2">
                <span onclick="updateUser('${val.id}', '${val.username}', '${val.email}', '${val.password}')" class="w-[20%] cursor-pointer h-[70%] flex justify-center items-center bg-[#fbc02d] text-white text-lg"><i class="bi bi-pen"></i></span>
                <span onclick=deleteUser(${val.id}) class="w-[20%] cursor-pointer h-[70%] flex justify-center items-center bg-[#D32F2F] text-white text-lg"><i class="bi bi-trash"></i></span>
            </span>
        `
        list.append(div)
    })
}
// add to DOM


// search users based on username
function searchUsers(users) {
    searchInp.addEventListener('input', e => {
        let value = e.target.value.trim().toLowerCase()
        let filterUsers = users.filter(val => val.username.toLowerCase().includes(value))
        addDOM(filterUsers)
    })
}
// search users based on username


// Delete
function deleteUser(id) {
    let allTr = document.querySelectorAll('#list>div')
    allTr.forEach(tr => {
        if (tr.children[0].innerText == id) tr.remove()
    })

    fetch('https://' + key['token'] + '.mockapi.io/' + key['endPoint'] + '/' + id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(task => { }).catch(error => { })
}
// Delete


// Update
let editId = null

function updateUser(id, username, email, password) {
    editList.classList.remove('scale-0')
    main2.classList.add('brightness-50')
    inpUsernameEdit.value = username
    inpEmailEdit.value = email
    inpPasswordEdit.value = password
    editId = id
}

saveEdit.addEventListener('click', () => {
    editList.classList.add('scale-0')
    main2.classList.remove('brightness-50')

    let cloneValue = {
        id: editId,
        username: inpUsernameEdit.value,
        email: inpEmailEdit.value,
        password: inpPasswordEdit.value
    }

    let allTr = document.querySelectorAll('#list>div')
    allTr.forEach(tr => {
        if (tr.children[0].innerText == cloneValue.id) {
            tr.children[1].innerText = cloneValue.username
            tr.children[2].innerText = cloneValue.email
            tr.children[3].innerText = cloneValue.password
        }
    })

    fetch('https://' + key['token'] + '.mockapi.io/' + key['endPoint'] + '/' + cloneValue.id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cloneValue)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(task => {}).catch(error => {})
})

closeEdit.addEventListener('click', () => {
    editList.classList.add('scale-0')
    main2.classList.remove('brightness-50')
})
// Update