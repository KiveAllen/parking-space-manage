// @ts-ignore
/* eslint-disable */
import request from "../libs/request";

/** addReservation POST /api/reservation/add */
export async function addReservationUsingPost(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLong_>("/api/reservation/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteReservation POST /api/reservation/delete */
export async function deleteReservationUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/reservation/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** getReservationVOById GET /api/reservation/get */
export async function getReservationByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReservationVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseReservation_>("/api/reservation/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listReservationByPage POST /api/reservation/list/page */
export async function listReservationByPageUsingPost(
  body: API.ReservationQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageReservation_>(
    "/api/reservation/list/page",
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

/** updateReservation POST /api/reservation/update */
export async function updateReservationUsingPost(
  body: API.Reservation,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>("/api/reservation/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
