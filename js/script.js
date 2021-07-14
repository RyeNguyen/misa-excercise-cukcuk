const textBox = document.querySelector('.misa-text-box--default');
const dropdownButton = document.querySelector('.dropdown__button');
const dropdown1 = document.getElementById('dropdown__content-1');

textBox.setAttribute('size', textBox.getAttribute('placeholder').length);

dropdownButton.addEventListener('click', () => {
    console.log('click');
    dropdown1.classList.add('show');
})