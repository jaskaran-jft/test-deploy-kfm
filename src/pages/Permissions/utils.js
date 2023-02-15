import { APIClient } from "../../helpers/api_helper"
import * as url from '../../helpers/url_helper'
const api = new APIClient();
export const fetchPermissions = (tenantId) =>{
  return api.get(`${url.FETCH_PERMISSIONS}?tenantId=${tenantId}`);
}
export const deletePermissions = (data) =>{
  return api.delete(`${url.DELETE_PERMISSIONS}?roleId=${data.roleId}&routeId=${data.routeId}`)
}

export const addPermission = (data) =>{
  return api.create(url.POST_PERMISSIONS,data);
}