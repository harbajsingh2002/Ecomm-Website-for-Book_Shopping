import moment from 'moment'

const timeStamp = {
  created_At: {
    type: Number,
    default: moment(),
  },
  // is_Available: {
  //   type: Boolean,
  //   default: true,
  // },

  updated_At: {
    type: Number,
    default: moment(),
  },
}
export default timeStamp
