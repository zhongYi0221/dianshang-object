<template>
    <div>
        <el-container>
            <!-- 头部-->
            <el-header>
                <div>
                    <img src="../../assets/Ggooglelogo.png" alt="">
                    <span>电商管理系统</span>
                </div>
                <el-button type="info" @click="loginOut">退出</el-button>
            </el-header>


            <!-- 页面主体-->
            <el-container>
                <!--侧边-->
                <!--                :width="iscollapse:根据展开宽度预留宽度-->
                <el-aside :width="iscollapse? '64px':'200px'">
                    <div class="toggle-button" @click="toggleCollapse">展开/收起</div>
                    <!--侧边菜单-->
                    <el-menu
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#409EFF"
                            unique-opened
                            :collapse="iscollapse"
                            :collapse-transition="false"
                            router
                    >
                        <!--  default-active="this.$route.path"-->
                        <!-- unique-opened只展开一个子菜单-->
                        <!-- router：开启路由模式，当index不同时候跳转到该index页面 router默认为:router="ture" 可以手动在index添加上地址-->
                        <!-- default-active：路由的高亮显示，不过现在版本自带高亮显示-->

                        <!-- 一级菜单-->
                        <!--                        由于""里面只接收字符串再+''就可以接收量了-->
                        <el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">
                            <template slot="title">
                                <!-- 图标-->
                                <i :class="iconObj[item.id]"></i>
                                <span>{{item.authName}}</span>
                            </template>
                            <!-- 二级-->
                            <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>{{subItem.authName}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!-- 内容主体 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                menulist: [],
                iconObj: {
                    '125': 'iconfont icon-yonghu1',
                    '103': 'iconfont icon-gongnengjiaosequanxianguanli',
                    '101': 'iconfont icon-shangpinguanli',
                    '102': 'iconfont icon-dingdanguanli-active',
                    '145': 'iconfont icon-baobiao'
                },
                iscollapse: false
            }
        },
        created() {
            this.getMenuList();
        },
        methods: {
            loginOut() {
                //退出:清空tonken
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            //获取菜单列表
            async getMenuList() {
                const {data: res} = await this.$http.get('menus');
                //返回报错
                if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
                this.menulist = res.data;
                // console.log(res)
            },
            //点击按钮切换菜单展开与收起
            toggleCollapse() {
                this.iscollapse = !this.iscollapse;
            }
        },
    }
</script>

<style scoped lang="less">
    .el-container {
        //在外面有div时候100%撑不满用vh代替
        height: 100vh;
    }

    .el-header {
        background-color: #373f41;
        display: flex;
        //左右贴标对齐
        justify-content: space-between;
        padding-left: 0;
        //header内容不上下贴标
        align-items: center;
        color: #fff;
        font-size: 20px;

        > div {
            //文字居中
            display: flex;
            align-items: center;
        }

        span {
            margin-left: 8px;
        }
    }

    .el-container .el-header div img {
        width: 25%;
        height: 25%;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-main {
        background-color: #eaedf1;
    }

    .el-menu {
        border-right: solid 1px #e6e6e6;
    }

    .iconfont {
        margin-right: 10px;
    }

    .el-menu {
        border-right: none;
    }

    .toggle-button {
        background-color: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>