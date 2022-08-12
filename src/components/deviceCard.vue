<template>
  <div class="deviceStyle">
  <img class="device"
  :src=GetImage alt="device">
 
  <img :src=getConnect class="stan">
  <hr> 
  <p class="name">{{this.device.name}}</p>
  <p class="type">{{getType}}</p>
   </div>
</template>

<script>


export default {
props:{
  device:Object
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
  getType(){
    let type=Object.assign({},this.device).type
    switch(type){
      case "bulb":
        return "Bulb"
      case "outlet":
        return "Outlet"
      case "temperatureSensor":
        return "Temperature Sensor"
      default:
        return ""
    }
  },
  getConnect(){
    let connection=Object.assign({},this.device).connectionState
    switch(connection){
      case "poorConnection":
        return require("../assets/wifi.png")
      case "disconnected":
        return require("../assets/no-wifi.png")
      case "connected":
        return require("../assets/full-signal.png")
      default:
        return ""
    }
  }
},
created(){
  
}
}
</script>

<style>
.deviceStyle{
  width: 11rem;
  height: 16rem;
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  margin-top:7%;
  }
.device{
  position: absolute;
  right: 25px;
}
.stan{
  position: absolute;
  left: 72%;
  width: 1.8em;
  height: 1.8em;

}
hr{
  margin-top:159px;
  margin-bottom: 0%;
  border-top:1px solid black
}
p{
   font-family: Arial, Helvetica, sans-serif;
   padding-left:8%;
}
p.name{
  font-size: 1.3em;
  padding-top:2%;
  margin-bottom: 0px;
 
}
p.type{
  color: #757575;
}
</style>