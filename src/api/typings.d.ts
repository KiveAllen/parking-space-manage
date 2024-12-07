declare namespace API {
    type BaseResponseBoolean_ = {
        code?: number;
        data?: boolean;
        description?: string;
        message?: string;
    };

    type BaseResponseLong_ = {
        code?: number;
        data?: number;
        description?: string;
        message?: string;
    };

    type BaseResponsePageFeedback_ = {
        code?: number;
        data?: PageFeedback_;
        description?: string;
        message?: string;
    };

    type BaseResponsePageParkingSpace_ = {
        code?: number;
        data?: PageParkingSpace_;
        description?: string;
        message?: string;
    };

    type BaseResponsePageReservation_ = {
        code?: number;
        data?: PageReservation_;
        description?: string;
        message?: string;
    };

    type BaseResponsePageUser_ = {
        code?: number;
        data?: PageUser_;
        description?: string;
        message?: string;
    };

    type BaseResponseParkingSpace_ = {
        code?: number;
        data?: ParkingSpace;
        description?: string;
        message?: string;
    };

    type BaseResponseReservation_ = {
        code?: number;
        data?: Reservation;
        description?: string;
        message?: string;
    };

    type BaseResponseUser_ = {
        code?: number;
        data?: User;
        description?: string;
        message?: string;
    };

    type DeleteRequest = {
        id?: number;
    };

    type Feedback = {
        commentImage?: string;
        commentText?: string;
        createTime?: string;
        id?: number;
        rating?: number;
        spaceId?: number;
        userId?: number;
        reservationId?: number;
    };

    type FeedbackAddRequest = {
        commentImage?: string;
        commentText?: string;
        rating?: number;
        spaceId?: number;
        reservationId?: number;
    };

    type FeedbackQueryRequest = {
        pageNum?: number;
        pageSize?: number;
        spaceId?: number;
    };

    type getFeedbackByIdUsingGETParams = {
        /** id */
        reservationId?: number;
    }

    type getParkingSpaceByIdUsingGETParams = {
        /** id */
        id?: number;
    };

    type getReservationVOByIdUsingGETParams = {
        /** id */
        id?: number;
    };

    type OrderItem = {
        asc?: boolean;
        column?: string;
    };

    type PageFeedback_ = {
        countId?: string;
        current?: number;
        maxLimit?: number;
        optimizeCountSql?: boolean;
        orders?: OrderItem[];
        pages?: number;
        records?: Feedback[];
        searchCount?: boolean;
        size?: number;
        total?: number;
    };

    type PageParkingSpace_ = {
        countId?: string;
        current?: number;
        maxLimit?: number;
        optimizeCountSql?: boolean;
        orders?: OrderItem[];
        pages?: number;
        records?: ParkingSpace[];
        searchCount?: boolean;
        size?: number;
        total?: number;
    };

    type PageReservation_ = {
        countId?: string;
        current?: number;
        maxLimit?: number;
        optimizeCountSql?: boolean;
        orders?: OrderItem[];
        pages?: number;
        records?: Reservation[];
        searchCount?: boolean;
        size?: number;
        total?: number;
    };

    type PageUser_ = {
        countId?: string;
        current?: number;
        maxLimit?: number;
        optimizeCountSql?: boolean;
        orders?: OrderItem[];
        pages?: number;
        records?: User[];
        searchCount?: boolean;
        size?: number;
        total?: number;
    };

    type ParkingSpace = {
        addressDescription?: string;
        createTime?: string;
        customTimeEnd?: string;
        customTimeStart?: string;
        id?: number;
        isAvailable?: number;
        latitude?: number;
        longitude?: number;
        price?: number;
        priceType?: number;
        updateTime?: string;
        userId?: number;
        parkPhoto?: string;
        parkNumber?: string;
        distance?: number;
    };

    type ParkingSpaceQueryRequest = {
        isAvailable?: number;
        latDown?: number;
        latUp?: number;
        lonDown?: number;
        lonUp?: number;
        pageNum?: number;
        pageSize?: number;
        priceType?: number;
        userId?: number;
        searchText?: string;
        longitude?: number;
        latitude?: number;
    };

    type Reservation = {
        name?: string
        createTime?: string;
        id?: number;
        ownerId?: number;
        reservationStatus?: number;
        reservationTimeEnd?: string;
        reservationTimeStart?: string;
        spaceId?: number;
        totalCost?: number;
        updateTime?: string;
        userId?: number;
    };

    type ReservationQueryRequest = {
        ownerId?: number;
        pageNum?: number;
        pageSize?: number;
        reservationStatus?: number;
        userId?: number;
    };

    type sendCodeUsingGETParams = {
        /** phone */
        phone: string;
    };

    type User = {
        avatar?: string;
        id?: number;
        name?: string;
        phone?: string;
        registerTime?: string;
        roleType?: number;
    };

    type UserAddRequest = {
        avatar?: string;
        name?: string;
        phone?: string;
        roleType?: number;
    };

    type UserQueryRequest = {
        pageNum?: number;
        pageSize?: number;
        roleType?: number;
        userName?: string;
    };

    type UserRegisterAndLoginRequest = {
        admin?: boolean;
        code?: string;
        phone?: string;
    };
}
