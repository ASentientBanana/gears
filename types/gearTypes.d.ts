import { Vector2 } from "./genericTypes";

export interface IToothOptions {
    ht: number,//tooth heigt
    pa: number,//presure angle
    bw: number,//tooth base width

}
export interface ITooth{
    p1:Vector2;
    p2: Vector2;
    p3: Vector2;
    p4: Vector2;
}