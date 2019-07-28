<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="mailto:mariof@usc.edu">
            Email Developer
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="https://elitebyte.tech">
            Developer Site
          </a>
        </li>
      </ul>
      <div class="copyright">
        © {{year}} made by
        <a href="https://elitebyte.tech/" target="_blank" rel="noopener">EliteByteTech</a> for LPFM LA
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>
