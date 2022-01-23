import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

export interface MapStyle {
  [key: string]: Style | Style[];
}

export const mapStyles: MapStyle = {
  default: [
    new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(61, 235, 245, 0.5)',
      }),
    }),
    new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: '#3399CC',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    }),
  ],
  edit: [
    new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1,
      }),
      fill: new Fill({
        color: 'black',
      }),
    }),
    new Style({
      image: new CircleStyle({
        radius: 2,
        fill: new Fill({
          color: 'black',
        }),
        stroke: new Stroke({
          color: 'yellow',
          width: 2,
        }),
      }),
    }),
  ],
  selection: [
    new Style({
      stroke: new Stroke({
        color: 'orange',
        width: 5,
      }),
      fill: new Fill({
        color: 'rgba(61, 183, 244, 0.843)',
      }),
    }),
    new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    }),
  ],
  projectArea: new Style({
    stroke: new Stroke({
      color: 'red',
      width: 3,
      lineDash: [4, 8]
    })
  }),
  addressInfo: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 1,
      }),
    }),
  })

};
