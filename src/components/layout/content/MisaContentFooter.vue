<template>
  <div class="misa-content__footer">
    <p>Hiển thị
      <span style="font-weight: bold">{{pageInformation + '/' + totalRecords}}</span> nhân viên
    </p>
    <div
        v-if="totalRecords !== 0"
        class="misa-pagination"
        :totalPage="totalPages"
        :totalRecords="totalRecords"
        :currentPage="currentPage"
        @pageChanged="onPageChange"
    >
      <button
          class="misa-pagination__button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
      >
        <img
            src="../../../assets/icon/btn-firstpage.svg"
            alt="First Page"
        />
      </button>

      <button
          class="misa-pagination__button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
      >
        <img
            src="../../../assets/icon/btn-prev-page.svg"
            alt="Previous Page"
        />
      </button>

      <div class="misa-pagination__number-container">
        <button
          v-for="page in pages"
          :key="page.name"
          class="misa-pagination__number"
          :class="{'misa-pagination__number--active': isPageActive(page.name)}"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
        >{{ page.name }}
        </button>
      </div>

      <button
          class="misa-pagination__button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
      >
        <img
            src="../../../assets/icon/btn-next-page.svg"
            alt="Next Page"
        />
      </button>

      <button
          class="misa-pagination__button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
      >
        <img
            src="../../../assets/icon/btn-lastpage.svg"
            alt="Last Page"
        />
      </button>
    </div>
    <MisaDropdown
        v-if="totalRecords !== 0"
        id="dropdown__pagination"
        type="Paging"
        @dropdown-chosen="changePageSize"
    />
  </div>
</template>

<script>
let firstLoad = false;

export default {
  name: 'MisaFooter',

  created() {
    if (localStorage.getItem('pageSize') !== null) {
      firstLoad = true;
      this.$emit('paging', this.currentPage, parseInt(localStorage.getItem('pageSize')));
      setTimeout(() => {
        firstLoad = false;
      }, 1000)
    } else {
      this.$emit('paging', this.currentPage, 50);
    }
  },

  data() {
    return {
      maxVisibleButtons: 4,
      currentPage: 1,
      pageSize: 0
    }
  },

  props: {
    totalPages: {
      type: Number,
      required: true
    },

    totalRecords: {
      type: Number,
      required: true
    }
  },

  emits: ['paging'],

  watch: {
    pageSize: function() {
      localStorage.setItem('pageSize', this.pageSize);
      if (!firstLoad) {
        this.$emit('paging', 1, this.pageSize);
      }
    },

    totalPages: function() {
      this.currentPage = 1;
    }
  },

  //#region computed
  computed: {
    isInFirstPage: function () {
      return this.currentPage === 1;
    },

    isInLastPage: function () {
      return this.currentPage === this.totalPages;
    },

    startPage: function () {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        if (this.maxVisibleButtons <= this.totalPages) {
          return this.totalPages - this.maxVisibleButtons + 1;
        } else {
          return this.totalPages + 1;
        }
      }

      return this.currentPage - 1;
    },

    endPage: function () {
      return Math.min(
          this.startPage + this.maxVisibleButtons - 1,
          this.totalPages
      )
    },

    pages: function () {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range;
    },

    pageInformation: function() {
      if (this.currentPage < this.totalPages) {
        return `${(this.currentPage - 1) * this.pageSize + 1}-${this
            .currentPage * this.pageSize}`;
      }
      return `${this.totalRecords}`;
    }
  },
  //#endregion

  //#region methods
  methods: {
    onClickFirstPage: function () {
      this.onPageChange(1);
      this.$emit('paging', 1, this.pageSize);
    },

    onClickPreviousPage: function () {
      this.onPageChange(this.currentPage - 1);
      this.$emit('paging', this.currentPage - 1, this.pageSize);
    },

    onClickPage: function (page) {
      this.onPageChange(page);
      this.$emit('paging', page, this.pageSize);
    },

    onClickNextPage: function () {
      this.onPageChange(this.currentPage + 1);
      this.$emit('paging', this.currentPage + 1, this.pageSize);
    },

    onClickLastPage: function () {
      this.onPageChange(this.totalPages);
      this.$emit('paging', this.totalPages, this.pageSize);
    },

    isPageActive: function (page) {
      return this.currentPage === page;
    },

    onPageChange: function (page) {
      this.currentPage = page;
    },

    changePageSize: function(value) {
      this.pageSize = value;
    }
  }
  //#endregion
}
</script>

<style lang="scss">
.misa-content__footer {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;

  & .misa-pagination {
    width: auto;
    gap: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__button {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      outline: none;
      padding: 8px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: var(--color-white);
      }
    }

    &__number {
      &-container {
        display: flex;
        gap: 16px;
      }

      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--color-hightlight);
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      cursor: pointer;
      transition: 0.2s all ease-in-out;

      &:hover {
        background-color: var(--color-white);
        border-color: var(--color-white);
      }

      &--active {
        background-color: var(--color-primary) !important;
        color: var(--color-white) !important;
        border-color: var(--color-primary) !important;

        &:hover {
          background-color: var(--color-primary-hover) !important;
          border-color: var(--color-primary-hover) !important;
        }
      }
    }
  }
}
</style>