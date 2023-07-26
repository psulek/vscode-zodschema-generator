export enum Color {
    Red,
    Green,
    Blue
}

/**
 * This is car
 */
export type Car = {
    /**
     * My favorite color
     */
    color: Color;
    name: string;
    category: 'low' | 'mid' | 'high'
};