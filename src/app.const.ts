export const AppConst = Object.freeze({
  SOURCE: 'ttk',
  TIMEZONE: 'America/Mazatlan',
  DATE_TIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
});

export const GeoFenceMap = new Map<string, string>();
GeoFenceMap.set('155', '1');
GeoFenceMap.set('156', '2');
GeoFenceMap.set('157', '3');
GeoFenceMap.set('158', '4');
GeoFenceMap.set('159', '5');
GeoFenceMap.set('61', '6');
GeoFenceMap.set('62', '7');
GeoFenceMap.set('63', '8');
GeoFenceMap.set('64', '9');
GeoFenceMap.set('65', '10');
GeoFenceMap.set('70', '11');
GeoFenceMap.set('88', '12');
GeoFenceMap.set('91', '13');
GeoFenceMap.set('92', '14');
GeoFenceMap.set('93', '15');
GeoFenceMap.set('94', '16');
GeoFenceMap.set('95', '17');
GeoFenceMap.set('96', '18');
GeoFenceMap.set('97', '19');
GeoFenceMap.set('98', '20');
GeoFenceMap.set('99', '21');
GeoFenceMap.set('153', '22');
GeoFenceMap.set('154', '23');
GeoFenceMap.set('190', '24');
GeoFenceMap.set('191', '25');

export enum GEOFENCE_ACTION {
  LEFT_ZONE = '0',
  ENTER_ZONE = '1',
  OVER_SPEED_START = '2',
}
