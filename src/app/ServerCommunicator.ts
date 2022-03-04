import axios from 'axios';
import { AppConfig } from '../interfaces';
import { getCookieValue } from '../helpers/getCookie';

// This class will handle requests to server
export class ServerCommunicatorClass {
  appConfig: AppConfig;
  token: string | null;
  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig;
    this.token = getCookieValue('token');
  }

  login(username: string, password: string) {
    return axios({
      method: 'post',
      data: {
        'username': username,
        'password': password
      },
      url: `${this.appConfig.base}${this.appConfig.login}`,
    });
  }

  register(username: string, password: string, passwordConfirm: string) {
    return axios({
      method: 'post',
      data: {
        'username': username,
        'password': password,
        'passwordConfirm': passwordConfirm
      },
      url: `${this.appConfig.base}${this.appConfig.register}`,
    });
  }

  get(target: 'category' | 'status' | 'todo', id: number) {
    return axios({
      method: 'get',
      headers: { 'Authorization': `Bearer ${this.token}` },
      url: `${this.appConfig.base}${this.appConfig[target]}/${id}`,
    });
  }

  getList(target: 'category' | 'status' | 'todo', categoryID: number | null = null) {
    if (categoryID) {
      return axios({
        method: 'get',
        params: { categoryId: categoryID },
        headers: { 'Authorization': `Bearer ${this.token}` },
        url: `${this.appConfig.base}${this.appConfig[target]}`,
      });
    }
    else {
      return axios({
        method: 'get',
        headers: { 'Authorization': `Bearer ${this.token}` },
        url: `${this.appConfig.base}${this.appConfig[target]}`,
      })
    }
  }

  delete(target: 'category' | 'status' | 'todo', id: number) {
    return axios({
      method: 'delete',
      headers: { 'Authorization': `Bearer ${this.token}` },
      url: `${this.appConfig.base}${this.appConfig[target]}/${id}`,
    });
  }

  update(target: 'category' | 'status' | 'todo', id: number, value: object) {
    return axios({
      method: 'put',
      headers: { 'Authorization': `Bearer ${this.token}` },
      data: value,
      url: `${this.appConfig.base}${this.appConfig[target]}/${id}`,
    });
  }

  create(target: 'category' | 'status' | 'todo', value: object) {
    return axios({
      method: 'post',
      headers: { 'Authorization': `Bearer ${this.token}` },
      data: value,
      url: `${this.appConfig.base}${this.appConfig[target]}`,
    });
  }
}