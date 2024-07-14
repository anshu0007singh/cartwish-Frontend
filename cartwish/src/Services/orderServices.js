import apiClient from "../Utils/api-client";

export function CheckoutAPI(){
    return apiClient.post("/order/checkout")
}