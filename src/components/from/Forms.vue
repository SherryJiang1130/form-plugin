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
      formValue,
      options,
      labelWidth,
      formList:formList
     }
    return formJSX(prop)
  }
}


function formJSX({h,formOptions,formRule,formList,labelWidth}) {
  return ( <Form  label-position="right"  ref="formList"  class="iview_form_components"  rules={formRule} model={formList} label-width={labelWidth===0?null:labelWidth}>
    < Row>
    {formOptions.map((ele,index)=>renderItem(h,ele,index,formList))}
    </Row> </Form> )
}

function renderItem(h, item,index,formList) {
  let renderComponent = item.type === 'row' ? 'RowFormItem' : 'ColFormItem'

 // return h(renderComponent,{key:item.key+'_'+index,props:{formItemData:item,formList:formList,itemList:item.rowList}})
 return (<renderComponent key={item.key+'_'+index} form-item-data={item} form-list={formList} item-list={item.rowList}/>)
}
</script>