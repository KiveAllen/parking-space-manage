import axios from "axios";

const key = "6dd7ffbdd93585c922dacab10a5c43f3";

// 创建 Axios 示例
const mapAxios = axios.create({
    // 请求地址
    baseURL: "https://restapi.amap.com/v3",
    // 请求超时
    timeout: 10000,
});

export async function getLocation(address: string) {
    const res = await mapAxios(`/geocode/geo?address=${address}&output=JSON&key=${key}`);
    return {
        latitude: res.data.geocodes[0].location.split(",")[1],
        longitude: res.data.geocodes[0].location.split(",")[0],
    };
}
