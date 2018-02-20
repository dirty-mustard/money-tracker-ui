<template>

    <div id="app-manage-filters-list-container" class="col-12">
      <div class="card">
        <div class="card-body">
          <h1 class="float-left text-left">Filters</h1>
          <b-btn v-if="!showForm" class="float-right" variant="outline-primary" size="sm">
            <span @click="resetAndShowForm()">Create a filter</span>
          </b-btn>
        </div>

        <div class="card-body">
          <div v-if="showForm" class="card-body">
            <create-filter
              :selectedFilter="selectedFilter"
              :possibleTags="tags"
              v-on:createFilter="onFilterCreate"
            ></create-filter>
          </div>
          <div class="card-body">
            <list-filters
              v-on:filterSelected="onFilterSelected"
              v-on:deleteFilter="onDeleteFilter"
              :filters="filters"
            ></list-filters>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import ListFilters from '../components/list-filters'
import CreateFilter from '../components/create-filter'

export default {
  name: 'manage-filters',
  data: function() {
    return {
      filters: [],
      tags: [],
      selectedFilter: null,
      showForm: false
    }
  },
  components: {
    ListFilters,
    CreateFilter
  },
  computed: {},
  mounted () {
   this.getFilters();
   this.getTags();
  },
  methods: {
    onDeleteFilter (filterId) {
      this.axios.delete(`http://0.0.0.0:8080/api/filters/${filterId}`).then(() => this.getFilters());
    },
    onFilterSelected (filter) {
      this.selectedFilter = filter;
      this.showForm = true;
    },
    onFilterCreate(data) {
      this.axios.post('http://0.0.0.0:8080/api/filters', data)
        .then(() => this.getFilters())
        .catch( error => { console.log(error); });
    },
    getFilters() {
      this.axios.get('http://0.0.0.0:8080/api/filters')
        .then((response) => this.filters = response.data)
        .catch( error => { console.log(error); });
    },
    getTags() {
      this.axios.get('http://0.0.0.0:8080/api/tags')
        .then((response) => this.tags = response.data)
        .catch( error => { console.log(error); });
    },
    resetAndShowForm() {
      this.selectedFilter = null;
      this.showForm = true;
    }
  }
}

</script>

<style lang="scss" scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
