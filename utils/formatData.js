module.exports.formatData = function (rawData) {
    let data = {}
    if(rawData.tenhoa)
        data = {...data, tenhoa: rawData.tenhoa}
    if(rawData.maloai !== 'All')
        data = {...data, maloai: rawData.maloai}
    if(rawData.giaban)
        data = {...data, giaban: rawData.giaban}
    if(rawData.mota)
        data = {...data, mota: rawData.mota}
    if(rawData.hinh)
        data = {...data, hinh: rawData.hinh}
    if (data)
        return data
    return null
}