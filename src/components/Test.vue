<template id="app">




    <div>

      <div v-bind:class="{active : isActive}">
        this is a style test.

      </div>

      <div class="static"
           v-bind:class="{ active: isActive, 'text-danger': hasError }">
          two test.
      </div>

      <div v-bind:class="classObject">
        third test.
      </div>

      <p>
        Ask a yes/no question:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>

      <hr/>

      <p>{{ message }}</p>
      <p v-model='message'></p>
      <p>{{reversedMessage}}</p>
      <br>
      <p v-text='message'></p>
      <br>
      <p v-html='message'></p>
      <br>
      <input type="text" v-model="message"/>

      <br>
      <span v-bind:title="mess">
        sdfsdfsdgsdgsAAAAA
        {{mess}}
      </span>

      <br>
      <p v-if="flag">现在为[{{flag}}]</p>
      <br>

      <ol>
        <li v-for="row in rows">key={{row.key}},value={{row.value}}</li>
      </ol>

      <button v-on:click="clickEvent">按钮</button>

    </div>
</template>

<script type="text/ecmascript-6">

  import Vue from 'vue'
  import axios from 'axios';

    export default {
        data(){
            return {
              message : 'hello test  <alert> hahaha </alert>',
              mess : '消息加载于：' + new Date(),
              flag : true,
              rows : [{key:'1',value:'长沙'},{key:'2',value:'常德'}],
              question: '',
              answer: 'I cannot give you an answer until you ask a question!',
              isActive : true,
              hasError : true,
              classObject : {
                  qqq : true,
                  www : true
              }
            }
        },
        watch : {
          question: function (newQuestion) {
            console.log("Waiting for you to stop typing...");
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
          }
        },
        methods : {
            clickEvent : function () {
              console.log("点击了按钮");
              this.flag = !this.flag;
            },
            getAnswer : function () {
                if (this.question.indexOf('?') === -1) {
                  this.answer = 'Questions usually contain a question mark. ;-)'
                  return
                }
                this.answer = 'Thinking...'
                var vm = this
                axios.get('https://yesno.wtf/api')
                  .then(function (response) {
                    vm.answer = response.data.answer
                  })
                  .catch(function (error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                  })
              },
        },
        computed: {
          // a computed getter
          reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
          }
        }

    }




</script>

<style>
.active{
  font-size: 30px;
}

.text-danger{
  color: #FF862F;
}

.qqq{
  font-size: 30px;
}

.www{
  color: #00A6C7;
}

</style>
