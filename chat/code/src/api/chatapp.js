import request from '../utils/request';

export function banner() {
  return request.ajaxGet('/banner');
}

export function imageUpload(file) {
  const form = new FormData();
  form.append('file', file);
  return request.ajaxPost('/uploadStation', form, [
    {
      'Content-Type': 'multipart/form-data'
    }
  ]);
}

export function mask(data) {
  return request.ajaxPost('/mask', data);
}

export function maskList() {
  return request.ajaxGet('/mask');
}

export function maskDelete(id) {
  return request.ajaxDelete(`/mask?id=${id}`);
}
