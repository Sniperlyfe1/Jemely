let currentSlide = 1;
let noCount = 0;

/* Slide control */
function goToSlide(n) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById('slide' + n).classList.add('active');
    currentSlide = n;
    document.querySelector('.click-instruction').style.display =
        n >= 4 ? 'none' : 'block';
}

/* Intro click-through */
document.body.onclick = e => {
    if (!e.target.matches('button') && currentSlide < 4) {
        goToSlide(currentSlide + 1);
    }
};

/* Buttons */
document.addEventListener('click', e => {
    if (e.target.classList.contains('yes-btn')) {
        goToSlide(5);
    }

    if (e.target.classList.contains('no-btn')) {
        handleNo(e.target);
    }
});

/* NO logic */
function handleNo(button) {
    noCount++;

    spawnWrongAnswer();
    moveNoButton(button);

    if (noCount >= 1000000) {
        setTimeout(() => goToSlide(5), 600);
    }
}

/* Spawn shrinking tilted clone */
function spawnWrongAnswer() {
    const original = document.getElementById('slide4');
    const clone = original.cloneNode(true);

    clone.classList.remove('active');
    clone.classList.add('question-clone');

    const scale = Math.max(0.2, 1 - noCount * 0.12);
    const rotate = -5 - noCount * 4;

    clone.style.transform =
        `scale(${scale}) rotate(${rotate}deg) translate(-${noCount * 20}px, ${noCount * 15}px)`;

    clone.querySelector('.question-title').textContent = 'Wrong answer 😌';
    clone.querySelector('.question-text').textContent = 'Try again.';

    document.body.appendChild(clone);
}

/* Runaway NO button */
function moveNoButton(button) {
    const x = Math.random() * 400 - 100;
    const y = Math.random() * 400 - 100;
    button.style.transform = `translate(${x}px, ${y}px)`;
}