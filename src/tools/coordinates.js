//获取城市坐标键值对
import map from './json/coordinates.json'
var  mapObj={};
var coordinateObj=function (mapArr){
  for(let i=0;i < mapArr.length;i++){
    mapObj[mapArr[i].name]=[mapArr[i].log,mapArr[i].lat];
    if(mapArr[i].children){
        coordinateObj(mapArr[i].children);
    }
  }
  return mapObj;
}
export default coordinateObj(map);