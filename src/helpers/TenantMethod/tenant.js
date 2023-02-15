import { APIClient } from "../api_helper";

import * as url from "../url_helper";

const api = new APIClient();

// Tenant Methods
export const addTenant = (data) => api.create(url.POST_ADD_TENANT, data);
export const updateTenant = (data) => api.patch(url.POST_ADD_TENANT, data);
export const checkDomainName = (data) =>
  api.create(url.POST_CHECK_DOMAIN_NAME, data);
export const fetchTenant = (data) => api.get(url.GET_FETCH_TENANT, data);
export const addTenantUser = (data) =>
  api.create(url.POST_ADD_TENENT_USER, data);
export const fetchTenantList = (data) =>
  api.create(url.GET_FETCH_TENANT_LIST, data);
export const getTenantUserList = (data) =>
  api.get(url.GET_TENANT_USER_LIST, data);
export const getTenantUserDetails = (id) =>
  api.get(url.GET_TENANT_USER_DETAILS(id));
export const updateTenantUserDetails = (data, id) =>
  api.patch(url.GET_TENANT_USER_DETAILS(id), data);
