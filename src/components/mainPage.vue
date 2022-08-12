<template>
  <div class="container-fluid ">
    <div class="row">
           <div @click=showModal(device.id) class="card" v-for="device in Devices" :key="device.id">
            <Card :device="device"/>
           </div>  
            
    </div>
    <ModalWindow ref="modal"></ModalWindow>

    </div>
</template>

<script>
import DeviceService from '../DeviceService'
import Card from './deviceCard.vue'
import ModalWindow from './modalWindow.vue'
export default {
components:{
    Card,
    ModalWindow
},
data(){
    return{
        Devices:[],
        connection:null
    }
},
methods:{
async GetDevices(){
      await DeviceService.getDevices().then((res)=>{
        this.Devices=res;
      })
      .catch((err)=>{
        console.log(err)
      })
},
showModal(id){
    this.$refs.modal.id=id
    this.$refs.modal.show=true
},
},
 created(){
    this.GetDevices()
    this.connection=new WebSocket("wss://ws.postman-echo.com/raw")// here we are  creating connection to websocket end-point /api/v1/refresh
    this.connection.onmessage=(event)=>{
        this.Devices=event.data//data is updated every time the server sends
    }
}
}

</script>

<style>
.container-fluid{
width:100%;
background-color:#F3F7FB;
padding-top:4%;
padding-right:3%;;
padding-left:9%;
z-index: 1;
}
.row{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
}
.card{
    margin-right: 26px;
    margin-bottom: 20px;
    transition: transform .2s;
    cursor: pointer;
}
.card:hover{
    box-shadow: 5px 5px 5px #757575;
    transform: scale(1.1);
}

</style>