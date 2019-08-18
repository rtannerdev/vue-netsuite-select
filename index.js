import NSSelect from './src/components/NSSelectField/Vuetify/NSSelectField'

const selectPlugin = {
    install(Vue, options) {
        Vue.component('NSSelect',NSSelect)
    }
};

export default selectPlugin;
