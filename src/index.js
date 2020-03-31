import Forms from './components/from/Forms'

let IviewForm = {}
IviewForm.install = function (Vue) {
    Vue.prototype.$alert = function (text) {
        console.log(text)
        alert(text)
    }
    Vue.component('vForms', Forms)
}

export default IviewForm;