export interface User {
    login: string;
    password: string;
    wallet?: number;
    cosmetics: Cosmetic[];
}

export interface Cosmetic {
    id: string;
    name: string;
    type: 'bar' | 'ball' | 'background';
    imagePath: string;
    equipped: boolean;
    price?: number;
}