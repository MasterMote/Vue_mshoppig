import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    //1.创建一个组件构造器
    const toastConstruct = Vue.extend(Toast)
    //2.以new的方式，创建组件构造器实例
    const toast = new toastConstruct()
    //3.将组件的实例对象挂载到一个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el就是这个对象
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = Toast
}

export default obj