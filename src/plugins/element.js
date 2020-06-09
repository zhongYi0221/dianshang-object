import Vue from 'vue'
import {Button, Form, FormItem, Input, Message} from 'element-ui'
//import {Input} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'


// Vue.use(Button,Form,FormItem,Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;
