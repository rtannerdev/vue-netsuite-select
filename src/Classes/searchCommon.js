import axios from 'axios/index';

const selectEndpoint =
    '/app/site/hosting/restlet.nl?script=customscript_rl_selectcomponent_net132&deploy=customdeploy_rl_selectcomponent_net132';

class Search {
    constructor() {
        this._initMap = {};
        this._parmsMap = {};

        if (process.env.NODE_ENV !== 'production') {
            //const { NSEMAIL, NSPASSWORD, NSACCOUNT, NSROLE } = process.env;
            const NSEMAIL = process.env.NSEMAIL;
            const NSPASSWORD = process.env.NSPASSWORD;
            const NSACCOUNT = process.env.NSACCOUNT;
            const NSROLE = process.env.NSROLE;

            axios.defaults.headers = {
                'Content-Type': 'application/json;charset=utf-8',
                'User-Agent-x': 'SuiteScript-Call',
                Authorization:
                    'NLAuth nlauth_account=' +
                    NSACCOUNT +
                    ', nlauth_email=' +
                    NSEMAIL +
                    ', nlauth_signature=' +
                    NSPASSWORD +
                    ', nlauth_role=' +
                    NSROLE,
            };
        }
    }

    /**
     *
     * @param {object} args
     * @param {string} args.type
     * @param {string} args.recordType
     * @param {string} args.textField
     * @param {int} [args.maxResults]
     * @param {Array} [args.filters]
     */
    registerType(args) {
        this._parmsMap[args.type] = {
            type: args.recordType,
            textField: args.textField,
            maxResults: args.maxResults,
            filters: args.filters,
        };
    }

    invalidateInitMap(type) {
        delete this._initMap[type];
    }

    searchInitial(type, filters) {
        if (!this._parmsMap[type]) {
            return null;
        }

        if (this._initMap[type]) {
            return new Promise((resolve, reject) => {
                resolve(this._initMap[type]);
            });
        } else {
            const parms = Object.assign({}, this._parmsMap[type], {
                mode: 'search',
            });

            if (filters) {
                parms.filters = filters;
            }

            return axios
                .get(selectEndpoint, {
                    params: parms,
                })
                .then(response => {
                    this._initMap[type] = response.data;
                    return response.data;
                });
        }
    }

    /**
     * @param {object} args
     * @param {string} args.type
     * @param {string} args.searchValue
     * @param {Array} [args.filters] - Will use the
     * @returns {Promise<AxiosResponse<T>>}
     */
    runSearch(args) {
        const parms = Object.assign({}, this._parmsMap[args.type], {
            mode: 'search',
            searchValue: args.searchValue,
        });
        if (args.filters) {
            parms.filters = args.filters;
        }
        return axios
            .get(selectEndpoint, {
                params: parms,
            })
            .then(response => {
                return response.data;
            });
    }

    /**
     *
     * @param {object} args
     * @param {internalid} args.id
     * @param {string} args.type
     * @returns {Promise<AxiosResponse<T>>}
     */
    doLookup(args) {
        //lookup
        const parms = Object.assign({}, this._parmsMap[args.type], {
            mode: 'lookup',
            id: args.id,
        });

        console.log({
            selectEndpoint: selectEndpoint,
        });

        console.log({
            axiosHeaders: axios.defaults.headers,
        });

        return axios
            .get(selectEndpoint, {
                params: parms,
            })
            .then(response => {
                return response.data;
            });
    }
}

export { Search };
