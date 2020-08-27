import { PhoneNumberUtil } from "google-libphonenumber"

export class ValidationUtil {

    static isValidName(name: string){
        return new RegExp("[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$").test(name);
    }

    static isValidPassword(password: string){
        return password.length >= 6
    }

    static isValidPhoneNumber(phoneNumber: string){
        const phoneNumberUtil = PhoneNumberUtil.getInstance();
        try {
          phoneNumberUtil.parse(phoneNumber);
          return true;
        } catch (error) {
          return false;
        }
    }

    static isValidEmail(email: string){
        return new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ).test(email);
    }

}