<template>
  <div class="misa-menu">
    <div class="misa-menu__item misa-menu__item--active">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Tổng quan</div>
    </div>
    <div class="misa-menu__item">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Báo cáo</div>
    </div>
    <div class="misa-menu__item">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Mua hàng</div>
    </div>
    <div class="misa-menu__item">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Danh mục nhân viên</div>
    </div>
    <div class="misa-menu__item">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Danh mục nhân viên</div>
    </div>
    <div class="misa-menu__item">
      <div class="misa-menu__icon"></div>
      <div class="misa-menu__item-text">Thiết lập hệ thống</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMenu'
}
</script>

<style lang="scss">
.misa-menu {
  width: 226px;
  height: calc(100vh - 49px);
  border-right: 1px solid var(--color-hightlight);
  transition: 0.2s all ease-in-out;

  &--shrink {
    width: 64px;
  }

  & .misa-menu__item {
    height: 44px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.2s all ease-in-out;

    &--shrink {
      justify-content: space-evenly;
    }

    &:hover {
      background-color: var(--color-secondary);
      color: var(--color-black);
    }

    &--active {
      background-color: var(--color-primary);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-primary);
        color: var(--color-white);
      }
    }

    & .misa-menu__icon {
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      margin-right: 10px;

      &--shrink {
        margin-right: 0 !important;
      }
    }
  }
}

.misa-menu .misa-menu__item:first-child .misa-menu__icon {
  background-image: url('../../assets/icon/dashboard.png');
}

.misa-menu .misa-menu__item:nth-child(2) .misa-menu__icon {
  background-image: url('../../assets/icon/report.png');
}

.misa-menu .misa-menu__item:nth-child(3) .misa-menu__icon {
  background-image: url('../../assets/icon/dashboard.png');
}

.misa-menu .misa-menu__item:nth-child(4) .misa-menu__icon {
  background-image: url('../../assets/icon/dic-employee.png');
}

.misa-menu .misa-menu__item:nth-child(5) .misa-menu__icon {
  background-image: url('../../assets/icon/dic-employee.png');
}

.misa-menu .misa-menu__item:nth-child(6) .misa-menu__icon {
  background-image: url('../../assets/icon/setting.png');
}

</style>