<template id="invok">
    <div>
      <button v-on:click="newNodeEvent">子调父</button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props : [],
        methods : {
          newNodeEvent : function(){
            this.$emit('newNodeEvent', '我是子元素传过来的')
          }
        }
    }
</script>
