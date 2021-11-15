// Align range
const alignRange = document.getElementById('align_range');
const alignDisplay = document.getElementById('align_display');
const alignContainer = document.getElementById('align_container');

alignRange.addEventListener('input', (e) => {
    alignRange.value = e.target.value;
    alignDisplay.textContent = e.target.value;
    alignContainer.style = `--p-align: ${e.target.value};`;
})

//Align prx_fit background
const alignBg = document.getElementById('bg_align');
const bgRange = document.getElementById('align_bg_range');
const bgDisplay = document.getElementById('align_bg_display');

bgRange.addEventListener('input', (e) => {
    bgRange.value = e.target.value;
    bgDisplay.textContent = e.target.value;
    alignBg.style = `background-position: ${e.target.value}%;`;
})

//Bubble Ripple effect  https://codepen.io/BretCameron/pen/mdPMVaW
document.styleSheets[0].insertRule(`
span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.3s ease-out;
    background-color: #c9c9fbab;
}`);
document.styleSheets[0].insertRule(`
@keyframes ripple {
    to {
        transform: scale(1.1);
        opacity: 0;
    }
}`);

function createRipple(event) {
    const el = event.currentTarget;
  
    const circle = document.createElement('span');
    const diameter = Math.max(el.clientWidth, el.clientHeight)
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = '0px';
    circle.style.top = '0px';
    circle.classList.add('ripple');
    
    // clean previous
    const ripple = el.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();
  
    el.appendChild(circle);
}
  
const bubbles = document.getElementsByClassName('bubble');
for (const bubble of bubbles) {
    bubble.addEventListener("click", createRipple);
}

//Easter egg
const pureBubble = document.getElementById('circle3');
const originalText = pureBubble.textContent;
pureBubble.textContent = '';
pureBubble.style.cursor = 'pointer';
pureBubble.style.userSelect = 'none';

const originalTextEl = document.createElement('div');
originalTextEl.innerText = originalText;

const secretEl = document.createElement('div');
secretEl.innerText = 'Vanilla CSS';
secretEl.setAttribute('id', 'secret');

changeStyleOnHover(originalTextEl, 'transition: all 0.4s; opacity: 1;', 'opacity: 0;');
changeStyleOnHover(secretEl, 'position: absolute; transition: all 0.4s; opacity: 0;', 'opacity: 1;');

pureBubble.appendChild(secretEl);
pureBubble.appendChild(originalTextEl);

function changeStyleOnHover(el, staticStyle, dynamicStyle) {
    el.style = staticStyle;
    pureBubble.addEventListener('mouseenter', () => el.style = staticStyle + dynamicStyle);
    pureBubble.addEventListener('mouseleave', () => el.style = staticStyle);
}

//vanilla peeker
const imgLinks = [
    'https://imgur.com/RHU3mC0.png',
    'https://imgur.com/uTIlvLU.png',
    'https://imgur.com/3XX9rm7.png',
    'https://imgur.com/renLE8f.png',
    'https://imgur.com/dbzf8Yv.png',
    'https://imgur.com/1hTjlzm.png',
    'https://imgur.com/rii1lba.png',
    'https://imgur.com/Xm3UIal.png',
    'https://imgur.com/FJKNCbB.png',
    'https://imgur.com/BsfYFBv.png'
];
const audioLinks = [
    'https://www.myinstants.com/media/sounds/nyaa_bOntpK5.mp3',
    'https://www.myinstants.com/media/sounds/nyaa-3.mp3',
    'https://www.myinstants.com/media/sounds/nyanners-nyaah.mp3',
    'https://www.myinstants.com/media/sounds/audio_default_5294.mp3',
    'https://www.myinstants.com/media/sounds/nunnally-nyaan-cut.mp3',
    'https://www.myinstants.com/media/sounds/nyam-breaking-fenrir-gbf.mp3',
    'https://www.myinstants.com/media/sounds/111_OFrurBP.mp3',

];
let clickCount = 0;
pureBubble.addEventListener('click', () => {
    clickCount++;
    if(clickCount >= 5){
        vanillaPeek();
        clickCount = 0;
    }
});

function vanillaPeek() {
    const audioIndex = Math.floor(Math.random() * audioLinks.length);
    if(Math.floor(Math.random() * 3) == 0)
        playAudio(audioLinks[audioIndex]);
    const vanillaImg = addVanilla();
    setTimeout(() => {
        vanillaImg.remove();
    }, 5000)
}
function addVanilla() {
    const vaniEl = document.createElement('img');
    let angle = Math.floor(Math.random() * 4);
    const offset = Math.floor(Math.random() * 85);
    const imgIndex = Math.floor(Math.random() * imgLinks.length);
    let positionStyle = '';

    if(imgIndex == 7 && angle % 2 == 0) angle++;
    switch(angle) {
        case 0: positionStyle = `bottom: 0; left: ${offset}%;--transform: rotate(0deg);`; break;
        case 1: positionStyle = `left: 0; top: ${offset}%;--transform: rotate(90deg);`; break;
        case 2: positionStyle = `top: 0; right: ${offset}%;--transform: rotate(180deg);`; break;
        case 3: positionStyle = `right: 0; bottom: ${offset}%;--transform: rotate(90deg) scaleY(-1);`; break;
    }

    vaniEl.style = `
    position: fixed;
    ${positionStyle}
    transform: var(--transform) translateY(0%);
    height: 100px;
    width: 100px;
    object-fit: cover;
    animation: peek 5s ease-out;
    `;
    vaniEl.src = imgLinks[imgIndex];
    document.body.appendChild(vaniEl);

    return vaniEl;
}
function playAudio(src) {
    let audio = new Audio(src);
    audio.play();
}

document.styleSheets[0].insertRule(`
@keyframes peek {
    0% {
        transform: var(--transform) translateY(100%);
    }
    5% {
        transform: var(--transform) translateY(0%);
    }
    90% {
        transform: var(--transform) translateY(0%);
        opacity: 1;
    }
    100% {
        transform: var(--transform) translateY(100%);
        opacity: 0;
    }
}`);