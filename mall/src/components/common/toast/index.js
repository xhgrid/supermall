import Toast from './Toast'

const toastPlugin = {}

toastPlugin.install = function (Vue, options) {
  // console.log('执行了toastPlugin的install函数', vue)
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，创建出来一个组件对象
  const toast = new ToastConstructor()

  // 3.将组件对象手动挂载到某一个元素上--此处新建一个元素然后挂载
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  // console.log(toast.$el)

  // 5.将组件对象挂载到vue实例上
  Vue.prototype.$toast = toast
}

export default toastPlugin
