import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
    createBtn: document.querySelector('.btn-fieldset'),
    fieldset: document.querySelector('.fieldset'),
    inputSnackbar: document.querySelector('.input-snackbar'),

};
const form = document.querySelector('.form');
var radios = document.getElementsByName('state');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log("handlerCreate");

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {

            console.log("radios[i].value = " + radios[i].value);
            console.log("eleemeents = " + elements.inputSnackbar.value);

            createPromise(radios[i].value, elements.inputSnackbar.value).then(res => {
                iziToast.success({
                    message: `✅ Fulfilled promise in ${elements.inputSnackbar.value}ms`,
                    position: 'topRight'
                });
            }).catch(ex => {
                iziToast.error({
                    message: `✅ Fulfilled promise in ${elements.inputSnackbar.value}ms`,
                    position: 'topRight'
                });
            })
            break;
        }
    }
    
});


function createPromise(type, delay) {
    return new Promise((res, rej) => {
        setTimeout(() => {
//const random = Math.random();
        if (type == 'fulfilled') {
            res(delay);
        }
        else {
                rej(delay);
        }
        }, delay);
        
    }
    )
}