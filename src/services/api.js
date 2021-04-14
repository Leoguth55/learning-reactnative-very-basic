import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.149:3333',
});

export default api;

/**
 * iOS com emulador: localhost
 * iOS com dispositivo físico: ip da máquina
 * Android com emulador: adb reverse tcp:.... tcp:.....
 * Android com emulador (Android Studio): 10.0.2.2
 *
 *
 */
