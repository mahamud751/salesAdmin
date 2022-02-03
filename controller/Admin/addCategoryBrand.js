const { categoryBrand } = require("../../models");
const addCategoryBrand = async (req, res, next) => {
    try {
        const { categoryId, subId, title} = req.body;
		const mobileicon = req.files[0].filename;
        const desktopicon = req.files[1].filename;
        const brandicon = req.files[2].filename;
        const CategoryBrand = await categoryBrand.create({ categoryId: categoryId, categorySubId: subId, title: title, mobileicon: mobileicon, desktopicon: desktopicon,brandicon:brandicon })
            .then((item) => {
                res.json({ success: [{ result: 'Your brand add successfully', msg: item }] });
            })
            .catch((error) => {
                res.json({ errors: [{ result: 'error', msg: error['message'] }] });
            })
    } catch (error) {
        res.status(500).json({ errors: [{ result: 'error', msg: error['message'] }] }); 
    }
}

module.exports = addCategoryBrand;
