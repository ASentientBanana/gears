import { IToothOptions, Vector2, PolarCoordinate, ITooth } from '../types/index';
import Utility from './Utility';

export default class Gear {
    z: number;
    toothVertex: any;
    step: number;
    gearVertexArray: any[] = [];
    r: number;
    rw: number;
    pa:number;
    hwp:number;
    bw:number;
    constructor(toothNumber: number, pa: number = 20, hwp: number = 60, base: number = 45) {
        this.z = toothNumber;
        this.step = 2 * Math.PI / toothNumber;
        const ht = hwp;
        const bw = base;
        const pitch = Math.PI * bw;
        const r = this.calculateRadius(toothNumber, pitch);
        this.r = r;
        this.toothVertex = Utility.generateToothPoints({
            ht,
            pa,
            radius: r,
            bw
        });
        this.step = 2 * Math.PI / toothNumber;
        this.generateGearVertex();
        this.rw = (ht / 2) + r;
        this.pa = pa;
        this.hwp = hwp;
        this.bw = base;
    }

    generateGearVertex() {
        for (let i = 0; i < this.z; i++) {
            for (let j = 0; j < 4; j++) {
                this.gearVertexArray.push(
                    Utility.rotatePoint(
                        this.toothVertex[j].x,
                        this.toothVertex[j].y,
                        this.step * i
                    ));
            }
        }
    }

    calculateRadius(z:number, pitch:number) {
        const circ = z * pitch
        return circ / (2 * Math.PI)
    }
}

