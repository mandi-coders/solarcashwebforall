const baseURL = "https://bugaboo.technoriver.in/api/v1";

const APIs = {
  Login: {
    path: `${baseURL}/auth/login`,
    method: "POST",
  },
  ForgotEmail: {
    path: `${baseURL}/auth/otp/forgot`,
    method: "POST",
  },
  OTP: {
    path: `${baseURL}/auth/otp/verify`,
    method: "POST",
  },
  MakeNewPass: {
    path: `${baseURL}/auth/otp/reset`,
    method: "POST",
  },
  Register: {
    path: `${baseURL}/auth/register`,
    method: "POST",
  },
  UserProfile: {
    path: `${baseURL}/profile/get`,
    method: "GET",
  },
  ChangePassword: {
    path: `${baseURL}/profile/change-password`,
    method: "PUT",
  },
  Invest: {
    path: `${baseURL}/packages/get`,
    method: "GET",
  },
  PaymentDetails: {
    path: `${baseURL}/packages/payment-methods`,
    method: "GET",
  },
  MakePayment: {
    path: `${baseURL}/packages/:id/buy`,
    method: "POST",
  },
  Purchased: {
    path: `${baseURL}/purchase`,
    method: "GET",
  },
  FundHistory: {
    path: `${baseURL}/balance/purchase-history`,
    method: "GET",
  },
  Income: {
    path: `${baseURL}/balance/purchase-history`,
    method: "GET",
  },
  RewardHistory: {
    path: `${baseURL}/balance/history`,
    method: "GET",
  },
  TotalIncome: {
    path: `${baseURL}/incomes`,
    method: "GET",
  },
  SingleLevel: {
    path: `${baseURL}/incomes/levels/level_`,
    method: "GET",
  },

  withdrawal_history: {
    path: `${baseURL}/withdrawal/history`,
    method: "GET",
  },
  withdrawal_request: {
    path: `${baseURL}/withdrawal/create`,
    method: "POST",
  },
  Available_Amount: {
    path: `${baseURL}/balance/get`,
    method: "GET",
  },
  CreateTicket: {
    path: `${baseURL}/tickets`,
    method: "POST",
  },
  GetAllTicket: {
    path: `${baseURL}/tickets`,
    method: "GET",
  },
  GetSingleicket: {
    path: `${baseURL}/tickets/`,
    method: "GET",
  },
  replyMessage: {
    path: `${baseURL}/tickets/`,
    method: "PUT",
  },
  postUTR: {
    path: `${baseURL}/packages/`,
    method: "PUT",
  },
};

export default APIs;
