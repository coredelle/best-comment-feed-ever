<template>
  <div>
    <h2>Add a Comment</h2>
    <form @submit.prevent="submitComment">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="message">Comment:</label>
        <textarea v-model="message" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { Api } from '../api';

export default {
  data() {
    return {
      name: '',
      message: '',
    };
  },
  methods: {
    async submitComment() {
      const newComment = {
        name: this.name,
        message: this.message,
      };
      try {
        const response = await Api.post('/createComment', newComment);
        this.$emit('submitComment', newComment);
        this.$socket.emit('commentAdded', response);
        this.name = '';
        this.message = '';
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
