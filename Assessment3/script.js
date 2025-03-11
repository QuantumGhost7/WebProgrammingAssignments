const WORDS = [
    'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult', 'after', 'again',
    'agent', 'agree', 'ahead', 'alarm', 'album', 'alert', 'alike', 'alive', 'allow', 'alone',
    'along', 'alter', 'among', 'anger', 'angle', 'angry', 'apart', 'apple', 'apply', 'arena',
    'argue', 'arise', 'array', 'aside', 'asset', 'audio', 'audit', 'avoid', 'award', 'aware',
    'baker', 'basic', 'basis', 'beach', 'began', 'begin', 'begun', 'being', 'below', 'bench',
    'birth', 'black', 'blame', 'blind', 'block', 'blood', 'board', 'boost', 'booth', 'bound',
    'brain', 'brand', 'bread', 'break', 'breed', 'brief', 'bring', 'broad', 'broke', 'brown',
    'build', 'built', 'buyer', 'cable', 'calif', 'carry', 'catch', 'cause', 'chain', 'chair',
    'chart', 'chase', 'cheap', 'check', 'chest', 'chief', 'child', 'china', 'chose', 'civil'
];
class Game {
    constructor() {
        this.wins = parseInt(localStorage.getItem('wins') || '0');
        this.init();
        this.bindEvents();
    }
    init() {
        this.guess = 0;
        this.active = true;
        this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
        
        document.getElementById('word-input').value = '';
        document.getElementById('win-modal').classList.remove('show');
        
        document.querySelectorAll('.tile').forEach(t => {
            t.textContent = '';
            t.className = 'tile';
        });
        
        document.getElementById('word-list').innerHTML = 
            WORDS.sort().map(w => `<div class='word-item'>${w}</div>`).join('');
    }
    check(input) {
        if (!this.active || input.length !== 5 || !WORDS.includes(input)) {
            this.message('Not a valid word!', 'error');
            return;
        }

        let row = document.querySelectorAll('.grid-row')[this.guess];
        let tiles = row.children;
        let target = [...this.word];

        [...input].forEach((letter, i) => {
            tiles[i].textContent = letter;
            if (letter === target[i]) {
                tiles[i].classList.add('correct');
                target[i] = null;
            }
        });
        [...input].forEach((letter, i) => {
            if (!tiles[i].classList.contains('correct')) {
                let pos = target.indexOf(letter);
                if (pos !== -1) {
                    tiles[i].classList.add('present');
                    target[pos] = null;
                } else {
                    tiles[i].classList.add('absent');
                }
            }
        });
        if (input === this.word) {
            document.getElementById('wins').textContent = ++this.wins;
            localStorage.setItem('wins', this.wins);
            document.getElementById('win-word').textContent = this.word;
            document.getElementById('win-tries').textContent = this.guess + 1;
            document.getElementById('win-modal').classList.add('show');
            this.active = false;
        } 
        else if (++this.guess >= 6) {
            this.active = false;
            this.message(`Game Over! The word was ${this.word}`, 'error');
        }
        document.getElementById('word-input').value = '';
    }
    message(text, type) {
        let msg = document.getElementById('message');
        msg.textContent = text;
        msg.className = `show ${type}`;
        setTimeout(() => msg.className = '', 2000);
    }
    bindEvents() {
        document.getElementById('word-input').addEventListener('keypress', e => {
            if (e.key === 'Enter') this.check(e.target.value.toLowerCase().trim());
        });
        ['new-game', 'play-again'].forEach(id => 
            document.getElementById(id).addEventListener('click', () => this.init()));

        document.getElementById('rules').addEventListener('click', () => 
            document.getElementById('rules-modal').classList.add('show'));

        document.getElementById('close-rules').addEventListener('click', () => 
            document.getElementById('rules-modal').classList.remove('show'));

        document.querySelectorAll('.modal').forEach(m => 
            m.addEventListener('click', e => {
                if (e.target === m) m.classList.remove('show');
            }));
    }
}
document.addEventListener('DOMContentLoaded', () => new Game()); 