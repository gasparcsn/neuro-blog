<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
        <PostList :posts='postsWithtag'/>
        <TagCloud :posts='posts' />
    </div>
    <div v-else>
        <Spinner />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// components
import PostList from '../components/PostList.vue'
import Spinner from '../components/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
// composables
import getPosts from '../composables/getPosts'

export default {
    components: { PostList, Spinner, TagCloud },
    setup(){
        const route = useRoute()
        const { posts, error, load } = getPosts()

        load()

        const postsWithtag = computed(() => {
            return posts.value.filter(post => post.tags.includes(route.params.tag))
        })

        return {error, posts, postsWithtag}
    }
}
</script>

<style>
  .tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
</style>