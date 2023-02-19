import './js/navigation.js';
import LocalStorage from './js/api/local-storage-api';
import * as FakeAPI from './js/api/fake-api';

const localStorage = new LocalStorage('team-9-project');

console.dir(FakeAPI.getPopularNews());
