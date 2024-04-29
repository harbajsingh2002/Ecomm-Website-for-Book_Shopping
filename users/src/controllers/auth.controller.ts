import User from '../models/user.model';
import { Request, Response } from 'express';
import { emailSender } from '../utils/send.email/send.email';
import { MESSAGE, STATUS_CODE, failAction, successAction } from '../utils/messages/response';
import { error } from 'console';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserServices } from '../services/user.services';
export class authcontroller {
  public static async forgetPassword(req: Request, res: Response, next: any) {
    try {
      console.log('user', req.res);

      // const { email } = req.body;

      //1.Get user based on the posted emails
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new Error('User could not find the with given Email');
      }

      //2.Generate a random reset token
      const resetToken = await user.resetPassword();
      //console.log('t7i78o9ptu', resetToken);

      await user.save({ validateBeforeSave: false });

      //3.Send the token back to the user email
      // Create reset url
      const resetUrl = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;
      const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}\n\nThis reset password is valid for 10 minutes.`;

      //Sending email
      // const email = new emailSender();
      emailSender.send({
        email: user.email,
        subject: 'Password change request received',
        message,
      });

      res.status(STATUS_CODE.SUCCESS).json(successAction(STATUS_CODE.SUCCESS, MESSAGE.add('Email Send')));
    } catch (err: any) {
      console.error(err);
      const user = new User();

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, MESSAGE.INTERNAL_SERVER_ERROR));
    }
  }

  //Reset Password
  public static async resetPassword(req: Request, res: Response, Token: any) {
    //Checking that user existeing or not
    console.log('Reset token:', req.params.resetToken);

    if (!req.params.resetToken) {
      return res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, MESSAGE.INVALID_TOKEN));
    }

    const token = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    console.log('Reset token:', token);

    const user = await User.findOne({ passwordResetToken: token, resetPasswordExpire: { $gt: Date.now() } });

    //const user = await User.findOne({
    // email:req.body.emailcd
    // });

    //Reseting the user password
    if (user) {
      // const user = new User();
      user.password = req.body.password;
      user.confirmPassword = req.body.confirmpassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.passwordChangedAt = Date.now();
      await user.save();
      //Login the user
      // const loginToken = await UserServices.login signToken(user._id);
      // const loginToken = await UserServices.login.jwt.signToken({ userId: user._id })
      res.status(STATUS_CODE.BAD_REQUEST).json(failAction(STATUS_CODE.BAD_REQUEST, MESSAGE.INVALID_TOKEN));
      // next(error);
      const loginToken = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY!, { expiresIn: '30min' });

      res.status(STATUS_CODE.SUCCESS).json(failAction(STATUS_CODE.SUCCESS, loginToken, MESSAGE.update('reset password')));
    }
  }
}
