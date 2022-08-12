import axios from 'axios';
const url = "https://98f3b3dd-a873-45a9-9203-f3d666e80ae1.mock.pstmn.io//api/v1/devices" //simple mock server in postman for testing 
class DeviceService{
    static getDevices(){
        return new Promise ((resolve,reject) =>{
            axios.get(url)
            .then((res) =>{
               resolve(res.data)
            })
            .catch((err)=> {
                reject(err)
            })
        })
    }
    static getSmartDeviceDetails(id){
        return new Promise ((resolve,reject) =>{
            axios.get(url+'/'+id)
            .then((res) =>{
               resolve(res.data)
            })
            .catch((err)=> {
                reject(err)
            })
        })
    }



}
export default DeviceService