<template>
  <div id="app-navbar">
    <b-navbar toggleable="md" type="dark" variant="mt">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">{{ name }}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="$auth.check()">
          <b-nav-form @submit="onSubmit" class="search-form">
              <FontAwesomeIcon class="fa-search" :icon="iconSearch" />
              <b-form-input autocomplete="off" v-model="form.search" size="sm" class="search mr-sm-2" type="text" placeholder="Search"/>
          </b-nav-form>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-navbar v-if="$auth.check()" id="app-navbar-second" toggleable="md" type="light" variant="light" class="d-flex justify-content-center">
      <b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item to="/">
            <FontAwesomeIcon :icon="iconFaHome" /> <strong>Dashboard</strong>
          </b-nav-item>
          <b-nav-item to="/manage-rules">
            <FontAwesomeIcon :icon="iconFaCogs" /> Rule Engine
          </b-nav-item>
          <b-nav-item to="/manage-filters">
            <FontAwesomeIcon :icon="iconFaFilter" /> Filters
          </b-nav-item>
          <b-nav-item to="/manage-tags">
            <FontAwesomeIcon :icon="iconFaTags" /> Tags
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import faCogs from '@fortawesome/fontawesome-free-solid/faCogs'
import faFilter from '@fortawesome/fontawesome-free-solid/faFilter'
import faTags from '@fortawesome/fontawesome-free-solid/faTags'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      form: {
        search: ''
      }
    }
  },
  computed: {
    iconFaTags() {
      return faTags
    },
    iconSearch() {
      return faSearch
    },
    iconFaFilter() {
      return faFilter
    },
    iconFaHome () {
      return faHome
    },
    iconFaCogs () {
      return faCogs
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (_.has(this.form, 'search') && this.form.search !== '') {
        this.$router.push({ path: '/home', query: { searchCriteria: this.form.search }})
      } else {
       this.$router.push({ path: '/home' })
      }
    }
  },
  props: [
    'name'
  ]
}
</script>

<style lang="scss">
#app-navbar {
  .bg-mt {
    /*background-color: rgba(84, 128, 233, 1);*/
    background: #4e54c8; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4e54c8, #8f94fb); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4e54c8, #8f94fb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .search-form .fa-search {
      color: hsla(0,0%,100%,.7);
      margin-left: 10px;
      margin-top: -12px;
  }
  .search-form {
      background: rgba(0,0,0,.1);
      position: relative;
      border-radius: 2px;
      margin: .594rem 1rem;
      display: block;
  }
  .width-enter-active, .width-leave-active {
    transition: width .5s
  }
  .width-enter, .width-leave-to /* .fade-leave-active in <2.1.8 */ {
      width: 60rem;
  }
  input.form-control {
    -moz-box-shadow: 0 0 0;
    -webkit-box-shadow: 0 0 0;
    box-shadow: 0 0 0;
    color: white;
    -webkit-transition: all 0.2s ease-in;  /* Chrome 1-25, Safari 3.2+ */
    -moz-transition: all 0.2s ease-in;  /* Firefox 4-15 */
    -o-transition: all 0.2s ease-in;  /* Opera 10.50–12.00 */
    transition: all 0.2s ease-in;  /* Chrome 26, Firefox 16+, IE 10+, Opera 12.10+ */
    width: 4rem;

    &:active,&:focus,&:hover {
        width: 80rem;
    }
  }
  .search {
    background: transparent;
    color: hsla(0,0%,100%,.7);
    border: none;
    cursor: text;
  }

  #app-navbar-second {
    background: #d3cce3; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #d3cce3, #e9e4f0); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #d3cce3, #e9e4f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
