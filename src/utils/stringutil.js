export function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0  || val == 'null') ? true : false;
}