<template id="">


  <div>

    <input v-model.lazy="message"/>
    <p>{{message}}</p>

    <select v-model="selected" multiple style="width: 50px">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <br>
    <span>Selected: {{ selected }}</span>

    <button @click="buttonCount">按钮一号</button>
    <p>这个按钮被按了 {{count}} 次！</p>

    <input v-on:keyup.up="keylisten"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: [],
    data(){
      return {
        count: 0,
        selected : [],
        message : 'test'
      }
    },
    watch: {},
    methods: {
      buttonCount: function (event) {
        console.log(this.count);
        this.count += 1;
        console.log(event);
      },
      keylisten: function () {
        console.log("1222");
      }
    }
  }
</script>
