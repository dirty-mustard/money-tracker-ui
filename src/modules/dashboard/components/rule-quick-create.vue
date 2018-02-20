<template>
    <b-card id="app-rule-quick-create" header-tag="header">
        <div slot="header" class="mb-0">
            <p class="float-left">Create rule for current search results</p>
            <b-button
                    @click="closeRuleQuickCreatePanel"
                    variant="outline-secondary"
                    size="sm"
                    class="check float-right"
                    v-b-popover.hover.top="'Close panel'"
            >
                <font-awesome-icon size="1x" :icon="iconTimes" />
            </b-button>
        </div>

        <b-row>
            <b-col cols="10" class="mb-2">
                <b-input type="text" size="sm" placeholder="Enter a name..." v-model="name" />
            </b-col>
        </b-row>

        <b-row>
            <b-col cols="10">
                <tag-select v-on:tags-selected="onTagsSelected" :tags="possibleTags"></tag-select>
            </b-col>
            <b-col cols="ml-auto">
                <b-button class="check" size="sm" variant="outline-primary" @click="saveRule">
                    <font-awesome-icon v-if="!showBusyWithCreatingRule" size="1x" :icon="iconCheck" />

                    <font-awesome-icon
                            v-if="showBusyWithCreatingRule"
                            class="loader"
                            size="1x"
                            :icon="iconSpinner" spin />
                </b-button>
            </b-col>
        </b-row>

    </b-card>
</template>

<script>

    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import TagSelect from '../../../components/tag-select'

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
    import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
    import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

    export default {
        name: "rule-quick-create",
        components: {
            TagSelect,
            FontAwesomeIcon
        },
        data: function() {
            return {
                name: null,
                selectedTagIds: []
            };
        },
        computed: {
            ...mapGetters('dashboard', {
                possibleTags: 'tags',
                searchCriteria: 'searchCriteria',
                showBusyWithCreatingRule: 'showBusyWithCreatingRule',
            }),
            iconCheck() {
                return faCheck
            },
            iconTimes() {
                return faTimes
            },
            iconSpinner() {
                return faSpinner
            }
        },
        methods: {
            ...mapActions('dashboard', {
                createRule: 'CREATE_RULE'
            }),
            ...mapMutations('dashboard', ['closeRuleQuickCreatePanel']),
            onTagsSelected: function (tagIds) {
                this.selectedTagIds = tagIds;
            },
            saveRule: function() {
                this.createRule({
                    name: this.name,
                    tagIds: this.selectedTagIds.map(tag => tag.id),
                    criteria: this.searchCriteria
            });
            }
        }
    }
</script>

<style lang="scss" scoped>
#app-rule-quick-create {
    border: 0!important;
    background-color: transparent !important;

    .card-body {
        background-color: transparent !important;
    }

    .check {
        /*line-height: 1.8rem;*/
        cursor: pointer;
        font-size: 1.2rem;
        border: 0;

        &:hover {
            background: transparent;
            color: #007bff;
        }
    }

    .card-header {
        padding: 0.4rem;
        background-color: transparent!important;

        p {
            margin: 0;
            line-height: 1.5rem;
            color: rgba(0,0,0,0.5);
            font-size: 1rem;
        }

        button {
            font-size: 10px;
            border: 1px solid rgba(0,0,0,0.1);
            font-weight: normal;
        }
    }
}
</style>
