import { Search } from '../../../Classes/searchCommon';
import {VSelect} from 'vuetify/lib'

export default {
    name: 'NSSelectField',
    data() {
        return {
            values: [],
            searchValue: '',
            isLoading: false,
            selected: '',
            selectedText: '',
            searchObj: undefined,
            hasMore: false,
            initialLoaded: false,
            selectedValue: this.value,
        };
    },
    props: {
        type: {
            type: String,
            required: true,
        },
        recordType: {
            type: String,
            required: true,
        },
        textField: {
            type: String,
            required: true,
        },
        searchObject: Object,
        filters: Array,
        value: {
            type: Number,
            default: 0,
        },
        label: {
            type: String,
            default: '',
        },
    },
    computed: {
        valueList() {
            if (this.hasMore) {
                return this.values;
            } else {
                return this.values.filter(e => {
                    return e.text
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase());
                });
            }
        },
    },
    mounted() {
        if (!this.searchObject) {
            this.searchObj = new Search();
        } else {
            this.searchObj = this.searchObject;
        }

        this.searchObj.registerType({
            type: this.type,
            recordType: this.recordType,
            textField: this.textField,
            filters: JSON.stringify(this.filters),
        });

        if (this.selectedValue) {
            this.searchObj
                .doLookup({ id: this.value, type: this.type })
                .then(result => {
                    console.log({
                        lookupResult: result.results.text,
                    });
                    this.selectedText = result.results.text;
                    this.appendSelected();
                });
        }

        // this.searchObj=new Search();
        // this.searchObj.registerType({
        //     type: 'location',
        //     recordType: 'item',
        //     textField: 'salesdescription',
        //     filters: JSON.stringify([['matrix','is',true],'AND',['matrixchild','is',false]])
        // })
    },
    watch: {
        filters: function(newVal, oldVal) {
            console.log({
                newFilter: newVal,
            });
            this.initialLoaded = false;
            this.selectedText = '';
            this.values = [];
            this.searchObj.invalidateInitMap(this.type);
        },
    },
    methods: {
        doSearch() {
            if (this.searchValue.length > 0) {
                this.isLoading = true;
                this.values = this.getBlankValues();
                const searchArgs = {
                    type: this.type,
                    searchValue: this.searchValue,
                };
                this.searchObj.runSearch(searchArgs).then(result => {
                    this.values = result.results;
                    this.isLoading = false;
                    this.searchValue = '';
                    this.appendSelected();
                });
            }
        },
        searchPressed() {
            this.doSearch();
        },
        clicked(args) {
            if (!this.initialLoaded) {
                this.initialLoaded = true;
                this.isLoading = true;
                this.searchObj
                    .searchInitial(this.type, JSON.stringify(this.filters))
                    .then(result => {
                        console.log(result);
                        this.values = result.results;
                        this.hasMore = result.moreResults;
                        this.isLoading = false;
                        this.appendSelected();
                        this.$nextTick(this.$refs.searchField.focus());
                    });
            } else {
                setTimeout(() => {
                    this.$nextTick(this.$refs.searchField.focus());
                }, 100);
            }
        },
        searchKeyUp(e) {
            if (e.keyCode === 13 && this.hasMore) {
                this.doSearch();
            }
        },
        updateValue() {
            const lookupResult = this.values.find(e => {
                return e.value === this.selectedValue;
            });

            this.selectedText = lookupResult.text;

            this.$emit('input', this.selectedValue);
        },
        appendSelected() {
            if (this.selectedValue && this.selectedText) {
                this.values.push({
                    text: this.selectedText,
                    value: this.value,
                });
            }
        },
        getBlankValues() {
            const res = [];
            if (this.selectedValue && this.selectedText) {
                res.push({
                    text: this.selectedText,
                    value: this.value,
                });
            }
            return res;
        },
    },
    components: {
        VSelect
    }
};
