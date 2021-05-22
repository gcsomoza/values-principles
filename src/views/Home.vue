<template>
  <div class="home">
    <nav class="nav">
      <img alt="Vue logo" src="../assets/logo.png">
    </nav>
    <section class="container">
      <Values></Values>
      <Principles></Principles>
    </section>
  </div>
</template>

<script>
import Values from '@/components/Values.vue'
import Principles from '@/components/Principles.vue'

export default {
  name: 'Home',
  components: {
    Values,
    Principles,
  },
}
</script>

<style lang="scss">
.nav {
  display: flex;

  img {
    width: 45px;
    height: 45px;
  }
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  padding-bottom: 25px;
}
</style>
