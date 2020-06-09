<template>
    <!--    <div id="login_container">-->
    <!--        &lt;!&ndash;头像区域&ndash;&gt;-->
    <!--        <div class="login_box">-->
    <!--            &lt;!&ndash;            <div class="avatar_box"><img src="../../../public/favicon.ico" alt=""></div>&ndash;&gt;-->
    <!--            &lt;!&ndash;           <div class="avatar_box"><img src="favicon.ico" alt=""></div>&ndash;&gt;-->
    <!--            <div class="avatar_box"><img src="../../assets/img/qqtupian.jpg" alt=""></div>-->
    <!--            &lt;!&ndash;登录表单&ndash;&gt;-->
    <!--            &lt;!&ndash;用户名&ndash;&gt;-->
    <!--            &lt;!&ndash;            :model数据传输&ndash;&gt;-->
    <!--            &lt;!&ndash;            ref="loginFormRef"名字随意取引用后，this指向&ndash;&gt;-->
    <!--            <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">-->
    <!--                <el-form-item prop="userName">-->
    <!--                    &lt;!&ndash;                 是v-model否则输入框输入不了东西 -双向绑定  &ndash;&gt;-->
    <!--                    &lt;!&ndash;                    <el-input prefix-icon="el-icon-s-custom" :model="loginForm.username"></el-input>&ndash;&gt;-->
    <!--                    <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>-->
    <!--                </el-form-item>-->
    <!--                &lt;!&ndash;密码&ndash;&gt;-->
    <!--                <el-form-item prop="passWord">-->
    <!--                    &lt;!&ndash;                    show-password隐藏关闭密码&ndash;&gt;-->
    <!--                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>-->
    <!--                </el-form-item>-->
    <!--                &lt;!&ndash;按钮&ndash;&gt;-->
    <!--                <el-form-item class="btns">-->
    <!--                    <el-button type="primary" @click="login">登录</el-button>-->
    <!--                    <el-button type="info" @click="resetLoginForm">重置</el-button>-->
    <!--                </el-form-item>-->
    <!--            </el-form>-->
    <!--        </div>-->
    <!--    </div>-->
    <div id="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../../assets/img/qqtupian.jpg" alt="avatar" />
            </div>
            <!-- 登录表单 -->
            <div>
                <el-form
                        ref="loginFormRef"
                        :model="loginForm"
                        :rules="loginFormRules"
                        label-width="60px"
                        class="login_form"
                >
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                                v-model="loginForm.password"
                                type="password"
                                prefix-icon="el-icon-lock"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="info" @click="resetLoginForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456',
                },
                loginFormRules: {
                    username: [
                        //trigger当鼠标离开input触发
                        {required: true, message: '请输入登录名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            resetLoginForm() {
                //this指向from表单实例，也就是说指向表单里面的东西
                // console.log(this);  
                //   resetFields：el里面的方法
                this.$refs.loginFormRef.resetFields();
            },
            login() {
                //validate(fun()):validate里面的回调第一个参数是验证表单是否正确
                this.$refs.loginFormRef.validate(async boolean => {
                    // console.log(boolean);
                    if (!boolean) return;
                    //结构表单的data对象
                    //解构
                    const {data:res} = await this.$http.post('login', this.loginForm);
                    //console.log(res);
                    if (res.meta.status!==200) return this.$message.error('登陆失败');
                    this.$message.success('登陆成功');
                    // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                    window.sessionStorage.setItem('token', res.data.token)
                    //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                    //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                    //跳转
                    this.$router.push('/home')
                })
            }
        }
    }

</script>

<style  scoped>
    #login_container {
        background-color: #2b4b6b;
        height: 100%;
    }

    #login_container > .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        /*//居中*/
        transform: translate(-50%, -50%);

    }

    #login_container > .login_box .avatar_box {
        height: 130px;
        width: 130px;
        border-radius: 50%;
        /*padding: 10px;*/
        /*border: 1px solid #eee;*/
        /*box-shadow: 0 0 10px #ddd;*/
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #login_container > .login_box .avatar_box img {
        width: 100%;
        height: 100%;
        border-radius: 50%;

    }

    #login_container > .login_box .btns {
        /*//弹性盒子靠右*/
        display: flex;
        justify-content: flex-end;
    }

    #login_container > .login_box .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        /*//怪异盒模型*/
        padding: 0 20PX;
        box-sizing: border-box;
    }
</style>