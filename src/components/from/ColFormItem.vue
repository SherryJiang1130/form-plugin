<script>
import {Input, Select, Col, Row, FormItem, Option, DatePicker, RadioGroup, Radio, CheckboxGroup, Checkbox, Button, Upload, Tag, Icon} from 'iview'
import {isObject, isArray} from '@/utils'
export default {
  name: 'ColFormItem',
  components: {Input, Select, Col, Row, FormItem, Option, DatePicker, RadioGroup, Radio, CheckboxGroup, Checkbox, Button, Upload, Tag, Icon},
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
    dateOptions: {
      type: Function
    },
    defaultDateOptions: {
      type: Function
    },
    globalDisabled: {
      type: Boolean
    },
    dateFormat: {
      type: String,
      default: function () {
        return 'yyyy-MM-dd'
      }
    },
    formItemData: {
      type: Object
    },
    FormItemIndex: {
      type: Number
    },
    modifiedProperty: {
      type: Array,
      default: function () {
        return []
      }
    },
    defaultFileList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      itemTypes: {
        input: 'inputRender',
        password: 'inputRender',
        select: 'selectRender',
        date: 'dateRender',
        radioGroup: 'radioGroupRender',
        checkbox: 'checkboxRender',
        checkboxGroup: 'checkboxGroupRender',
        text: 'textRender',
        line: 'lineRender',
        upload: 'uploadRender',
        button: 'colButtonRender'
      },
      btnIndex: 0,
      inputType: {
        newPassword: 'password',
        repeatPwd: 'password',
        oldPassword: 'password',
        password: 'password',
        loginPassword: 'password'
      }
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
      const {disabled, placeholder, clear, maxlength, size, key, store, textarea} = item
      return (<Input v-model={self.formList[key]}
        size= {size || 'default'}
        placeholder={placeholder}
        disabled={ self.globalDisabled || (store ? self.$store.state[store] : disabled)}
        clearable={clear}
        maxlength={maxlength}
        type={textarea ? 'textarea' : this.inputType[key] ? this.inputType[key] : 'text'}
        class='row-form-item radius_border'
        on-on-change={(val) => {
          self.$emit('change-input-handle', val, item)
        }}
        on-on-blur={() => {
          self.$emit('change-select', key, self.formList[item.key], item)
        }}
        on-on-focus={() => {
          self.$emit('input-focus-handle', key, self.formList[item.key], item)
        }}
      >
        {self.inputSuffix(item)}

      </Input>)
    },
    inputSuffix (item) {
      const {key, showIcon, iconList} = item
      if (!showIcon || iconList.length < 1) {
        return
      }

      return (iconList.map((ele, index) => {
        const {slotType, iconName, originIcon, customName, largeIcon, customIcon} = ele
        // slotType 的值prefix 或者suffix
        return (<Icon
          slot={slotType}
          class={ {'i-cus-large': largeIcon}}
          type={originIcon ? originIcon[this.inputType[key]] : iconName}
          custom={customIcon ? customIcon[this.inputType[key]] : customName}
          key={index}
          on-click={() => {
            this.inputType[key] =
        this.inputType[key] === 'password' ? 'text' : 'password'
          }}/>)
      }))
    },
    selectRender (item, createElement, self) {
      const {disabled, placeholder, clear, size, key, multiple, store, filterable} = item
      return (<Select
        v-model={self.formList[key]}
        disabled={self.globalDisabled || store ? !self.formList[item.store] : disabled}
        placeholder={self.$t(placeholder)}
        size={size || 'default'}
        clear={clear}
        multiple={multiple}
        filterable={filterable}
        label-in-value={false}
        class='row-form-item radius_border'
        on-on-change={(val) => self.$emit('change-select', key, val, item)}
        on-on-clear={() => self.$emit('select-clear', item.key, null, item)}
        on-on-query-change={(val) => self.$emit('select-filter', item.key, val, item)}
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
    },
    dateRender (item, createElement, self) {
      const {disabled, placeholder, clear, size, key, dateType, store, dateFormat, options, otherOptions, multiple, setDisabled} = item
      return (<DatePicker
        v-model={self.formList[key]}
        size={ size || 'default'}
        disabled={self.globalDisabled || (store ? !self.formList[store] : disabled) || (setDisabled && self.formList[key] >= new Date(setDisabled))}
        clearable={clear}
        placeholder={self.$t(placeholder)}
        editable={false}
        multiple={multiple}
        type={dateType || 'date'}
        format={ dateFormat || self.dateFormat}
        options={ options ? self.dateOptions(key, options, otherOptions) : self.defaultDateOptions(item)}
        class='row-form-item radius_border'
        on-on-change={(val) => {
          if (dateType == 'datetimerange') {
            return
          }
          self.$emit('change-select', key, val, item, 'date')
        }}
      ></DatePicker>)
    },
    radioGroupRender (item, createElement, self) {
      const {disabled, size, key} = item
      return (<RadioGroup
        v-model={self.formList[key]}
        size={size || 'default'}
        disabled={self.globalDisabled || disabled}
        class='row-form-item radius_border'
        on-on-change={(val) => self.$emit('radio-group-change', val, key, item)}
      >
        {self.selectOptions[key] ? self.radioCheckboxRender(Radio, self.selectOptions[key], item, createElement, self) : ''}
      </RadioGroup>)
    },
    radioCheckboxRender (tag, list, item, createElement, self) {
      const {disabled, val, label, radioDiv} = item
      const options = this.objTransferToArr(list)
      return options.map((ele) => {
        return createElement(tag, {
          props: {
            disabled: self.globalDisabled || disabled,
            label: val ? ele[val] : ele.code
          },
          class: {
            'radius_border': true,
            'radioCard': radioDiv
          }
        }, [radioDiv ? self.cardRadio(ele, item) : (label ? self.$t(ele[label]) : self.$t(ele.name))])
      })
    },
    cardRadio (itemValue, item) {
      const {radioCard} = item
      return (<div >
        {radioCard.map(ele => {
          return (<p>{this.$t(ele.key)}:{itemValue[ele.val]}</p>)
        })}

      </div>)
    },
    checkboxGroupRender (item, createElement, self) {
      const {key} = item
      return (<CheckboxGroup
        v-model={self.formList[key]}
        class='row-form-item radius_border'
        on-on-change={(val) => self.$emit('checkbox-change-handle', val, key)}
      >
        {self.selectOptions[key] ? self.radioCheckboxRender(Checkbox, self.selectOptions[key], item, createElement, self) : ''}
      </CheckboxGroup>)
    },
    checkboxRender (item, createElement, self) {
      const {key, disabled, field} = item
      return (<Checkbox
        v-model={self.formList[key]}
        disabled={self.globalDisabled || disabled}
        class='row-form-item radius_border'
        on-on-change={(val) => self.$emit('checkbox-change-handle', val, key)}
      >{ self.$t(field || key)}</Checkbox>)
    },
    uploadRender (item, createElement, self) {
      const {key, format, accept, multiple, url, disabled, maxSize} = item
      return (<Upload
        show-upload-list={false}
        format={format}
        accept={accept}
        multiple={multiple}
        action={url}
        disabled={self.globalDisabled || disabled}
        max-size={maxSize}
        class=" upload-field"
        before-upload={(file) => {
          self.$emit('before-upload-handle', file, key, item)
        }}

      >
        <Button
          type="default"
          custom-icon="iconfont iconxuanze"
          on-click={() => this.$emit(key, item)}
          class="padding_btn cus_gray_btn"
          name="upload_btn"
        >{self.$t('selectFile')}</Button>
        {self.fileTagRender(self.defaultFileList, item)}
      </Upload>)
    },
    fileTagRender (fileList, item) {
      if (!fileList) {
        return
      }
      const {fileclear} = item
      return (<div class="tag-style">
        {fileList.map((file, i) => {
          return (<Tag key={i}
            color="success"
            closable={fileclear}
            on-on-close={() => this.$emit('handle-close-tag', i)}
          >
            <span
              on-click={() => { this.$emit('view-file', file, item.download) }}
            >{file.fileName ? file.fileName : file}</span>
          </Tag>)
        })}
      </div>)
    },
    textRender (item, createElement, self) {
      const {filter, key} = item
      let text = filter
        ? self.selectOptions[key]
          ? self.selectOptions[key][self.formList[key]]
          : self.formList[key] : self.selectOptions[key]
          ? self.selectOptions[key] : self.formList[key]
      return createElement('div', {class: 'row-form-item'}, text)
    },
    lineRender (item, createElement) {
      return createElement('div', {class: 'row-form-item'}, item.line)
    },
    colButtonRender (item, createElement, self) {
      const {btnText, disabled, btnType, customBtnIcon, className, key, store, storeVal} = item
      const buttonText = isObject(btnText) ? btnText[self.btnIndex] : btnText
      return createElement('Button', {
        props: {
          disabled: store ? (storeVal ? self.checkBtnDisabled(item) : self.formList[store]) : self.globalDisabled || disabled,
          type: btnType || 'primary',
          customIcon: customBtnIcon
        },
        class: ['padding_btn', 'form-col-btn', className],
        on: {
          click: () => {
            if (isObject(btnText)) {
              self.btnIndex = self.btnIndex == 0 ? 1 : 0
            }
            self.$emit('form-btn', self.formList[key], key, item, self.btnIndex)
          }
        }

      }, self.$t(buttonText))
    },
    checkModify (key) {
      const agentAddressKey = {
        contactAddress1: 'address1',
        contactAddress2: 'address2',
        contactAddress3: 'address3',
        contactAddress4: 'address4',
        contactAddress5: 'address5'
      }
      if (
        this.$store.state.approvalOperationType.includes('AGENT_UPDATE') ||
        this.isContrast
      ) {
        const keys = [
          'locationCode',
          'addressAbbr',
          'address1',
          'address2',
          'address3',
          'address4',
          'address5'
        ]
        if (keys.includes(key)) {
          if (
            this.modifiedProperty.includes('addressId') ||
            this.modifiedProperty.includes('agencyAddressId')
          ) {
            return true
          }

          return false
        } else {
          if (key in agentAddressKey) {
            return this.modifiedProperty.includes(agentAddressKey[key])
          }

          return this.modifiedProperty.includes(key)
        }
      }
      if (this.modifiedProperty.length < 1) {
        return false
      }
      const agency = {
        agencyMasterName: 'agencyMaster'
      }
      if (agency[key]) {
        return this.modifiedProperty.includes(agency[key])
      }
      return this.modifiedProperty.includes(key)
    },
    checkBtnDisabled (item) {
      if (typeof item.store === 'string') {
        return this.formList[item.store] == item.storeVal
      } else if (isArray(item.store)) {
        let filterRes = item.store.filter(ele => {
          if (
            typeof item.storeVal[ele] === 'string' ||
            typeof item.storeVal[ele] === 'number'
          ) {
            return this.formList[ele] == item.storeVal[ele]
          } else {
            return !!this.formList[ele] == item.storeVal[ele]
          }
        })

        let flag =
          filterRes.length == 1 && filterRes.includes(item.include)
            ? true
            : !filterRes.includes(item.include) &&
              !filterRes.includes(item.needInclude)
              ? true
              : filterRes.length > 1 && !filterRes.includes(item.exclude)
                ? false
                : filterRes.length == item.store.length
        return flag
      }
    }

  }
}

</script>