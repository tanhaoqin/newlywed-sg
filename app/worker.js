import aggregate from 'geojson-polygon-aggregate';

export default function(self) {

  self.addEventListener('message', function(ev) {
    const features = ev.data[0];
    const weights = ev.data[1];
    // console.log(features);
    // console.log(weights);
    self.evaluateSum(features, weights);
  });

  self.evaluateSum = function(features, weights) {
    let max = 0;
    for (let feature of features){
      let properties = feature.properties;
      let weightSum = 0;
      Object.keys(properties).forEach(function(key){
        if (Object.keys(weights).indexOf(key) != -1) {
          weightSum += Number(properties[key])*Number(weights[key]);          
        } else {
          console.log(key, Number(properties[key]));
          weightSum += Number(properties[key]);
        }
        // console.log(key + ' ' + Number(properties[key]) + ' ' + Number(weights[key]));
      });
      feature.properties.weightSum = weightSum;
      if (weightSum > max){
        max = weightSum;
      }
    };
    // console.log(features);
    self.postMessage(['Done', features, max]);
  };

};