<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <p>
    <button @click="showModal">
      Show modal
    </button>
  </p>
  <!-- If the option changed modal component the name
  <MyModal>
  -->
  <Modal
          v-model="isShow"
          :close="closeModal"
  >
    <div class="modal">
      <p>
        Hello
      </p>
      <button @click="closeModal">
        close
      </button>
    </div>
  </Modal>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup () {
      const isShow = ref(false)

      function showModal () {
        isShow.value = true
      }

      function closeModal () {
        isShow.value = false
      }

      return {
        isShow,
        showModal,
        closeModal
      }
    }
  })
</script>

<style scoped>
  .modal {
    width: 300px;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 20px;
    text-align: center;
    height: auto;
    top: 50%;
    left: 50%;
    display: inline;
    transform: translate(-50%,-50%);
  }
</style>