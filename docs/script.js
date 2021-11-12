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