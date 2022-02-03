const { order, orderDetails, rel_order_details_user_agent_vendor, sequelize } = require("../../models");

const shoppingCartOrder = async (req, res, next) => {
    try {
        const { Outlet, NewUser, orderType } = req.body.userInformation
        let t;
        t = await sequelize.transaction();

        const ip = req._remoteAddress;
        var totalQty = 0;
        var totalPrice = 0;
        var totalProduct = 0;
        const productList = req.body.productInfo;
        const cartProductInfo = req.body.cartInfo;
        const invoiceSerila = await orderDetails.count();
        const orderTypes = orderType;
        Object.entries(cartProductInfo).map(([key, value]) => {
            const greaterThanTen = productList[key].filter(element => element.id == key);
            var totalProductPrice = (productList[key][2] * value);
            var totalProductQty = (value)
            totalQty += totalProductQty;
            totalPrice += totalProductPrice;
            totalProduct += 1;
            var singleOrder = order.create({ invoiceNumber: invoiceSerila, qty: totalProductQty, price: totalProductPrice, orderType: orderTypes }, { transaction: t });
        });
        if (NewUser == "NewUser") {
            //var singleOrder = order.create({ invoiceNumber: invoiceSerila, qty: totalProductQty, price: totalProductPrice, orderType: orderTypes }, { transaction: t });
        } else {

        }
        const insertOrderDetails = await orderDetails.create({ userId: "12", invoiceNumber: invoiceSerila, totalProduct: totalProduct, totalQty: totalQty, totalPrice: totalPrice, orderType: orderTypes, status: "pending" }, { transaction: t });
        const relInsertInfo = await rel_order_details_user_agent_vendor.create({ invoiceNumber: invoiceSerila, orderDetailsId: insertOrderDetails.id, userId: "12", agentId: '11', vendorId: "11" }, { transaction: t })
            .then((item) => {
                t.commit();
                res.json({ success: [{ result: 'Your order successfully', msg: item }] });
            })
            .catch((error) => {
                t.rollback();
                res.json({ errors: [{ result: 'error', msg: error['message'] }] });
            })
    } catch (error) {
        res.status(500).json({ errors: [{ result: 'error', msg: "System faild" }] });
    }
}

module.exports = shoppingCartOrder;

