const errorHandler = require('../utils/errorHandler');
const Order = require('../models/Order');
const moment = require('moment');
module.exports.overview = async (req, res) => {
    try{
                const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
                let allOrdersYesterday = 0;
                let percentOrders = 0;
                let gainYersterday = 0;
                let percentGain = 0;
                let compareGain = 0;
                let compareOrders = 0;
                if(allOrders.length !== 0) {
                    const allOrdersPerDays = convertToMap(allOrders);
                    const countAllOrders = allOrders.length;
                    const countAllDays = Object.keys(allOrdersPerDays).length;
                    const orderInOneDay = (countAllOrders / countAllDays).toFixed(0);
                    allOrdersYesterday = allOrdersPerDays[moment().add(-1, 'd').format('DD.MM.YYYY')] ? allOrdersPerDays[moment().add(-1, 'd').format('DD.MM.YYYY')].length : 0;
                    percentOrders = (((allOrdersYesterday/ orderInOneDay) -1) * 100).toFixed(2);
                    var fullGain = getFullGain(allOrders);
                    const gainInOneDay = (fullGain / countAllDays).toFixed(2);
                    gainYersterday = getFullGain(allOrdersPerDays[moment().add(-1, 'd').format('DD.MM.YYYY')]);
                    percentGain = (((gainYersterday / gainInOneDay) - 1)* 100).toFixed(2);
                    compareGain = (gainYersterday - gainInOneDay).toFixed(2);
                    compareOrders = (allOrdersYesterday - orderInOneDay).toFixed(2);
                }
        res.status(200).json({
            gain: {
                percent: Math.abs(+percentGain),
                compare: Math.abs(+compareGain),
                yersteday: +gainYersterday,
                isHigh: +percentGain > 0
            },
            orders: {
                percent: Math.abs(+percentOrders),
                compare: Math.abs(+compareOrders),
                yersteday: +allOrdersYesterday,
                isHigh: +percentOrders > 0
            }
        })
    }catch(error) {
        errorHandler(res, error);
    }
};
module.exports.analytics = async(req, res) => {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
    let average = 0;
    let chart = [{label: '', gain: 0, order: 0}];
    if(allOrders.length !== 0) {
        const allOrdersPerDays = convertToMap(allOrders);
        average = (+getFullGain(allOrders) / Object.keys(allOrdersPerDays).length).toFixed(2);
        chart = Object.keys(allOrdersPerDays).map( label => {
            const gain = +getFullGain(allOrdersPerDays[label]);
            const order = allOrdersPerDays[label].length;
            return {
                label,
                gain,
                order
            }
        });
    }
    res.status(200).json({
        average,
        chart
    })
};
function getFullGain(orders) {
    let sum = 0;
    if(orders instanceof Array) {
        sum = orders.reduce((total, order) => {
            return total += order.list.reduce((total, item) => {
                return total += item.cost * item.quanitity;
            }, 0);
        }, 0);
    }
    return sum;
}
function convertToMap(orders) {
    let obj = {};
    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY');
        if(!obj[date]) {
            obj[date] = [];
            obj[date].push(order);
        } else {
            obj[date].push(order);
        }
    });
    return obj;
}