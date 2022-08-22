<script>
export default {
    methods:{
        async login(){
            const res = await this.$http('app/login',{
                // 入参
            })

            if(res.success){
                // res
            }
        },
        test(){
            this.$store.commit('app/setmessage',1)  //存储值

            // this.message 使用
        }
    },
    computed:{
        message(){
            return this.$store.getters['app/getMessage'] //获取最新的值
        }
    }
}
</script>
