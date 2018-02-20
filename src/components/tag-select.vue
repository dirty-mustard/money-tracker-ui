<template>
  <multiselect
    v-model="selectedTags"
    deselect-label="Can't remove this value"
    track-by="name"
    label="name"
    placeholder="Select (a) tag(s)"
    :options="tags"
    :searchable="true"
    :multiple="true"
    @close="notify">
  </multiselect>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  name: 'tag-select',
  props: [
    'tags'
  ],
  components: {
    Multiselect
  },
  data () {
    return {
      selectedTags: null
    }
  },
  methods: {
    notify: function(selectedOption, id) {
      this.$emit('tags-selected', this.selectedTags)
    }
  }
}

</script>


<style lang="scss">
@import "~vue-multiselect/dist/vue-multiselect.min.css"
</style>
