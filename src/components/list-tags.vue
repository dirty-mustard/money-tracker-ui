<template>
  <b-table :items="tags" :fields="fields">
      <template slot="name" slot-scope="data" >
        <b-button @click.stop="selectTag(data.item)" class="btn btn-sm ml-1 btn-outline-primary float-right">
          <font-awesome-icon size="sm" :icon="iconEdit" />
        </b-button>
        <b-button @click.stop="deleteTag(data.item.id)" class="btn btn-sm btn-outline-danger float-right">
          <font-awesome-icon size="sm" :icon="iconTrash" />
        </b-button>
        {{ data.value }} <i class="color" v-bind:style="renderColor(data.item.color)"></i>
      </template>
  </b-table>
</template>

<script>

import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'

export default {
  name: 'list-tags',
  props: ['tags'],
  components: {
    FontAwesomeIcon,
    faTrashAlt,
    faEdit
  },
  computed: {
    iconTrash () {
      return faTrashAlt
    },
    iconEdit () {
      return faEdit
    }
  },
  methods: {
    deleteTag: function (tagId) {
      this.$emit('deleteTag', tagId)
    },
    selectTag: function (tag) {
      this.$emit('selectTag', tag)
    },
    renderColor: function(color) {
      return { 'background-color': color };
    }
  },
  data () {
    return {
      fields: {
        name: {
          label: 'Name',
          sortable: true
        }
      }
    }
  }
}
</script>

<style lang="scss">
.color {
  display: block;
  float: left;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  margin-right: 10px;
}
.table {

  border-radius: 8px;
  text-align: left;
  tr, thead, th {
    border: 0;
  }

  thead th {
    // border: 0;
    border: 0;
  }

  td {
    border: 0;
    line-height: 24px;
  }
}
</style>
