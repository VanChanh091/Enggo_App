import axiosClient from "./axiosClient"

class NEWSAPI {
    HandleNewsRepository = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete' | 'patch',
    ) => {
        return await axiosClient(`/api${url}`, {
            method: method ?? 'get',
            data
        });
    }
}

const newsRepository = new NEWSAPI();

export default newsRepository;