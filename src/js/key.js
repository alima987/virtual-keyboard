class Key {
    constructor({ id, en, ru }) {
        this.id = id;
        this.ru = en;
        this.en = ru;
        this.key = '';
        this.class = 'keyboard__keys';
    }

    makeKey() {
        this.key = document.createElement('div');
        this.key.id = this.id;
        this.key.classList.add(this.class);
        this.linkEvents();
        return this.key;
    }

    putText(language, textCase) {
        this.key.textContent = this[language][textCase];
    }

    putActiveStatus(e) {
        document.getElementById(`${e.code || e.target.id}`).classList.add('pushed');
    }

    deleteActiveStatus() {
        document.querySelectorAll('.keyboard__keys').forEach(key => {
            if (key.id !== 'CapsLock') {
                key.classList.remove('pushed');
            }
        });
    }

}

export { Key };