import { create } from 'axios';

const instance = create();
instance.defaults.baseURL = "https://itunes.apple.com/";
export default instance;