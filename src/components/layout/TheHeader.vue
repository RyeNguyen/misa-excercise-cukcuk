<template>
  <div class="misa-header">
    <div class="misa-header--left">
      <div class="header__toggle"></div>
      <div class="header__logo"></div>
    </div>
    <div class="misa-header--right">
      <div class="header__title">
        <div class="misa-dropdown" id="dropdown__restaurant">
          <button class="dropdown__button">
            <span class="dropdown__title">Nhà hàng Biển Đông</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="dropdown__content dropdown__content--hidden">
            <a href="#" class="dropdown__content-link--active"><i class="fas fa-check"></i>Nhà hàng Biển Đông</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Sen Việt</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Vua Chả Cá</a>
            <a href="#"><i class="fas fa-check"></i>Nhà hàng Don Chicken</a>
          </div>
        </div>
      </div>
      <div class="header__user">
        <div class="header__profile-picture"></div>
        <div class="header__username">Nguyễn Quang Minh</div>
        <div class="header__user header__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style>
@import url('../../css/layout/Header.css');
</style>