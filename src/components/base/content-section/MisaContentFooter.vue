<template>
  <div class="misa-content__footer">
    <p>Hiển thị 1-10/10000 nhân viên</p>
    <div class="misa__pagination">
      <img src="../../../assets/icon/btn-firstpage.svg" alt="First Page" class="pagination__button" />
      <img src="../../../assets/icon/btn-prev-page.svg" alt="Previous Page" class="pagination__button" />
      <div class="pagination__number active"><p>1</p></div>
      <div class="pagination__number"><p>2</p></div>
      <div class="pagination__number"><p>3</p></div>
      <div class="pagination__number"><p>4</p></div>
      <img src="../../../assets/icon/btn-next-page.svg" alt="Next Page" class="pagination__button" />
      <img src="../../../assets/icon/btn-lastpage.svg" alt="Last Page" class="pagination__button" />
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
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .misa__pagination {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .pagination__button {
      cursor: pointer;
    }

    & .pagination__number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: var(--color-secondary);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      cursor: pointer;
      transition: 0.2s all ease-in-out;

      &:hover {
        background-color: var(--color-secondary-hover);
      }
    }
  }
}
</style>