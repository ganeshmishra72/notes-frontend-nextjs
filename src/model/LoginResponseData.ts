export default interface LoginResponseData {
    access_token: string | null,
    email: string,
    name: string,
    refersh_token: string | null,
    role: string
    credits: null | number,
}