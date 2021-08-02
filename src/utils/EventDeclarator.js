export default class EventIniter {
    constructor() {
        this.initEvent();
    }

    initEvent() {
        //Dãn width text-box căn theo placeholder
        //Author: NQMinh(15/07/2021)
        const searchInput = document.getElementById('search-input');
        searchInput.setAttribute('size', searchInput.getAttribute('placeholder').length);
    }
}