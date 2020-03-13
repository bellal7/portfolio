<template>
  <section>
    <div class="contents__top">
      <div>
        <h2>{{ $t('experience') }}</h2>
        <span class="emoji-title emoji--girl-coding"/>
      </div>
      <ul class="experience__list">
        <li class="experience__item" v-for="(item,index) in companys" :key="index">
          <div class="experience__time-place">
            <div class="experience__place">{{item.place}}</div> 
            <div class="experience__time">
              <span>{{item.workPeriod}}</span>
            </div>
          </div> 
          <div aria-label="" class="experience__image">
            <ImageResponsive
            :imageURL="item.images"
            :rounded="true"
            class="experience__thumbnail"
            :alt="'Blog picture'" />
          </div>
          <div class="experience__panel">
            <div class="experience__position">
              <h3 class="experience__title">{{item.jobTitle}}
                <a target="_blank" rel="noopener" :href="item.link" class="experience__company ani">
                  <span>{{item.name}}</span>
                </a>
              </h3>
            </div> 
            <div class="experience__description">
              <p>{{item.jobDescription}}
                <span>
                  <span>Here is where I learnt: </span> 
                  <span class="experience__learnt">{{item.spec}}</span>
                </span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  components: { },
  props: {
  },
  data() {
    return {
      companys:[
        {
          name: 'HIVELAB',
          link: 'http://hivelab.co.kr/',
          images: 'main/_thumbnail.jpg',
          workPeriod: 'Sep’18 - NOW',
          jobTitle: 'Front-End Developer — ',
          jobDescription: 'I worked for a web agency company as a front-end developer',
          spec: '#GULP, #SCSS, #BEM, #JAVASCRIPT, #ES6, #VUEJS, #REACT, #MVC, #RESPONSIVE WEB/APP, #GIT, #SVN',
          place: 'South Korea'
        },
        {
          name: 'ST Unitas',
          link: 'http://www.stunitas.com/',
          images: 'main/_thumbnail.jpg',
          workPeriod: 'May’14 - Sep’18',
          jobTitle: 'Front-End & UI Developer — ',
          jobDescription: 'I worked for a company that provides online education service for students and adults',
          spec: '#CSS, #SCSS, #HTML, #JAVASCRIPT, #JQUERY, #GIT, #RESPONSIVE WEB/APP',
          place: 'South Korea'
        },
        {
          name: 'Dinno Communications',
          link: '/',
          images: 'main/_thumbnail.jpg',
          workPeriod: 'Nov’13 - Apr’14',
          jobTitle: 'Backend & UI Developer — ',
          jobDescription: 'I worked for a company that provides a web service like event promotion for SK Telecommunications company',
          spec: '#CSS, #HTML, #JAVASCRIPT, #JQUERY, #GIT, #RESPONSIVE WEB/APP',
          place: 'South Korea'
        },
        {
          name: 'Eduhouse - Uhak Net',
          link: 'http://www.eduhouse.net/',
          images: 'main/_thumbnail.jpg',
          workPeriod: 'Dec’10 - Oct’13',
          jobTitle: 'Backend (Database & ASP Programmer) — ',
          jobDescription: 'I worked for a company that provides a web service for international students',
          spec: '#CSS, #HTML, #JAVASCRIPT, #JQUERY, #GIT, #RESPONSIVE WEB/APP',
          place: 'South Korea'
        }
      ]
    }
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
.experience {
  &__list {
    position: relative;
    vertical-align: middle;
    list-style: none;
    > li {
      position: relative;
      margin-bottom: 1rem;
      min-height: 5rem;
      &::before {
        content: " ";
        display: table;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 14rem;
      left: 21%;
      width: 2px;
      display: block;
      margin-left: -1.5px;
      display: none;
      background-color: #e4e4e4;
    }
  }
  &__time {
    &-place {
      width: 100%;
      display: flex;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding-top: 1.5rem;
      margin-bottom: 1rem;
    }
  }
  &__place,
  &__time {
    display: inline-block;
    color: $secondary;
  }
  &__image {
    position: relative;
    display: block;
    width: 16.66667%;
    height: 16.66667%;
    &::after {
      content: " ";
      display: block;
      position: absolute;
      top: -5px;
      left: -5px;
      height: calc(100% + 6px);
      border-radius: 100%;
      background: #fff;
      border: 2px solid #e4e4e4;
      width: calc(100% + 6px);
    }
    &[lazy='loaded'] {
      opacity: 1;
    }
    img {
      z-index: 1;
      position: relative;
      width: 100%;
      height: auto;
      margin-left: 0;
      text-align: center;
    }
  }
  &__panel {
    position: relative;
    padding: 0;
    margin-top: -5.5rem;
    text-align: left;
  }
  &__position,
  &__studies {
    padding: .3rem 0 0 22%;
    min-height: 5rem;
  }
  &__description {
    margin-top: 2rem;
  }
  &__learnt {
    color: $secondary;
  }
}
@media (min-width: 768px) {
  .experience {
    &__list {
      &::before {
        display: initial;
      }
    }
    &__item {
      display: flex;
    }
    &__time-place {
      margin-bottom: 0;
      display: block;
      width: 16.66667%;
    }
    &__place, 
    &__time {
      display: block;
    }
    &__image {
      height: 8.33333%;
      width: 8.33333%;
    }
    &__panel {
      padding: 0 0 0 2.7rem;
      margin-top: 0;
      width: 75%;
    }
    &__position,
    &__studies {
      padding: 0;
      min-height: 0;
    }
    &__description {
      margin-top: 0;
    }
  }
}
</style>
