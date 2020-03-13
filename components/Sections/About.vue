<template>
  <section>
    <div class="contents__top">
      <div>
        <h2>{{ $t('about') }}</h2>
        <span class="emoji-title emoji--thinking"/>
      </div>
      <p class="about__content">I’m a <span class="about__highlight">UX Engineer (product design and front-end)</span> working as a <span class="about__highlight">remote contractor for international companies</span> while based in Barcelona, Spain. I studied a media engineering degree in Helsinki and Hong Kong, worked in big corporations and innovative startups and traveled the world as much as I could. I’m interested in the whole visual part of the web, its usability, performance and accessibility. Also I’m interested in feminism and LGBT rights. My surname is Aragonese, as Zaragoza (Spain) where I was born 24 years ago with my two triplet brothers.</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
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
.about {
  &__content {
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: -.2px;
  }
  &__highlight {
    color: $secondary;
  }
}
</style>
