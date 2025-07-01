// ========================================================================================================
//? interface for login_required middleware
// ========================================================================================================

export interface JWT_data{
    user_id: string;
    user_fullname: string;
    user_role: string;
}