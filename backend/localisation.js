const axios = require('axios');
const geoip = require('geoip-lite');
var ip = require('ip');


const loc = async () => {
    try{
        const geo = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAJ3-w6zB_0iTOXj08zoDZ6Lxj7d7ujnGw`);
        return(geo.data.location);
    }
    catch (err){
        const adresse = ip.address();
        const geo = geoip.lookup("207.97.227.239");
        ret = {lat: geo.ll[0], lng: geo.ll[1]};
        return (ret)
    }
}

module.exports = {loc}