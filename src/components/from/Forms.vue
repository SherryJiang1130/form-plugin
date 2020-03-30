<script>
import {
  Form,
  Row,
  Col
} from "iview"
import ColFormItem from "./ColFormItem"
import RowFormItem from "./RowFormItem"
export default {
  name: 'Forms',
  props: {
    formOptions: {
      type: Array,
      default:function(){
        return []
      }
    },
    formRule: {
      type: Object,
      default: function(){
        return {}
      }
    },
    formValue: {
      type: Object,
      default: function(){
        return {}
      }
    },
    options: {
      type: Object,
      default: function(){
        return {}
      }
    },
    labelWidth:{
      type:Number,
      default:function(){
        return 120
      }
    }
  },
  components: {
    Form,
    Row,
    Col,
    ColFormItem,
    RowFormItem
  },
  data(){
    return {
      formList:{}
    }
  },
  render(createElement) {
     const {formOptions,formRule,formValue,options,labelWidth,formList}=this
     const prop={
      h:createElement,
      formOptions,
      formRule,
      options,
      labelWidth,
      formList:Object.assign(formList,formValue),
      _this:this
     }
    return formJSX(prop)
  },
  methods:{
    getVal(){
      return this.formList
    },
    validate(){
      return this.$refs.formList.validate()
    },
    changeInputHandle(val,item){
      console.log(val,item)
    },
    changeSelectHandle(key,val,item){
      console.log(key,val,item)
    },
    input(){

    } 
  }
}


function formJSX({h,formOptions,options,formRule,formList,labelWidth,_this}) {
  return ( <Form  label-position="right"  ref="formList"  class="iview_form_components"  rules={formRule} model={formList} label-width={labelWidth===0?null:labelWidth}>
    < Row>
    {formOptions.map((ele,index)=>renderItem(h,ele,index,formList,options,_this))}
    </Row> </Form> )
}

function renderItem(h, item,index,formList,options,_this) {
  let renderComponent = item.type === 'row' ? 'RowFormItem' : 'ColFormItem'
 return (<renderComponent key={item.key+'_'+index} 
 form-item-data={item} form-list={formList} 
 item-list={item.rowList} 
 select-options={options}
  on-change-input-handle={(val,item)=>_this.changeInputHandle(val,item)}
  on-change-select={(key,val,item)=>_this.changeSelectHandle(key,val,item)}
  />)
}
</script>