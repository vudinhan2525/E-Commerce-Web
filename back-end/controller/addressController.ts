import catchAsync from '../utils/catchAsync';
import { MiddleWareFn } from '../interfaces/MiddleWareFn';
import Address from '../models/addressModel';
import AppError from '../utils/AppError';
import User from '../models/userModel';
const factory = require('./factoryController');
exports.getOneAddress = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const user = await Address.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: user,
    });
}));
exports.getAllAddress = factory.getAll(Address);
exports.addAddress = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Address.create({
        receiveName: req.body.receiveName,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.getUserAddress = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Address.find({ _id: { $in: req.body.data } });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.updateAddress = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const data = await Address.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: data,
    });
}));
exports.deleteAddress = catchAsync(<MiddleWareFn>(async (req, res, next) => {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (deletedAddress) {
        const data = await User.findOneAndUpdate(
            { address: req.params.id },
            {
                $pull: { address: req.params.id },
            },
            { new: true },
        );
        res.status(200).json({
            status: 'success',
            data: deletedAddress,
        });
    } else {
        return next(new AppError('Address not found !!', 404));
    }
}));
