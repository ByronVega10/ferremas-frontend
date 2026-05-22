import api from '@/lib/axios'; 

export const getDollarValue = async () => { 
    
    const response = await api.get('/exchange/usd'); 
        return response.data; 
}; 
    

export const getEuroValue = async () => { 
    
    const response = await api.get('/exchange/euro'); 
        return response.data; 
};