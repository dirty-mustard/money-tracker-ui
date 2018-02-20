<template>
  <div class="row justify-content-center">

    <div class="col-8">
      <div class="card">
        <div class="card-body">
              <div class="col-12">
                <h1 class="float-left">Tags</h1>
                <b-button
                  variant="outline-primary"
                  size="sm"
                  class="float-right"
                  @click="editMode = false; showForm = true">
                  Create a tag
                </b-button>
              </div>
        </div>
        <div v-if="showForm" class="card-body">
            <create-tag
              :editMode="editMode"
              :selectedTag="selectedTag"
              v-on:updateTag="updateTag"
              v-on:cancelEditMode="onCancelEditMode"
              v-on:createTag="createTag"
            ></create-tag>
        </div>
        <div class="card-body">
            <list-tags
              v-on:selectTag="onSelectedTag"
              v-on:deleteTag="deleteTag"
              :tags="tags"></list-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ListTags from '../components/list-tags'
import CreateTag from '../components/create-tag'

export default {
  name: 'manage-tags',
  data: function() {
    return {
      tags: [],
      editMode: false,
      showForm: false,
      selectedTag: {
        name: null,
        color: null
      }
    }
  },
  components: {
    ListTags,
    CreateTag
  },
  mounted () {
   this.getTags();
  },
  methods: {
    deleteTag(tagId) {
      this.axios.delete(`http://0.0.0.0:8080/api/tags/${tagId}`).then(() => this.getTags());
    },
    createTag: function(tag) {
      this.axios.post('http://0.0.0.0:8080/api/tags', tag)
        .then((response) => this.getTags())
        .catch( error => { console.log(error); });
    },
    updateTag: function(tag) {
      let tagId = tag.id;
      this.axios.put(`http://0.0.0.0:8080/api/tags/${tagId}`, tag)
        .then((response) => this.getTags())
        .catch( error => { console.log(error); });
    },
    onCancelEditMode: function() {
      this.selectedTag = { name: null, color: null };
      this.editMode = false;
      this.showForm = false;
    },
    onSelectedTag: function(tag) {
      this.selectedTag = tag;
      this.editMode = true;
      this.showForm = true;
    },
    getTags() {
      this.axios.get('http://0.0.0.0:8080/api/tags')
        .then((response) => this.tags = response.data)
        .catch( error => { console.log(error); });
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
