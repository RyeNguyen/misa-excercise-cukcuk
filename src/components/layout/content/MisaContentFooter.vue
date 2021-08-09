<template>
  <div class="misa-content__footer">
    <p>Hiển thị <strong>1-10/10000</strong> nhân viên</p>
    <div class="misa-pagination">
      <img src="../../../assets/icon/btn-firstpage.svg" alt="First Page" class="misa-pagination__button" />
      <img src="../../../assets/icon/btn-prev-page.svg" alt="Previous Page" class="misa-pagination__button" />
      <div class="misa-pagination__number-container">
        <div class="misa-pagination__number misa-pagination__number--active"><p>1</p></div>
        <div class="misa-pagination__number"><p>2</p></div>
        <div class="misa-pagination__number"><p>3</p></div>
        <div class="misa-pagination__number"><p>4</p></div>
      </div>
      <img src="../../../assets/icon/btn-next-page.svg" alt="Next Page" class="misa-pagination__button" />
      <img src="../../../assets/icon/btn-lastpage.svg" alt="Last Page" class="misa-pagination__button" />
    </div>
    <p>10 nhân viên/trang</p>
  </div>
</template>

<script>
export default {
  name: 'MisaFooter'
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
      cursor: pointer;
      border-radius: 4px;
      padding: 4px;

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