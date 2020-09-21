export class MessageUtil {
    static INVALID_REQUEST_DATA = "One or more data is missing in the request.";
    static INVALID_FIRST_NAME = "Invalid first name.";
    static INVALID_LAST_NAME = "Invalid last name.";
    static INVALID_EMAIL_ADDRESS = "Invalid email address.";
    static INVALID_PHONE_NUMBER = "Invalid phone number."
    static INVALID_PASSWORD = "Password must be at least 6 characters.";
    static USER_ALREADY_EXISTS = "An user with this email already exists."
    static INVALID_CREDENTIALS = "Invalid credentials."
    static INVALID_AUTHORIZATION_TOKEN = "The access token provided is either expired, revoked, malformed, or invalid."
    static CATEGORY_ALREADY_EXISTS = "Category Name Already Exist";
    static CATEGORY_NOT_FOUND = "Category not found";
    static INVALID_PERMISSIONS_LENGTH = "A role must have at least one permission.";
    static INVALID_ROLE_LENGTH = "A user must have at least one role.";
    static ROLE_NOT_FOUND = "Role not found.";
    static ROLE_ALREADY_EXISTS = "This role already exists.";
    static ROLE_ALREADY_ASSIGNED = "Role already assigned to this user";
    static PERMISSION_NOT_FOUND = "Permission not found.";
    static PERMISSION_DENIED =
        "You do not have permission to perform this operation. Kindly contact an administrator.";
}