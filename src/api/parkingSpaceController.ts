// @ts-ignore
/* eslint-disable */
import request from "../libs/request";

/** addParkingSpace POST /api/parkingSpace/add */
export async function addParkingSpaceUsingPost(
  body: API.ParkingSpace,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/parkingSpace/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteParkingSpace POST /api/parkingSpace/delete */
export async function deleteParkingSpaceUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/parkingSpace/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getParkingSpaceVOById GET /api/parkingSpace/get */
export async function getParkingSpaceByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getParkingSpaceByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseParkingSpace_>("/api/parkingSpace/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listParkingSpaceByPage POST /api/parkingSpace/list/page */
export async function listParkingSpaceByPageUsingPost(
  body: API.ParkingSpaceQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageParkingSpace_>(
    "/api/parkingSpace/list/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** updateParkingSpace POST /api/parkingSpace/update */
export async function updateParkingSpaceUsingPost(
  body: API.ParkingSpace,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/parkingSpace/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
