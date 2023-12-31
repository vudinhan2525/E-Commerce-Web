import AppError from '../utils/AppError';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Shop from '../models/shopModel';
import APIFeature from '../utils/apiFeature';

import catchAsync from '../utils/catchAsync';
exports.getAllShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const doc = new APIFeature(Shop.find({}), req.query);
    doc.filter().sort().fields().pagination();
    const users = await doc.query;
    res.status(200).json({
        status: 'success',
        data: users,
    });
}));
exports.addShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.create({
        name: req.body.name,
        summary: req.body.summary,
        type: req.body.type,
        isChecked: req.body.isChecked,
        avatar: req.body.avatar,
        background: req.body.background,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.updateShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.getRelatedShop = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Shop.find({ _id: { $in: req.body.data } });
    const idPositions = new Map();
    req.body.data.map((el: string, idx: number) => {
        idPositions.set(el, idx);
    });
    data.sort((a, b) => {
        const x = idPositions.get(a._id.toString());
        const y = idPositions.get(b._id.toString());
        return x - y;
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
