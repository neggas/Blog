export interface JwtPayload {
    sub: {
        email: string;
        id: string;
    };
    iat: number;
    exp: number;
}
