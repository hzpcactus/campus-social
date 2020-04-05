import Vue from 'vue';
Vue.component('icon',{
    name:'icon',
    template:`<svg class="icon" aria-hidden="true">
                <title v-if = "title">{{this.icon}}</title>   
                <use xlink:href="#${this.iconpng}"></use>
              </svg>`,
    props:["title","iconpng"],
})