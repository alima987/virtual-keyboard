import  { data }  from './js/data';
import Keyboard from './Keyboard';
let language = 'en';
let textCase = 'lowerCase';
let capslockOn = false;
let keyboard;

function layLocalKeeping() {
    if (keyboard) {
        localStorage.setItem('lang', keyboard.language);
    } else {
        localStorage.setItem('lang', language);
    }    
}

window.addEventListener('beforeunload', layLocalKeeping);

function getLocalKeeping() {
    if (localStorage.getItem('lang')) {
        language = localStorage.getItem('lang');
        createKeyboard();
    }
}

window.addEventListener('load', getLocalKeeping);

const createKeyboard = () => {
    keyboard = new Console(data, language, capslockOn, textCase);
    keyboard.makeConsole();
};