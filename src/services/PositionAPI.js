import axios from "axios";

export default function test()
{
    axios.get('http://cukcuk.manhnv.net/v1/Positions').then(res => {
        console.log(res.data);
    }).catch(res => {
        console.log(res);
    })
}