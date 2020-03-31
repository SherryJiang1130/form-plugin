<template>
  <div class="wrap">
    <v-forms :form-options='formOptions' :form-rule='formRule' :form-value='formValue' :options='selectOpts'  ref='vForm'></v-forms>
    <Button @click='submit'>submit</Button>
  </div>
</template>
<script>


import {Button} from "iview"
export default {
  name: 'Wrap',
  components:{Button},
  methods:{
       submit(){
        // this.$alert('嗨，欢迎一起来学习')
         const vform=this.$refs.vForm
         vform.validate().then(validate=>{
           if(validate){
           console.log(vform.getVal())
           }
         })
    }
  },
  data(){
    return {
      formOptions:[{type:'input',key:'label1'},
      {type:'row',rowList:[{type:'input',key:'label2',spans:12},{type:'input',key:'label3',spans:12},{type:'select',key:'select1'}
      ]}
      ],
      formRule:{select1:[{required:true,type:'string'}]},
      formValue:{label1:33,label2:'dsd',label3:'878'},
      selectOpts:{select1:{1:'aa',2:'bb',3:'vvv'}}
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
