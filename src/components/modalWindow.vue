<template>
 <div  class="draggable">
 <div v-show="show" class="Modal">
  <img id="close" src="../assets/cross.svg"   @click="closeModal()" >
    <img id="deviceIMG" :src=GetImage> 
    <div class="text">  
      <h4 id="name">{{device.name}}</h4>
      <p class="T1"><span class="T2">id: </span>{{device.id}}</p>
      <p class="T1"><span class="T2">connection: </span>{{device.connectionState}}</p>
      <p v-if="Object.keys(this.device).includes('isTurnedOn')" class="T1">
      <span v-if="device.isTurnedOn" style="color:green">turned on</span>
      <span v-if="!device.isTurnedOn" style="color:red">turned off</span>
      </p>
      <p v-if="Object.keys(this.device).includes('brightness')" class="T1">
      <span class="T2">brightness: </span>
      {{device.brightness}} %
      </p>
      <div style="display:flex;flex-direction: row;" v-if="Object.keys(this.device).includes('color')">
      <p  class="T1"><span class="T2">color:</span></p>
      <div id="ColorExample" :style=takeColor></div>
      </div>
      <p v-if="Object.keys(this.device).includes('powerConsumption')" class="T1">
      <span class="T2">power consumption: </span>
      {{device.powerConsumption}} W 
      </p>
      <p v-if="Object.keys(this.device).includes('temperature')" class="T1">
      <span class="T2">temperature: </span>
      {{device.temperature}} &#8451;
      </p>
    </div>
  </div>

 </div>
</template>

<script>
import DeviceService from '../DeviceService'
import interact from 'interactjs'

//dragging
const position = { x: 0, y: 0 }
interact('.Modal').draggable({
  cursorChecker () {
      // don't set a cursor for drag actions
      return null
    },
  listeners: {
    move (event) {
      position.x += event.dx
      position.y += event.dy

      event.target.style.transform =
        `translate(${position.x}px, ${position.y}px)`
    },
  }
})
.resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset
        
        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })
        Object.assign(event.target.dataset, { x, y })
        
      }
    },
     modifiers: [
    interact.modifiers.restrictSize({
      min: { width: 240, height: 100 }
    })
  ]
  })
export default {
    data(){
        return{
            device:Object,
            show:false,
            id:"",
        }
    },
    methods:{
        closeModal(){
            this.show=false
        },
        getDevice(id){
        DeviceService.getSmartDeviceDetails(id)
        .then((res)=>{
          this.device=res
          })
        },     
    },
    mounted: function() {
          console.log(document.getElementById("text"))
        },
  computed:{
  GetImage(){
  let IMG=Object.assign({},this.device).type
    if(IMG=="bulb"){
      return require("../assets/bulb.svg")
    }
    if(IMG=="outlet"){
      return require("../assets/outlet.svg")
    }
    if(IMG=="temperatureSensor"){
      return require("../assets/sensor.svg")
    }
    else{
      return ""
    }
  },
  takeColor(){
    console.log(this.device.color)
    return {
            backgroundColor:this.device.color
            }
  }
},
created() {
    this.getDevice(this.id)
    },
watch:{
  id(newId){
    DeviceService.getSmartDeviceDetails(newId).then((res)=>{
      this.device=res;
    }
    )
  }
}
}
</script>

<style>
.Modal{
  display: flex;
  flex-direction: row;
    z-index: 3;
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    width: 33em;
    height: 21em;
    position: absolute;
     top: 50%;
      left: 50%;
      border: 1px solid black;
}
#close{
cursor:pointer;
position: absolute;
left:91%;
padding: 2px;

}
#deviceIMG{
  padding-top:1.5em;
  padding-right: 0%;
  width: 50%;
  height: auto;
  block-size: auto;
}
.text{
  font-size: 1em;
  flex-direction: column;
  margin-top:10%;
  margin-bottom: auto;
  margin-left: 0px;
  height: 100%;
}
.T1{
  padding: 0%;
  margin: 0%;
}
.T2{
  color: #757575;
}
#ColorExample{
height: 15px;
width: 15px;
border:1px solid black;
 border-radius:20px;
 margin-top:auto;
 margin-bottom:auto;
 margin-left: 0.3em;
}

</style>