<script>
import {Input, Select, Col, Row, FormItem, Option} from 'iview'
import {isObject} from '@/utils'
export default {
  name: 'ColFormItem',
  components: {Input, Select, Col, Row, FormItem, Option },
  props: {
    isCol: {
      type: Boolean
    },
    formList: {
      type: Object
    },
    selectOptions: {
      type: Object
    },

    formItemData: {
      type: Object
    },
    FormItemIndex: {
      type: Number
    },
  },
  data () {
    return {
      itemTypes: {
        input: 'inputRender',
        select: 'selectRender',
      },
    }
  },
  render (createElement) {
      return this.createFormItem(this.formItemData, createElement, this)
  },
  methods: {
    createFormItem (item, createElement, self) {
      const {spans, key, star, children} = item
      return createElement('Col', {
        props: {
          span:  spans
        },
        class: 'cus-col-form-item'

      }, [ createElement('FormItem', {
        props: {
          label: key,
          prop: key,
          key: self.FormItemIndex
        },
        class: {
          star: star,
        }
      }, [children ? self.createChildren(children, createElement, self) : self.createItem(item, createElement, self)])])
    },
    createChildren (list, createElement, self) {
      return createElement('Row', {
        props: {
          gutter: 4
        }
      }, list.map((ele, index) => self.createColItem(ele, createElement, self, index)))
    },
    createColItem (ele, createElement, self, index) {
      return createElement('Col', {
        props: {
          span: ele.spans
        }
      }, [createElement('FormItem', {
        props: {prop: ele.key, key: index},
        class: {
          modifyStyle: self.checkModify(ele.key)

        }
      }, [self.createItem(ele, createElement, self)])])
    },
    createItem (item, createElement, self) {
      let tagName = this.itemTypes[item.type]
      if (tagName && self[tagName]) {
        return self[tagName](item, createElement, self)
      }
    },
    inputRender (item, createElement, self) {
      const {disabled, placeholder, clear, maxlength, size, key,} = item
      return (<Input v-model={self.formList[key]}
        size= {size || 'default'}
        placeholder={placeholder}
        disabled={disabled}
        clearable={clear}
        maxlength={maxlength}
        type= 'text'
        class='row-form-item radius_border'
        on-on-change={() => {
          self.$emit('change-input-handle', self.formList[key], item)
        }}
      >
      </Input>)
    },
    selectRender (item, createElement, self) {
      const {disabled, placeholder, clear, size, key, multiple,filterable} = item
      return (<Select
        v-model={self.formList[key]}
        disabled={disabled}
        placeholder={placeholder}
        size={size || 'default'}
        clear={clear}
        multiple={multiple}
        filterable={filterable}
        label-in-value={false}
        class='row-form-item radius_border'
        on-on-change={(val) => self.$emit('change-select', key, val, item)}
      >
        {self.selectOptions[key] ? self.selectOptionItem(self.selectOptions[key], createElement, self, item) : ''}
      </Select>)
    },
    selectOptionItem (options = [], createElement, self, item) {
      const {val, label} = item
      let loopOptions = this.objTransferToArr(options)
      return loopOptions.map((ele, index) => {
        return createElement('Option', {
          props: {
            value: val ? ele[val] : ele.code,
            key: index,
            label: label ? ele[label] : ele.name
          },
          tag: 'Option'
        }, label ? ele[label] : ele)
      })
    },
    objTransferToArr (obj) {
      if (isObject(obj)) {
        let keys = Object.keys(obj)
        return keys.map(ele => { return {code: String(ele), name: obj[ele]} })
      } else {
        return obj
      }
    }
  }
}

</script>