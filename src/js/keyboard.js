import { Key } from 'Key';

class Keyboard {
    constructor(data, language, capslockOn, textCase) {
        this.data = data;
        this.language = language;
        this.capslockOn = capslockOn;
        this.textCase = textCase;
        this.title = '';
        this.pressedKeys = {};
        this.container = '';
        this.rows = [];
        this.textarea = '';
        this.keyboard = '';
        this.rowCount = 5;
        this.text = '';
        this.note = '';
        this.makeKeyboard()
    }

    makeKeyboard() {
        this.container = this.makeDom(this.container, 'div', 'container');

        this.title = this.makeDom(this.title, 'h1', 'title');
        this.title.textContent = 'Virtual Keyboard';

        this.textarea = this.makeDom(this.textarea, 'textarea', 'textarea');
        this.textarea.id = 'textarea';
        this.textarea.cols = '50';
        this.textarea.rows = '5';

        this.keyboard = this.makeDom(this.keyboard, 'div', 'keyboard');

        for (let i = 0; i < this.rowCount; i++) {
            let row = this.makeDom(row, 'div', 'key__rows');
            for (let j = 0; j < this.data[`row${i}`].length; j++) {
                let key = new Key(this.data[`row${i}`][j]);
                row.append(key.buildKey());
                key.insertText(this.language, this.textCase);
            }
            this.rows.push(row);
        }

        this.text = this.makeDom(this.text, 'p', 'text');
        this.text.textContent = 'Keyboard is created in Windows';

        this.note = this.makeDom(this.note, 'p', 'note');
        this.note.innerHTML = 'Press left <span class="bold">Ctrl + Alt</span> to switch languages';

        this.addElements();

        this.linkEvents();

        document.body.append(this.container);
    }

    makeDom(node, tag, ...classes) {
        node = document.createElement(tag);
        node.classList.add(...classes);
        return node;
    }

    addElements() {
        this.container.append(this.title);
        this.container.append(this.textarea);
        this.container.append(this.keyboard);
        this.addRows();
        this.container.append(this.text);
        this.container.append(this.note);
    }

    addRows() {
        for (let i = 0; i < this.rowCount; i++) {
            this.keyboard.append(this.rows[i]);
        }
    }

    swapLang() {
        return (this.language === 'ru') ? 'en' : 'ru';
    }

    swapText(data) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < data[`row${i}`].length; j++) {
                document.getElementById(data[`row${i}`][j].id).textContent = data[`row${i}`][j][this.language][this.textCase];
            }
        }
    }
    bindEvents() {        
        document.addEventListener('keydown', (e) => {
            if (e.code == 'AltLeft' || e.code == 'ControlLeft') {
                pressedKeys[e.code] = true;
            }
            if (e.code == 'CapsLock') {
                if (this.capslockOn) {
                    this.capslockOn = false;
                    this.textCase = 'lowerCase';
                    this.swapText(this.data);
                    document.getElementById(e.code).classList.remove('pushed');
                } else {
                    this.capslockOn = true;
                    this.textCase = 'capslock';
                    this.swapText(this.data);
                    document.getElementById(e.code).classList.add('pushed');
                }
            }
        });
        if (e.code == 'ShiftLeft' || e.code == 'ShiftRight') {
            if (this.capslockOn) {
                this.textCase = 'shiftCapslock';
                this.swapText(data);
            } else {
                this.textCase = 'upperCase';
                this.swapText(data);
            }
        } 
}

}
export { Keyboard };