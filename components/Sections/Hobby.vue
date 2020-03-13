<template>
  <section>
    <div class="contents__top">
      <div>
        <h2>{{ $t('hobby') }}</h2>
        <span class="emoji-title emoji--plane"/>
      </div>
      <div class="map">
        Coming Soon!
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hobby',
  components: { },
  props: {
  }
}
</script>
<style lang="scss">
.contents {
  margin: 0;
  
  @media (min-width: $screen-sm){
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    display: grid;
  }

  &__top {
    margin-top: 4rem;
  }
}
</style>
