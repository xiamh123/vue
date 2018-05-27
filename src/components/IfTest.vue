<template id="IfTest">
  <div>
    <div v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input">
    </div>
    <div v-else>
      <label>email</label>
      <input placeholder="Enter your email" key="email-input">
    </div>
    <button v-on:click="changeLoginType">按钮</button>
    <h1 v-show="loginType==='username'">show test !!!</h1>
    <hr/>
    <div>
      <ul>
        <li v-for="(item,index) in items">
          {{ok}} - {{item.message}} - {{index}}
        </li>
      </ul>
    </div>
    <hr/>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        loginType: 'username',
        ok : true,
        items : [
          {message : 'changsha'},
          {message : 'changde'}
        ]
      }
    },
    methods: {
      changeLoginType: function () {
        console.log(this.loginType);
        this.loginType = this.loginType == 'username' ? 'email' : 'username';
        this.ok = !this.ok;
      }

    }
  }
</script>
