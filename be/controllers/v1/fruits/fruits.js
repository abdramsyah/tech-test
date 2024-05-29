const Paginator = require('../../../helpers/paginator');
const { validationResult } = require('express-validator');
const Op = require('sequelize').Op;
const { Fruits } = require('../../../models');
const { Log } = require('../../../utils/customLog');
const { outputParser } = require('../../../utils/outputParser');
const { sendLinkResetPasswordAdmin } = require('../../../service/sendKodeOtp');

class FruitController {
  static async createFruit(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        Log.error(errors);
        return outputParser.errorValidatorFirst(req, res, errors);
      }

      const { name, color, price, stock } = req.body;

      const existingFruit = await Fruits.findOne({ where: { name } });
      if (existingFruit) {
        let data = {
          data: 'Tambah buah gagal',
        };
        return outputParser.errorCustom(
          req,
          res,
          'Buah dengan nama tersebut sudah terdaftar',
          data
        );
      }

      const data = {
        name,
        color,
        price,
        stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await Fruits.create(data);

      return outputParser.success(req, res, 'Create Fruit Success');
    } catch (err) {
      Log.error(err);
      return outputParser.errorCustom(req, res, err.message, null);
    }
  }

  static async getListFruits(req, res) {
    console.log('masuk.getListFruits');
    let queryResult = null;
    let { page, size: limit, search, sort, direction = 'ASC' } = req.query;
    const paging = new Paginator(page, limit);
    const offset = paging.getOffset();

    try {
      let where = {};
      let order = [];
      if (search) {
        Object.assign(where, {
          name: { [Op.iLike]: `%${search}%` },
        });
      }

      if (sort && direction) {
        order.push([sort, direction]);
      } else {
        order.push(['name', 'ASC']);
      }

      queryResult = await Fruits.findAndCountAll({
        // attributes: ['id', 'name', 'color', 'price', 'stock'],
        where,
        limit,
        offset,
        order,
      });

      let template = {
        count: queryResult.count,
        rows: queryResult.rows.map((fruit) => ({
          id: fruit.id,
          name: fruit.name,
          color: fruit.color,
          price: fruit.price,
          stock: fruit.stock,
          // rak: fruit.rak,
          // branch: fruit.branch,
          // status: fruit.status,
        })),
      };

      paging.setData(template);
      const resp = paging.getPaginator();
      return outputParser.success(req, res, 'List Fruits Managament Success', resp);
    } catch (err) {
      return outputParser.error(req, res, 'Internal Server Error');
    }
  }

  static async getFruitById(req, res) {
    let errs = validationResult(req);
    if (!errs.isEmpty()) {
      Log.error(errs);
      return outputParser.errorValidatorFirst(req, res, errs);
    }
    const { id } = req.params;
    try {
      const fruit = await Fruits.findOne({
        // attributes: ['id', 'name', 'color', 'price', 'stock'],
        where: { id },
      });
      if (!fruit) {
        return outputParser.notFound(req, res, 'Cannot find data');
      }
      let template = {
        id: fruit.id,
        name: fruit.name,
        color: fruit.color,
        price: fruit.price,
        stock: fruit.stock,
        // rak: fruit.rak,
        // branch: fruit.branch,
        // status: fruit.status,
      };

      return outputParser.success(req, res, 'Get Detail Fruit success', template);
    } catch (err) {
      Log.error(err.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateFruit(req, res) {
    Log.info('[LOG]: Update Fruits');
    const { name, color, price, stock } = req.body;
    const fruitId = req.params.id;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        Log.error(errors);
        return outputParser.errorValidatorFirst(req, res, errors);
      }

      const fruit = await Fruits.findByPk(fruitId);

      if (!fruit) {
        return outputParser.errorCustom(req, res, 'Buah tidak ditemukan', null, 404);
      }

      await fruit.update({
        name,
        color,
        price,
        stock,
      });

      return outputParser.success(req, res, 'Sukses memperbarui Buah');
    } catch (err) {
      Log.error('update buah', err);
      return outputParser.errorCustom(req, res, err.message, null);
    }
  }

  static async deleteFruit(req, res) {
    Log.info('[LOG]: Delete Fruit');
    const fruitId = req.params.id;

    try {
      const fruit = await Fruits.findByPk(fruitId);

      if (!fruit) {
        return outputParser.errorCustom(req, res, 'Buah tidak ditemukan', null, 404);
      }

      await fruit.destroy();
      // await fruit.update({ status: 'INACTIVE' });

      return outputParser.success(req, res, 'Sukses menghapus Buah');
    } catch (err) {
      Log.error('delete fruit', err);
      return outputParser.errorCustom(req, res, err.message, null);
    }
  }
}

module.exports = {
  FruitController,
};
