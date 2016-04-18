import aggregate from 'geojson-polygon-aggregate';

export default function(self) {

  self.addEventListener('message', function(ev) {
    const data = ev.data[0];
    const layers = ev.data[1];
    self.makeRequest(data, layers);
  });

  self.makeRequest = function(data, layers) {
    const aggregation = {
        weightSum: aggregate.sum('weight'),
    };
    let results = aggregate(
        data['Hexclip'], layers, aggregation);
    self.postMessage(['Done', results]);

  };
};