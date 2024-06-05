<template>
  <div>
    <h2>Comments</h2>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <p>{{ comment.message }}</p>
      <small>{{ comment.name }} - {{ new Date(comment.created).toLocaleString() }}</small>
    </div>
  </div>
</template>

<script>
import { Api } from '../api';

export default {
  data() {
    return {
      comments: [],
    };
  },
  async created() {
    await this.fetchComments();
    this.$socket.on('commentAdded', (comment) => {
      this.comments.push(comment);
    });
  },
  methods: {
    async fetchComments() {
      try {
        const response = await Api.get('/getComments');
        this.comments = response;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
  },
};
</script>

<style scoped>
.comment {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
