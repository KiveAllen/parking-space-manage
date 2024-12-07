// @ts-ignore
/* eslint-disable */
import request from "../libs/request";

/** addFeedback POST /api/feedback/add */
export async function addFeedbackUsingPost(
    body: API.FeedbackAddRequest,
    options?: { [key: string]: any }
) {
    return request<API.BaseResponseLong_>("/api/feedback/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

/** deleteFeedback POST /api/feedback/delete */
export async function deleteFeedbackUsingPost(
    body: API.DeleteRequest,
    options?: { [key: string]: any }
) {
    return request<API.BaseResponseBoolean_>("/api/feedback/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

/** listFeedbackByPage POST /api/feedback/list/page */
export async function listFeedbackByPageUsingPost(
    body: API.FeedbackQueryRequest,
    options?: { [key: string]: any }
) {
    return request<API.BaseResponsePageFeedback_>("/api/feedback/list/page", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

export async function getFeedbackByIdUsingGET(
    params: API.getFeedbackByIdUsingGETParams,
    options?: { [key: string]: any }
) {
    return request<API.Feedback>("/api/feedback/get", {
        method: "GET",
        params: {
            ...params,
        },
        ...(options || {}),
    });
}
