export function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0  || val == 'null') ? true : false;
}

export function getLength(val){
    try {
        if(val!=null){
            return val.length;
        }else{
            return 0;
        }
    } catch (error) {
        return 0;
    }
}