<template>
  <div class="misa-content__footer">
    <p>Hiển thị <strong>1-10/10000</strong> nhân viên</p>
    <div class="misa-pagination">
      <img src="../../../assets/icon/btn-firstpage.svg" alt="First Page" class="misa-pagination__button" />
      <img src="../../../assets/icon/btn-prev-page.svg" alt="Previous Page" class="misa-pagination__button" />
      <div class="misa-pagination__number-container">
        <div
          v-for="number in 4"
          :key="number"
          class="misa-pagination__number"
          :class="{'misa-pagination__number--active': currentIndex === number}"
          @click="activePaging(number)"
        >
          <p>{{ number }}</p>
        </div>
      </div>
      <img src="../../../assets/icon/btn-next-page.svg" alt="Next Page" class="misa-pagination__button" />
      <img src="../../../assets/icon/btn-lastpage.svg" alt="Last Page" class="misa-pagination__button" />
    </div>
    <p>10 nhân viên/trang</p>
  </div>
</template>

<script>
export default {
  name: 'MisaFooter',

  data() {
    return {
      currentIndex: 1
    }
  },

  methods: {
    activePaging(number) {
      this.currentIndex = number;
    }
  }
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
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__button {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 4px;
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
      }
    }
  }
}
</style>