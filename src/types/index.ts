export type TAddToCart = {
    userId:number;
    productId:string;
}

export type TSignUp = {
    username:string;
    email:string;
    phoneNumber:string;
    password:string;
}


export type TSignIn = {
    username:string;
    password:string;
}