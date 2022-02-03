const { categorySub } = require("../../models");
const addCategorySub = async (req, res, next) => {
    try {
        const { categoryId, title} = req.body;
		const mobileicon = req.files[0].filename;
        const desktopicon = req.files[1].filename;
        const brandicon = req.files[2].filename;

        const CategorySub = await categorySub.create({ categoryId: categoryId, title: title, mobileicon: mobileicon, desktopicon: desktopicon,brandicon:brandicon })
            .then((item) => {
                res.json({ success: [{ result: 'Your sub category add successfully', msg: item }] }); 
            })
            .catch((error) => {
                res.json({ errors: [{ result: 'error', msg: error['message'] }] });
            })
    } catch (error) {
        res.status(500).json({ errors: [{ result: 'error', msg: error['message'] }] });
    }
}

module.exports = addCategorySub;
