
import axios from "axios"


export const getSingleProducts = async (productId)=> {
    const response = await axios.get(`http://localhost:8000/shop/api/${productId}`)
    return response.data
}