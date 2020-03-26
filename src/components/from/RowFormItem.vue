<script>
import {Row} from 'iview'
import ColFormItem from './ColFormItem'
export default {
  name: 'RowFormItem',
  inheritAttrs: false,
  components: {ColFormItem, Row},
  props: {
    itemList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  render: function (createElement) {
    return this.createRow(this.itemList, createElement, this)
  },
  methods: {
    createRow (list, createElement, self) {
      return createElement('Row', {
        class: 'cus-row-form-item'
      }, [...list.map((ele, index) => {
        const data = {
          props: {
            ...self.$attrs,
            'form-item-index': index,
            'form-item-data': ele
          },
          on: {
            ...self.$listeners
          }
        }
        return (<ColFormItem {...data}/>)
      })])
    }
  }
}
</script>
