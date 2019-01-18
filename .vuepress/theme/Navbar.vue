<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item navbar-logo" href="/">
        <i class="iconfont logo">&#xe600;</i>&nbsp;风散云烟
        
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" :href="nav.link" v-for="nav in navs" :key="nav.text">
          {{nav.text}}
        </a>

      </div>

      <!-- <div class="navbar-end">
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Find a repository">
            </div>
            <div class="control">
              <a class="button is-info">
                Search
              </a>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </nav>
</template>


<script>
export default {
  computed: {
      navs () {
          return this.$site.themeConfig.nav;
      }
  }
}
</script>
<style scoped>
.logo{font-size: 24px;color:#8bc34a;}
.navbar-logo{font-size: 22px;color:black;font-weight: bold;}
</style>
