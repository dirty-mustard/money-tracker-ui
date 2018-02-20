<template>
  <div id="app-create-tag" class="card">
    <form>
      <h3>Create a tag</h3>

      <div class="form-group">
        <b-form-input id="dateFrom" size="sm" v-model="name"></b-form-input>
      </div>

      <div class="form-group">
        <swatches v-if="!editMode" v-model="color" :colors="colors" row-length="10" swatchSize="24" inline />
        <swatches v-if="editMode" v-model="color" />
      </div>

      <button v-on:click="createTag" v-if="!editMode" class="btn btn-outline-primary">Create</button>
      <button v-on:click="updateTag" v-if="editMode" class="btn btn-outline-primary">Update</button>
      <button v-on:click="cancelEditMode" class="btn btn-outline-danger">Cancel</button>
    </form>
  </div>
</template>

<script>

import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"

import RandomColor from 'randomcolor/randomColor'

export default {
  name: 'create-tag',
  components: {
   Swatches
  },
  props: [ 'editMode', 'selectedTag'],
  mounted() {
    if (this.editMode) {
      this.name = this.selectedTag.name;
      this.color = this.selectedTag.color;
    }
  },
  watch: {
    selectedTag: function(val) {
      console.log(this.editMode)
      if (this.editMode) {
        this.name = val.name;
        this.color = val.color;
      }
    }
  },
  methods: {
    createTag: function() {
      let name = this.name;
      let color = this.color;
      this.$emit('createTag', { name: name, color, color })
    },
    updateTag: function() {
      let id = this.selectedTag.id;
      let name = this.name;
      let color = this.color;
      this.$emit('updateTag', { id: id, name: name, color, color })
    },
    cancelEditMode: function() {
      this.$emit('cancelEditMode')
    }
  },
  data: function() {
    return {
      name: null,
      color: null,
      colors: RandomColor({ count: 10 })
    }
  }
}
</script>

<style lang="scss">
h3 {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}

#app-create-tag {
  padding: 0.5rem;
  border: 0;
}
</style>
