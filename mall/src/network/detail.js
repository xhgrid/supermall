import { request } from './requests'
export function getDetail (iid) {
  return request({
    url: '/detail',
    method: 'GET',
    params: {
      iid
    }
  })
}
