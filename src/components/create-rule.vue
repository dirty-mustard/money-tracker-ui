<template>
  <div id="app-create-rule" class="card">
    <form>
      <h3>Create a rule</h3>

      <div class="form-group">
        <filter-select v-on:filter-selected="onFilterSelected" :filters="possibleFilters"></filter-select>
      </div>

      <div class="form-group">
        <tag-select v-on:tags-selected="onTagsSelected" :tags="possibleTags"></tag-select>
        <pre class="language-json"><code>{{ value }}</code></pre>
      </div>

      <button v-on:click="createRule" class="btn btn-outline-primary">Create</button>
    </form>
  </div>
</template>

<script>

import FilterSelect from './filter-select'
import TagSelect from './tag-select'

export default {
  name: 'create-rule',
  components: {
    FilterSelect,
    TagSelect
  },
  props: ['possibleTags', 'possibleFilters'],
  computed: {
    value: function() {
      return {
        filterId: this.selectedFilter !== null ? this.selectedFilter.id : null,
        tagIds:  this.selectedTagIds.map((tag) => tag.id)
      };
    }
  },
  methods: {
    onFilterSelected: function(filter) {
      this.selectedFilter = filter;
    },
    onTagsSelected: function(tagIds) {
      this.selectedTagIds = tagIds;
    },
    createRule: function() {
      let filterId = this.selectedFilter !== null ? this.selectedFilter.id : null;
      let tagIds = this.selectedTagIds.map((tag) => tag.id);
      this.$emit('createRule', { filter: filterId, tagsToApply: tagIds })
    }
  },
  data: function() {
    return {
      selectedFilter: null,
      selectedTagIds: []
    }
  }
}
</script>

<style lang="scss">
h3 {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}

#app-create-rule {
  padding: 0.5rem;
  border: 0;
}
</style>
