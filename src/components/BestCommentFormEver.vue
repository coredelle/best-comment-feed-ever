<template>
  <div class="comment">
    <h2>Add a Comment</h2>
    <form @submit.prevent="submitComment">
      <div class="form">
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div class="form">
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
.comment {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: lightgray;
}

.form {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 90%;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
}

button {
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
