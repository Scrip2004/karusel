

const form = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    button: document.querySelector('.button'),
    error: document.querySelector('.input-error'),
}

let auth_form = document.querySelector('.form');
console.log(form.email)

function checkForm() {
    const email = form.email.getElementsByTagName('input')[0].value
    const password = form.password.getElementsByTagName('input')[0].value 
    if(email && password) {
        form.button.classList.remove('disable')
    } else {
        form.button.classList.add('disable')
    }
}

function handleInput(e, name) {
    const {value} = e.target
    if(value) {
        form[name].classList.add('filed')
    } else {
        form[name].classList.remove('filed')
    }
    checkForm()
}

function deleteError () {
    form.email.classList.remove('error')
    form.error.classList.remove('view')
}

function validateEmail (e) {
    const {value} = form.email.getElementsByTagName('input')[0]
    let value_pwd = form.password.getElementsByTagName('input')[0].value

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then((json) => {
        let list_of_users = json.users;
        if (reg.test(value)) {
                for (const user of list_of_users) {
                    if (user.email == value && user.password == value_pwd) {
                        fetch('https://dummyjson.com/products')
                        .then(res => res.json())
                        .then((json) => {
                            let all_products = json.products;
                            add(all_products);
                        });
                        deleteError();
                        auth_form.style.display = "none";
                        break;
                    }
                    else{   
                        // alert("Неверный логин или пароль");
                        break;
                    }
                }
        } 
        else {
            form.button.classList.add('disable')
            form.email.classList.add('error')
            form.error.classList.add('view')
        }
    });
    
}

form.email.oninput = (e) => handleInput(e, 'email')
form.password.oninput = (e) => handleInput(e, 'password')
// Изменение слушателя кнопки
// form.button.addEventListener('click', validateEmail);
let enter_btn = document.querySelector('#enter_btn');
enter_btn.addEventListener('click', validateEmail);
form.email.getElementsByTagName('input')[0].onblur = validateEmail
form.email.getElementsByTagName('input')[0].onfocus = deleteError

let content = document.querySelector('.content');

let reg_form = document.querySelector('.reg_form');

let button_reg = document.querySelector('.button_reg');
button_reg.addEventListener('click', to_reg);

function to_reg(){
    auth_form.style.display = "none";
    reg_form.style.display = "grid";
}

function add(all_products){
    for(const product of all_products){
        content.innerHTML += `
        <div class="product">
                <img class="product_img" src="${product.images[0]}" alt="">
                <p class="title">${product.title}</p>
                <p class="description">${product.description}</p>
        </div>
        `;
    }
}