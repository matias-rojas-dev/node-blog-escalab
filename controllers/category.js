const { default: slugify } = require("slugify");
const Category = require("../models/category");


exports.create = async(req, res) => {
    try {
        const category = await Category.create({
            ...req.body,
            slug: slugify(req.body.name)
        });
        category.save();
    
        res.json({
            success: true,
            category
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            msg: "Ha ocurrido un error al crear la categoría"
        });
    }
}

exports.read = async (req, res) => {
    const {slug} = req.params;
    try {
        const category = await Category.findOne({
            slug,
            status: "Active"
        });

        res.json({
            success: true,
            category
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            msg: `Ha ocurrido un error al buscar la categoría: ${slug}`,
        })
    }
}

exports.list =  async(req, res) => {
    try {
        const categories = await Category.find({status: "Active"});

        res.json({
            success: true,
            categories
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: "Ha habido un error al intentar acceder a las categorías"
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const {slug} = req.params;

        const category = await Category.findOneAndDelete({
            slug
        });

        res.json({
            success: true,
            category,
            msg: "La categoría ha sido eliminada correctamente"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "Ha ocurrido un error al eliminar la categoría"
        })
    }
}

exports.removeSoft = async( req, res) => {
    try {
        const {slug} = req.params;

        const category = await Category.findOneAndUpdate(
            {slug},
            {status: "Inactive"},
            {new: true}
        );

        res.json({
            success: true,
            category,
            msg: "La categoría ha sido removida"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "Ha ocurrido un error al remover la categoría"
        })
    }
}

