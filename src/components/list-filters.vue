<template>
  <b-table :items="filters" :fields="fields">
    <template slot="name" slot-scope="row">
      <b>{{row.value }}</b>
    </template>
    <template slot="settings" slot-scope="row">
      <template v-for="(value, key) in row.item">
        <code :key="key" v-if="showFilter(key, value)">{{ key }}: {{ value}}<br /></code>
      </template>
    </template>
    <template slot="action" slot-scope="row">
      <b-button @click="deleteFilter(row.item.id)" class="btn btn-sm mr-2 btn-outline-danger float-right">
        <font-awesome-icon size="sm" :icon="iconTrash" />
      </b-button>
      <b-button @click="editFilter(row.item)" class="btn btn-sm mr-2 btn-outline-primary float-right">
        <font-awesome-icon size="sm" :icon="iconEdit" />
      </b-button>
    </template>
  </b-table>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'

const showFieldsInDetailView = [
  'from', 'to', 'description', 'amount', 'accountHolder', 'account',
  'offsetAccount', 'tags', 'option'
]

export default {
  name: 'list-filters',
  props: ['filters'],
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
  data () {
    return {
      fields: {
        name: {
          label: 'Name',
          sortable: true
        },
        settings: {
          label: 'Settings'
        },
        action: {
          label: ''
        }
      }
    }
  },
  methods: {
    deleteFilter: function (filterId) {
      this.$emit('deleteFilter', filterId)
    },
    editFilter: function (filter) {
      this.$emit('filterSelected', filter)
    },
    showFilter: function(key, value) {
      return showFieldsInDetailView.includes(key)
        && (!Array.isArray(value) && value !== null) || (Array.isArray(value) && value.length > 0);
    }
  }
}
</script>
