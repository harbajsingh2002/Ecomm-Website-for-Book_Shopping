import moment from "moment";

const timeStamp={
    created_At:
    {
        type:Number,
        default:moment()
    },
    updated_At:{
        type:Number,
        default:moment()
    },
}
 export default timeStamp;