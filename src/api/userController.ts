// @ts-ignore
/* eslint-disable */
import request from "../libs/request";

/** addUser POST /api/user/add */
export async function addUserUsingPost(
  body: API.UserAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser DELETE /api/user/delete */
export async function deleteUserUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser_>("/api/user/get/login", {
    method: "GET",
    ...(options || {}),
  });
}

/** listUserByPage POST /api/user/list/page */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageUser_>("/api/user/list/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>("/api/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** userRegisterAndLogin POST /api/user/registerAndLogin */
export async function userRegisterAndLoginUsingPost(
  body: API.UserRegisterAndLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUser_>("/api/user/registerAndLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** sendCode GET /api/user/sendCode */
export async function sendCodeUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendCodeUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/sendCode", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.User,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
