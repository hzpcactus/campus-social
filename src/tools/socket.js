import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
var a
var wesocket = {
    debug: true,
    connection: '',
}

function getSocket(t) {
    var socketIp = 'http://localhost';//socket地址
    wesocket.connection = socketIp;
    if (localStorage.getItem('Token') || t) {//判断是否有token
        let tk = localStorage.getItem('Token') ? localStorage.getItem('Token') : t;
        wesocket.connection = socketIp + '?usekey=' + tk;
    }
    if (wesocket.connection != '') {
        Vue.use(new VueSocketIO(wesocket))
    }
}
getSocket()
Vue.prototype.$getSocket = getSocket;
//监听localStorage，判断是否有token
window.addEventListener('setItemEvent', function(e) {
    if (e.key == 'Token' && e.newValue) {
        let token = e.newValue
        getSocket(token)
    }
})
export default a