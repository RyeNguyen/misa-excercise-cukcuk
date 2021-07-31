<template>
  <div class="dropdown__content" :class="{'dropdown__content--hidden': contentHidden}">
    <a
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === -1}"
        @click="resetDropdown"
    ><i class="fas fa-check"></i>
      {{ dropdownTitle }}
    </a>
    <a
        v-for="(option, index) in dropdownOptions"
        :key="option[`${dropdownType}Id`]"
        href="#"
        :class="{'dropdown__content-link--active': currentIndex === index}"
        :value="option[`${dropdownType}Id`]"
        @click="optionActive(index)"
    ><i class="fas fa-check"></i>
      {{ option[`${dropdownType}Name`] }}
    </a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MisaDropdownOptions",
  created() {
    let apiUrl = '';

    //TODO: Hiện tại đang fix cứng call API của phòng ban và vị trí ở đây
    switch (this.dropdownType) {
      case 'Department':
        apiUrl = 'http://cukcuk.manhnv.net/api/Department';
        break;
      case 'Position':
        apiUrl = 'http://cukcuk.manhnv.net/v1/Positions';
        break;
    }
    axios.get(apiUrl).then(res => {
      this.dropdownOptions = res.data;
    }).catch(res => {
      console.log(res);
    })
  },
  data() {
    return {
      currentIndex: -1,
      dropdownOptions: [],
      isActive: false,
    }
  },
  props: {
    contentHidden: {
      type: Boolean
    },
    dropdownTitle: {
      type: String,
      required: true
    },
    dropdownType: {
      type: String,
      required: true
    }
  },
  methods: {
    //Hàm chọn một option trong số các options được xổ ra bởi dropdown
    //Author: NQMinh(29/07/2021)
    optionActive(index) {
      this.currentIndex = index;
      this.$emit('dropdown-item-active', this.dropdownOptions[this.currentIndex]);
    },

    //Hàm chuyển dropdown về trạng thái ban đầu (không chọn gì cả)
    //Author: NQMinh(29/07/2021)
    resetDropdown() {
      this.currentIndex = -1;
      this.$emit('dropdown-item-active');
    }
  }
}
</script>