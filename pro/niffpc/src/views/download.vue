<template>
    <el-progress :percentage="percentage" color=""></el-progress>
</template>
<script>
let that
export default {
    setup() {
        
    },
    data(){
        return {
            percentage:20
        }
    },
    created(){
        that=this
        that.$ipc.send('test_read_file','test.json')
        that.$ipc.on('data_download_status',(eve,...args)=>{
            console.log('来自主',args);
        })
    }
}
</script>