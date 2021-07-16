let dropdownContents = document.querySelectorAll('.dropdown__content a');
dropdownContents = Array.prototype.slice.call(dropdownContents);

dropdownContents.map(dropdownContent => {
    dropdownContent.addEventListener('click', () => {
        for (let i = 0; i < dropdownContents.length; i++) {
            dropdownContents[i].classList.remove('dropdown__content-link--active');
        }
        dropdownContent.classList.add('dropdown__content-link--active');
        console.log(dropdownContent.parentElement.parentElement.childNodes[0]);
    })
})

// restaurant list items
var restaurantListItems = document.querySelectorAll("#dropdown__content-restaurant a");
var restaurantCurrent = document.querySelector("#dropdown__restaurant .header__text");
var restaurantList = document.querySelector("#dropdown__content-restaurant");


restaurantListItems.forEach((item) => {
    item.addEventListener('click', () => {
        var chosenRestaurant = item.textContent;
        restaurantCurrent.textContent = chosenRestaurant;
    })
});
