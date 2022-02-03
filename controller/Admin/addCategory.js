const { category } = require("../../models");
const addCategory = async (req, res, next) => {
    try {
        const { title } = req.body;

        const mobileicon = req.files[0].filename;
        const desktopicon = req.files[1].filename;
        const brandicon = req.files[2].filename;

        const AddCategory = await category.create({ title: title, mobileicon: mobileicon, desktopicon: desktopicon, brandicon: brandicon })
            .then((item) => {
                res.status(200).json({ success: [{ result: 'Your category add successfully', msg: item }] });
            })
            .catch((error) => {
                res.status(500).json({ errors: [{ result: 'error', msg: error['message'] }] });
            })
    } catch (error) {
        res.status(500).json({ errors: [{ result: 'error', msg: error['message'] }] });
    }
}

module.exports = addCategory;
