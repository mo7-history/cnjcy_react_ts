import { ajax_json } from '@/utils/http';

export const apply = (data: any) => {
  return ajax_json({
    url: '/api/u/report/apply',
    data,
    method: 'post',
  });
};

export const getDetail = (data: { id: string }) => {
  return ajax_json({
    url: `/api/u/report/detail/${data.id}`,
    data,
    method: 'get',
  });
};

export const getReportList = (data?: any) => {
  return ajax_json({
    url: '/api/u/report/pageList',
    data,
    method: 'get',
  });
};
