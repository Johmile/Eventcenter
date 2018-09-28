import axios from 'axios'

export async function getAllCenters() {
    try {
       const centers = await axios.get('http://localhost:1000/centers/get') 
       console.log(centers.data)
       return centers.data
        
    } catch (error) {
        return error.message
    }
    
}

export async function getSingleCenter(id) {
    try {
        const center = await axios.get(`http://localhost:1000/centers/get/${id}`)
        return center.data
    } catch (error) {
        return error.message
    }
}