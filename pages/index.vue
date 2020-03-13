<template>
  <div class="page-index">
    <div class="container">
      <BlogSection :blogs="blogs"/>
      <About />
      <Experience />
      <Hobby />
    </div>
  </div>
</template>

<script>
  import BlogSection from "~/components/Sections/BlogSection"
  import About from "~/components/Sections/About"
  import Experience from "~/components/Sections/Experience"
  import Hobby from "~/components/Sections/Hobby"

  import blogsKo from '~/contents/ko/blogsKo.js'
  import blogsEn from '~/contents/en/blogsEn.js'

  export default {
    async asyncData ({app}) {

      const blogs = app.i18n.locale === 'ko' ? blogsKo : blogsEn
      
      async function asyncImport (blogName) {
        const wholeMD = await import(`~/contents/${app.i18n.locale}/blog/${blogName}.md`)
        return wholeMD.attributes
      }

      return Promise.all(blogs.map(blog => asyncImport(blog)))
      .then((res) => {
        return {
          blogs: res
        }
      })
    },
    
    components: { 
      BlogSection, 
      About, 
      Experience,
      Hobby
    },

    transition: {
      name: 'slide-fade'
    },

    head () {
      return {
        title: this.$t('indexPageHead.title'),
        htmlAttrs: {
          lang: this.$i18n.locale,
        },
        meta: [
          { name: "author", content: "Bella.L" },
          { name: "description", property: "og:description", content: this.$t('indexPageHead.description'), hid: "description" },
          { property: "og:title", content: this.$t('indexPageHead.title') },
          { property: "og:image", content: this.ogImage },
          { name: "twitter:description", content: this.$t('indexPageHead.description') },
          { name: "twitter:image", content: this.ogImage }
        ]
      };
    },

    computed: {
      ogImage: function () {
        return;
      }
    }
  }
</script>
