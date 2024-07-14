import apiClient from "../Utils/api-client";

export function getSuggestionAPI(search){
    return apiClient.get(`/products/suggestions?search=${search}`)
}