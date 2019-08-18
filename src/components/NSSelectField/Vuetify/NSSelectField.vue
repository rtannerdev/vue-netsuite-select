<template>
    <v-select
        :items="valueList"
        :loading="isLoading"
        dense
        :no-data-text="isLoading?`Loading...`:`No Results`"
        @focus="clicked"
        @input="updateValue"
        class="nsTextFix"
        v-model="selectedValue"
        :label="label"
    >
        <template v-slot:prepend-item>

                <v-layout row>
                    <v-flex xs8>
                        <v-text-field
                                label="Search"
                                placeholder="Search..."
                                ref="searchField"
                                v-model="searchValue"
                                solo
                                flat
                                class="nsTextFix"
                                v-on:keyup="searchKeyUp"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs4 v-if="hasMore">
                        <v-btn text @click="searchPressed">Search</v-btn>
                    </v-flex>
                </v-layout>


        </template>
        <template v-slot:append-item v-if="isLoading">
            <v-container>
                <v-layout row align-content-center justify-center>
                    <v-flex xs12>
                        <v-progress-circular
                                indeterminate
                        ></v-progress-circular>
                    </v-flex>
                </v-layout>
            </v-container>
        </template>
    </v-select>
</template>

<script src="../JS/SelectFieldComponent.js"></script>

<style scoped>
    .nsTextFix >>> .v-select__selections > input{
        border: 0px !important;
        border-top-color: rgb(204, 204, 204) !important;
        border-top-style: solid !important;
        border-top-width: 0px !important;
        border-right-color: rgb(204, 204, 204) !important;
        border-right-style: solid !important;
        border-right-width: 0px !important;
        border-bottom-color: rgb(204, 204, 204) !important;
        border-bottom-style: solid !important;
        border-bottom-width: 0px !important;
        border-left-color: rgb(204, 204, 204) !important;
        border-left-style: solid !important;
        border-left-width: 0px !important;
        border-image-source: initial !important;
        border-image-slice: initial !important;
        border-image-repeat: initial !important;
    }

    .nsTextFix >>> .v-select__selections > input:enabled:focus{
        border: 0px !important;
        border-top-color: rgb(204, 204, 204) !important;
        border-top-style: solid !important;
        border-top-width: 0px !important;
        border-right-color: rgb(204, 204, 204) !important;
        border-right-style: solid !important;
        border-right-width: 0px !important;
        border-bottom-color: rgb(204, 204, 204) !important;
        border-bottom-style: solid !important;
        border-bottom-width: 0px !important;
        border-left-color: rgb(204, 204, 204) !important;
        border-left-style: solid !important;
        border-left-width: 0px !important;
        border-image-source: initial !important;
        border-image-slice: initial !important;
        border-image-repeat: initial !important;
    }
</style>