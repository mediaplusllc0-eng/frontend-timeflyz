const Endpoints = {
  //AUTH
  LOGIN: "/login",
  LOGOUT: "/logout",

  //PASSWORD AND VERIFY EMAIL
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",

  //USER
  CREATE_USER: "/user/create",
  GET_ALL_USERS: "/user/getAll",
  GET_USER: "/user/get/:id",
  UPDATE_USER: "/user/update/:id",
  DELETE_USER: "/user/delete/:id",

  //COMMON
  TEMP_FILE_UPLOAD: "/common/tempFileUpload",

  //CUSTOMER
  CREATE_CUSTOMER: "/customer/create",
  GET_CUSTOMER_BY_ID: "/customer/get/:id",
  UPDATE_CUSTOMER: "/customer/update/:id",
  DELETE_CUSTOMER: "/customer/delete/:id",
  GET_ALL_CUSTOMERS: "/customer/getAll",
  GET_CUSTOMER_BY_HOTEL_ID: "/customer/getByHotel/:hotelId",

  //HOTEL
  CREATE_HOTEL: "/hotel/create",
  GET_ALL_HOTELS: "/hotel/getAll",
  GET_HOTEL: "/hotel/get/:id",
  UPDATE_HOTEL: "/hotel/update/:id",
  DELETE_HOTEL: "/hotel/delete/:id",
  ASSIGN_MANAGER: "/hotel/assignManagers/:hotelId/:managerId",
  REMOVE_MANAGER: "/hotel/removeManagers/:hotelId/:managerId",
  SEARCH_HOTELS: "/hotel/search",

  //ROOM
  CREATE_ROOM: "/room/create",
  GET_ALL_ROOMS: "/room/getAll",
  GET_ROOM: "/room/get/:id",
  UPDATE_ROOM: "/room/update/:id",
  DELETE_ROOM: "/room/delete/:id",
  GET_ALL_ROOMS_BY_HOTEL_ID: "/room/getByHotel/:hotelId",

  //ROOM_CATEGORY
  CREATE_ROOM_CATEGORY: "/roomCategory/create",
  GET_ROOM_CATEGORY_BY_ID: "/roomCategory/getById/:id",
  UPDATE_ROOM_CATEGORY: "/roomCategory/update/:id",
  DELETE_ROOM_CATEGORY: "/roomCategory/delete/:id",
  GET_ALL_ROOM_CATEGORIES: "/roomCategory/getAll",
  GET_ALL_ROOM_CATEGORIES_BY_HOTEL_ID: "/roomCategory/getByHotel/:hotelId",

  //BOOKING
  CREATE_BOOKING: "/booking/create",
  GET_BOOKING_BY_ID: "/booking/get/:id",
  UPDATE_BOOKING: "/booking/update/:id",
  DELETE_BOOKING: "/booking/delete/:id",
  GET_ALL_BOOKINGS: "/booking/getAll",
  GET_ALL_BOOKINGS_BY_HOTEL_ID: "/booking/getByHotel/:hotelId",
  GET_ALL_BOOKINGS_BY_CUSTOMER_ID: "/booking/getByCustomer/:customerId",
  REQUEST_BOOKING_CANCELLATION:
    "/booking/requestBookingCancellation/:bookingId",
  RESPOND_TO_CANCELLATION_REQUEST:
    "/booking/respondToCancellationRequest/:bookingId",

  //SLOT
  CREATE_SLOT: "/slot/create",
  GET_SLOT_BY_ID: "/slot/get/:id",
  UPDATE_SLOT: "/slot/update/:id",
  DELETE_SLOT: "/slot/delete/:id",
  GET_ALL_SLOTS: "/slot/getAll",
  GET_ALL_SLOTS_BY_HOTEL_ID: "/slot/getByHotel/:hotelId",
  GET_ALL_SLOTS_BY_ROOM_ID: "/slot/getByRoom/:roomId",

  //REVIEW
  CREATE_REVIEW: "/review/create",
  GET_REVIEW_BY_ID: "/review/get/:id",
  UPDATE_REVIEW: "/review/update/:id",
  DELETE_REVIEW: "/review/delete/:id",
  GET_ALL_REVIEWS: "/review/getAll",
  GET_ALL_REVIEWS_BY_HOTEL_ID: "/review/getByHotel/:hotelId",

  //NOTIFICATION
  CREATE_NOTIFICATION: "/notification/create",
  GET_NOTIFICATION_BY_ID: "/notification/get/:id",
  UPDATE_NOTIFICATION: "/notification/update/:id",
  DELETE_NOTIFICATION: "/notification/delete/:id",
  GET_ALL_NOTIFICATIONS: "/notification/getAll",

  //SUPPORT
  CREATE_SUPPORT_TICKET: "/support/create",
  GET_SUPPORT_TICKET_BY_ID: "/support/get/:id",
  UPDATE_SUPPORT_TICKET: "/support/update/:id",
  DELETE_SUPPORT_TICKET: "/support/delete/:id",
  GET_ALL_SUPPORT_TICKETS: "/support/getAll",
  GET_ALL_SUPPORT_TICKETS_BY_HOTEL_ID: "/support/getByHotel/:hotelId",
  GET_ALL_SUPPORT_TICKETS_BY_CUSTOMER_ID: "/support/getByCustomer/:customerId",
  GET_ALL_SUPPORT_TICKETS_BY_STATUS: "/support/getByStatus/:status",
  GET_ALL_SUPPORT_TICKETS_BY_CATEGORY: "/support/getByCategory/:category",
  ASSIGN_SUPPORT_TICKET: "/support/assignTicket/:supportId/:userId",
  AUTO_ASSIGN_SUPPORT_TICKET: "/support/autoAssign/:supportId",
  UPDATE_SUPPORT_TICKET_STATUS: "/support/statusUpdate/:supportId",
};

export default Endpoints;
