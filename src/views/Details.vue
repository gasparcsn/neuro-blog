<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.body }}</p>
    <span v-for="tag in post.tags" :key="tag" class="pill">
        #{{tag}}
    </span>
    <button @click="handleClick" class="delete">Delete Post</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'

// components
import getPost from '@/composables/getPost'
import Spinner from '../components/Spinner.vue'
import { projectFirestore } from '@/firebase/config'

export default {
    name: 'Details',
    props: ['id'],
    components: { Spinner },
    setup(props) {
      
      const route = useRoute()
      const router = useRouter()

      const { post, error, load } = getPost(route.params.id)

      load()

      const handleClick = async () => {
        await projectFirestore.collection('posts')
          .doc(props.id)
          .delete()

        router.push({ name: 'Home' })
      }

      return {post, error, handleClick }
    },
}
</script>

<style scoped>
  .tags a {
    margin-right: 10px;
  }
  .post {
    max-width: 1200px;
    margin: 0 auto;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>