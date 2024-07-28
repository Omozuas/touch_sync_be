const otpService = require('../services/otp.service');

exports.otpRegister = (req, res, next) => {
    otpService.sendOtp(req.body.email, (err, results) => {
        console.log(req.body.email)
        if (err) {
            return res.status(400).send({
                message: 'error',
                data: err
            });
        }
        return res.status(200).send({
            message: 'success',
            data: results
        });
    });
}

exports.verifyOtp = (req, res, next) => {
    otpService.verifyOtp(req.body, (err, results) => {
        if (err) {
            return res.status(400).send({
                message: 'error',
                data: err
            });
        }
        return res.status(200).send({
            message: 'success',
            data: results
        });
    });
}

