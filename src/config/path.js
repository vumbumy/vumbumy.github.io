const admin = '/admin'
const secured = '/secured';

export default {
  baseURL: process.env.VUE_APP_API_BASE_URL,
  admin: {
    users: secured + admin + "/users",
  },
  secured: {
    tickets: secured + "/tickets",
    tickets_status: secured + "/tickets/status"
  },
  api: {
    tickets: "/tickets"
  },
  auth: {
    sign: {
      up: '/sign/up',
      in: '/sign/in'
    },
    me: secured + "/me"
  }
}
