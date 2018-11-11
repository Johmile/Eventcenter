import axios from 'axios'

//allcenters
export async function getAllCenters() {
    try {
       const centers = await axios.get('http://localhost:1000/centers/get')
       return centers.data
        
    } catch (error) {
        return error.message
    }
    
}

//single center
export async function getSingleCenter(id) {
    try {
        const center = await axios.get(`http://localhost:1000/centers/get/${id}`)
        return center.data
    } catch (error) {
        return error.message
    }
}

//single user
export async function getSingleUser(id) {
    try {
        const token = await window.localStorage.getItem('token')
        const user = await axios.get(`http://localhost:1000/user/get/${id}`, token)
        return user.data
    } catch (error) {
        return error.message
    }
}

//upload image
export async function uploadImage(id){
    try {
        const image = axios.put(`http://localhost:1000/centerimage/${id}`)
        console.log(image.data)
        return image.data
    } catch (error) {
        return error.message
    }
}

//update center status
export async function updateCenter(id){
    try {
        var details;
        const {available} = details
        const update = await axios.put(`http://localhost:1000/available/${id}`, {available})
        return update.data
    } catch (error) {
        return error.message
    }
}