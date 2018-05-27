/**
 * Created by zuohx on 2017年03月01日11:51:48.
 * 缓存对象操作类
 */
import _ from 'lodash'

export default {
  resourceObj: {
    setItem (resource, key, value) {
      if (_.isObject(value)) {
        value = JSON.stringify(value)
      } else if (_.isString(value) || _.isNumber(value)) {
        value = value.toString()
      }
      if (!_.isString(key)) {
        console.error('the key of the resourceSvc only allow string!');
        return false
      }
      if (!_.isString(value)) {
        console.error('the value of the resourceSvc only allow string or object!');
        return false
      }
      if (window[resource]) {
        window[resource].setItem(key, value)
      }
    },
    getItem (resource, key, defaultValue) {
      if (!_.isString(key)) {
        console.error('the key of the resourceSvc only allow string!');
        return false
      }

      if (window[resource]) {
        return window[resource].getItem(key) || defaultValue || ''
      } else {
        console.warn('the platform don\'t support ' + resource + '!');
        return defaultValue
      }
    },
    removeItem (resource, key) {
      if (!_.isString(key)) {
        console.error('the key of the resourceSvc only allow string!');
        return false
      }

      if (window[resource]) {
        window[resource].removeItem(key)
      }
    },
    clear (resource) {
      if (window[resource]) {
        window[resource].clear()
      }
    }
  },
  setLocal (key, value) {
    this.resourceObj.setItem('localStorage', key, value)
  },
  getLocal (key, defaultValue) {
    return this.resourceObj.getItem('localStorage', key, defaultValue)
  },
  removeLocal (key) {
    this.resourceObj.removeItem('localStorage', key)
  },
  clearLocal () {
    this.resourceObj.clear('localStorage')
  },
  setSession (key, value) {
    this.resourceObj.setItem('sessionStorage', key, value)
  },
  getSession (key, defaultValue) {
    return this.resourceObj.getItem('sessionStorage', key, defaultValue)
  },
  removeSession (key) {
    this.resourceObj.removeItem('sessionStorage', key)
  },
  clearSession () {
    this.resourceObj.clear('sessionStorage')
  },
  getObj () {
    return this
  }
}
