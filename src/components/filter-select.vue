<template>
  <multiselect
    v-model="filter"
    deselect-label="Can't remove this value"
    track-by="name"
    label="name"
    placeholder="Select a filter"
    :options="filters"
    :searchable="true"
    v-on:select="notify"
    :allow-empty="false">
  </multiselect>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  name: 'filter-select',
  props: ['filters', 'selectedFilter'],
  data: function() {
    return {
      filter: null
    }
  },
  watch: {
    selectedFilter: function(to, from) {
      this.filter = to;
    }
  },
  mounted() {
    this.filter = this.selectedFilter
  },
  components: {
    Multiselect
  },
  methods: {
    notify: function(selectedOption, id) {
      this.$emit('filter-selected', selectedOption)
    }
  }
}

</script>


<style lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css"
</style>
