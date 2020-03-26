<template>
  <div class="hello">
    <v-form :form-options='formOptions' :form-rule='{}' :form-value='formValue' :options='{}'/>
  </div>
</template>

<script>
import Forms from './from/Forms.vue'
export default {
  name: 'HelloWorld',
  components:{'v-form':Forms},
  data(){
    return {
      formOptions:[{type:'input',key:'label1'},{type:'row',rowList:[{type:'input',key:'label2'},{type:'input',key:'label3'}]}],
      formValue:{}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
