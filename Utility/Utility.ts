interface IOptions {
    ht: number,//tooth heigt
    pa: number,//presure angle
    radius: number,
    bw: number
}
import Gear from './Gear';

export default class Utility {

    static getAngleFromPoints(cx: number, cy: number, ex: number, ey: number, returnDegree: boolean = false): number {
        const dy: number = ey - cy;
        const dx: number = ex - cx;
        const theta: number = Math.atan2(dy, dx); // range (-PI, PI]
        if (returnDegree) return theta * 180 / Math.PI; // rads to degs, range (-180, 180]
        else return theta
    }
    static polarToCartesian(rad: number, an: number) {
        const d = Utility.radianToDegree(an)
        const angle = 180 - d - 90;
        const a = Utility.degreeToRadian(angle);
        const cx = rad * Math.cos(a)
        const cy = rad * Math.sin(a)
        return { x: cx, y: cy }
    }
    static cartesianToPolar(x: number, y: number) {

        const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        let angle;
        if (x < 0) {
            angle = Math.atan2(x, y)
        }
        else {
            angle = Math.atan2(x, y)
        }
        return { radius: r, angle: angle }
    }
    static getDistanceBetweenTwoPoints(p1: number[], p2: number[]) {
        const [x1, y1] = p1
        const [x2, y2] = p2
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
    static degreeToRadian(degree: number) {
        return degree * (Math.PI / 180)
    }
    static radianToDegree(radian: number) {
        return radian * 180 / Math.PI
    }
    //       ^ 
    //      | \ 
    //      |  \
    //      |ang\
    //      |    \
    //      |     \
    //   a  |      \  c
    //      |       \
    //      |        \
    //      |         \
    //      |          \
    //      ------------ 
    //           b
    static generateToothPoints(options: IOptions) {
        const { pa, radius, ht, bw } = options
        const a = ht;
        const angle = Utility.degreeToRadian(pa);
        const c = a / Math.cos(angle);
        const b = c * Math.sin(angle);
        return [
            { x: bw, y: radius },
            { x: bw - b, y: radius + a },
            { x: -bw + b, y: radius + a },
            { x: -bw, y: radius },
        ]
    }

    static rotatePoint(_x: number, _y: number, angle: number) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const x = _x * cos - _y * sin;
        const y = _x * sin + _y * cos;
        return {
            x,
            y
        }
    }

    static getGearPairParameters = (gear1: Gear, gear2: Gear) => {
        console.log(gear1);
        console.log(gear2);
    }
}