<template>
    <div ref='target' id="target">
        <svg class="svg-container"  >
            <g :transform="`scale(${scale})`" >
                <g :transform="`translate(${gearPosition.x},${gearPosition.y}) rotate(${gear1GroupRef})`">
                    <circle cx='0' cy='0' :r='rw1+1' fill='none' stroke='white'></circle>
                     <path 
                         class="gear1"
                         fill="#adaff728"
                         stroke="black"
                         strokeLinecap="round"
                         strokeWidth="3"
                         ref="gear1Ref"
                         @click="selectGear"
                     ></path>
                </g>
                <g class="kota-1" :transform="`translate(${gearPosition.x},${gearPosition.y})`">
                    <line :x1="-rw1" :y1="(rw1*1.5)+20" :x2="-rw1" :y2="(rw1*1.5)-20" stroke="black"/>
                    <line :x1="-rw1" :y1="(rw1*1.5)" :x2="+rw1" :y2="rw1*1.5" stroke="black"/>
                    <text :x="-30" :y="(rw1*1.5)-10" class="heavy">{{rw1}}</text>
                    <line :x1="+rw1" :y1="(rw1*1.5)+20" :x2="+rw1" :y2="(rw1*1.5)-20" stroke="black"/>
                </g>    
                <g :transform="`translate(${gearXoffset},${gearPosition.y}) rotate(${gear2GroupRef})`">
                    <circle cx='0' cy='0' :r='rw2' fill='none' stroke='white'></circle>
                     <path postcss-loader
                         class="gear2"
                         fill="#adaff728"
                         stroke="black"
                         strokeLinecap="round"
                         strokeWidth="3"
                         ref="gear2Ref"
                         @click="selectGear"
                     ></path>
                </g>
                <g class="kota-2" :transform="`translate(${gearXoffset},${gearPosition.y})`">
                    <line :x1="-rw2" :y1="(rw2*1.5)+20" :x2="-rw2" :y2="(rw2*1.5)-20" stroke="black"/>
                    <line :x1="-rw2" :y1="(rw2*1.5)" :x2="+rw2" :y2="rw2*1.5" stroke="black"/>
                    <text :x="-20" :y="(rw2*1.5)-10" class="heavy">{{rw2}}</text>
                    <line :x1="rw2" :y1="(rw2*1.5)+20" :x2="rw2" :y2="(rw2*1.5)-20" stroke="black"/>
                </g> 
                <g v-if="showDistance" class="a" >
                    <line :x1="gearPosition.x" :y1="gearPosition.y-20" :x2="gearPosition.x" :y2="gearPosition.y+20" stroke="black"/>
                    <line :x1="gearPosition.x" :y1="gearPosition.y" :x2="gearXoffset" :y2="gearPosition.y" stroke="black"/>
                    <text :x="(gearPosition.x + ((gearXoffset - gearPosition.x)/2)-30)" :y="gearPosition.y" class="heavy">{{rw2/2 + rw1/2}}</text>
                    <line :x1="gearXoffset" :y1="gearPosition.y-20" :x2="gearXoffset" :y2="gearPosition.y+20" stroke="black"/>
                </g>
            </g>
        </svg>
        <!-- border border-black border-solid -->
        <div class="bottomPanel fixed z-10 -bottom-0 flex text-white px-6 py-4">
                <div>
                    <label htmlFor="scaleSlider" class="text-white">Scale: {{scale}}</label>
                    <br/>
                    <input 
                        type="range" 
                        v-model="scale"
                        name="scaleSlider" 
                        id="scaleSlider" 
                        min='0.2'
                        max='2'
                        defaultValue='10'
                        @change="scaleRangeSliderHandler"
                        step="0.2"
                    />
                    <input min="0" v-model="scale" class="" type="number" name="scaleInput" @change="scaleRangeSliderHandler"  step="0.2">
                    <br />
                    <input
                        type="range"
                        v-model="gearSpeed"
                        name="speedSlider"
                        id="speedSlider"
                        min='1'
                        max='20'
                        @change="speedRangeSliderHandler"
                    />
                    <input min="0"  v-model="gearSpeed" class="" type="number" name="speedInput" @change="speedRangeSliderHandler"  >
                    <br />
                    <label htmlFor="rotation speed" class="text-white">Rotation Speed [ n ] : {{gearSpeeds}}</label>
                </div>
                <div class="flex flex-col p-1.5 text-white ml-6">
                        <h5>Transmission Gear Ratio  [ i ] = {{ i }}</h5>
                        <h5>module [ m1 ] = {{ m[0] }}</h5>
                        <h5>module [ m2 ] = {{ m[1] }}</h5>
                <div class="showDistanceCheckbox">
                        <label for="showDistanceCheckbox">Show Distance Checkbox</label>
                        <input v-model="showDistance" type="checkbox" name="showDistanceCheckbox" id="">
                </div>
                </div>
                <div  class="left-panel ml-6">
                    <form ref="gearForm">
                    <div class="flex">
                        <div class='inputContainer flex justify-between formElements text-white'>
                        <div class="formRow ">
                            <label htmlFor="" >z:</label>
                            <input v-model="z_inp" min='0' max='35' type="number" @change="changeGear" name="z" id="z"  />
                        </div>
                        <div class="formRow">
                            <label htmlFor="">pa:</label>
                            <input v-model="pa_inp" type="number" name="pa" id="pa"  @change="changeGear" />
                        </div>
                        <div class="formRow">
                            <label htmlFor="">bw:</label>
                            <input v-model="bw_inp" type="number" name="bw" id="bw"  @change="changeGear"  />  
                        </div>
                        <div class="formRow">
                            <label htmlFor="">hwp:</label>
                            <input v-model="hwp_inp" type="number" name="hwp" id="hwp" @change="changeGear" />
                        </div>
                        <!-- toggleDistance -->
                    </div>
                    <canvas id='canvas1' ref='canvasRef'  height="130" width="150"></canvas>
                    </div>
                    </form>
                </div>
            </div>
            
    </div>
</template>


<script lang='ts'>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';
import Gear from '../Utility/Gear';
import Utility from '../Utility/Utility';
export default {
    name:'Home',
        setup() {
        const gear1 = ref<Gear>();
        const gear2 = ref<Gear>();
        const gear1Ref = ref();
        const gear2Ref = ref();
        const gearSpeeds = ref('');
        const gearPosition = ref({x:300,y:300});
        const gearXoffset = ref(0)
        const ratio = ref<number>(0);
        const scale = ref<number>(0.8);
        const gear1GroupRef = ref(0);
        const gear2GroupRef = ref(0);
        const gearSpeed = ref(1);
        const i = ref()
        const m = ref<number[] | string[]>([])
        const gearForm = ref<any>();
        const canvasRef =ref<HTMLCanvasElement>()
        const z_inp =   ref<number>();
        const pa_inp =  ref<number>();
        const bw_inp =  ref<number>();
        const hwp_inp = ref<number>();
        const rw1 = ref<number>();
        const rw2 = ref<number>();
        const selectedColor:string = '#4fcbe06c';
        const unSelectedColor:string = '#adaff728';
        const showDistance = ref(true)

        const selectedGear = ref<string>('gear1');
        
        const toggleDistance = ()=> showDistance.value = !showDistance.value;

        const drawGear = async (target:any,gear:any) =>{
            const path = d3.select(target)
            let line = d3.line()
                .x((d:any) => d.x)
                .y((d:any) => d.y)
            let lineGenerator1 = line(gear.gearVertexArray);
            path.attr('d', lineGenerator1 + 'Z');
        }
        const speedRangeSliderHandler = ()=>{
            const speed = 10/gearSpeed.value;
            const speed2 = speed * ratio.value;            
            gear1Ref.value.style.animation = `spin ${speed}s linear infinite`
            gear2Ref.value.style.animation = `spin ${speed2}s linear infinite reverse`
            gearSpeeds.value = `Gear 1: 1/${(60/speed).toFixed(3)} [ 1/min ] Gear 2: 1/${(60/speed2).toFixed(3)} [ 1/min ]`;
        }
    
        const scaleRangeSliderHandler = (e:any)=> scale.value = e.target.value;
        const alignGears=()=>{
            if(gear1.value && gear2.value){
                gear1GroupRef.value = -90;
                gear2GroupRef.value = 90  + Utility.radianToDegree(gear2.value!.step/2);
            }
        }

         const drawToothOnCanvas = (_canvas:HTMLCanvasElement,gear:Gear)=>{
            const ctx = _canvas.getContext('2d');
            ctx!.setTransform(1, 0, 0, 1, _canvas.height / 2, _canvas.width / 2);
            ctx!.rotate(Math.PI);
            ctx!.clearRect(-_canvas.width, -_canvas.height, 10000,10000)
            ctx!.moveTo(gear.toothVertex[0].x, gear.toothVertex[0].y);    // Move the pen
            ctx!.beginPath(); // Start a new path
            ctx!.lineWidth = 3;
            ctx!.strokeStyle = 'white'
            gear.toothVertex.forEach((el:any) => {
                ctx!.lineTo(el.x, el.y-gear.r); 
            });            
            ctx!.stroke()
            return gear
        }

        const selectGear = (e:any)=> {
            if(typeof e !== 'string') {
                if(selectedGear.value ===e.target.classList[0].slice(0)) return;
                selectedGear.value =  e.target.classList[0].slice(0);
                gear1Ref.value.style.fill = unSelectedColor;
                gear2Ref.value.style.fill = unSelectedColor;
            }
            else selectedGear.value = e;
            if(selectedGear.value ==='gear1'){
                z_inp.value = gear1.value!.z
                pa_inp.value = gear1.value!.pa
                bw_inp.value = gear1.value!.bw
                hwp_inp.value = gear1.value!.hwp
                gear1Ref.value.style.fill = selectedColor;
                if(canvasRef.value && gear1.value) drawToothOnCanvas(canvasRef.value,gear1.value);
            }else{
                z_inp.value = gear2.value!.z
                pa_inp.value = gear2.value!.pa
                bw_inp.value = gear2.value!.bw
                hwp_inp.value = gear2.value!.hwp
                gear2Ref.value.style.fill = selectedColor;
                if(canvasRef.value && gear2.value) drawToothOnCanvas(canvasRef.value,gear2.value);
            }
        }; 
        
        const changeGear = ()=>{
            if(gear1.value && gear2.value){
                const gears:any = {
                    gear1:gear1.value,
                    gear2:gear2.value                    
                }
                const x:FormData = new FormData(gearForm.value);
                // @ts-ignore
                const data = Object.fromEntries(x);
                // @ts-ignore
                const z = parseInt(data.z);
                // @ts-ignore
                const pa = parseInt(data.pa);
                // @ts-ignore
                const hwp = parseInt(data.hwp);
                // @ts-ignore
                const bw = parseInt(data.bw);
                gears[selectedGear.value] = new Gear(z, pa, hwp, bw);
                if(selectedGear.value === 'gear1') {
                    gear1.value = gears[selectedGear.value];
                    rw1.value = gear1.value!.rw;
                    if(canvasRef.value && gear1.value) drawToothOnCanvas(canvasRef.value,gear1.value);
                }
                else  {
                    gear2.value = gears[selectedGear.value];
                    rw2.value = gear2.value!.rw;
                    if(canvasRef.value && gear2.value) drawToothOnCanvas(canvasRef.value,gear2.value);
                }
                gearPosition.value = {x:gear1.value!.rw+60,y:gear1.value!.rw+120};
                gearXoffset.value = gear1.value!.rw + gear2.value!.rw + gearPosition.value.x + 5
                drawGear(`.${selectedGear.value}`,gears[selectedGear.value]);
                alignGears();
                setTimeout(()=>{
                        ratio.value = 1/(gear1.value!.z/gear2.value!.z);
                        const speed = 10/gearSpeed.value;
                        const speed2 = ratio.value * speed;
                        gearSpeeds.value = `Gear 1: 1/${(60/speed).toFixed(3)} [ 1/min ] Gear 2: 1/${(60/speed2).toFixed(3)} [ 1/min ]`;
                        m.value = [(gear1.value!.rw/gear1.value!.z/10).toFixed(3),(gear2.value!.rw/gear2.value!.z/10).toFixed(3)];
                        i.value = (gear2.value!.z / gear1.value!.z).toFixed(3);
                        gear1Ref.value.style.animation = `spin ${speed}s linear infinite`;
                        gear2Ref.value.style.animation = `spin ${speed2}s linear infinite reverse`;
                },25);
            }
        }
        onMounted(()=>{
            gear1.value = new Gear(8,20,60,45);
            gear2.value = new Gear(8,20,60,45);
            gearPosition.value = {x:gear1.value.rw+60,y:gear1.value.rw+120}
            gearXoffset.value = gear1.value.rw + gear2.value.rw + gearPosition.value.x + 5;
            i.value = (gear2.value.z / gear1.value.z).toFixed(3);
            m.value = [(gear1.value.rw/gear1.value.z/10).toFixed(3),(gear2.value.rw/gear2.value.z/10).toFixed(3)];
            drawGear('.gear1',gear1.value);
            drawGear('.gear2',gear2.value);
            rw1.value = gear1.value.rw;
            rw2.value = gear2.value.rw;
            alignGears();
            setTimeout(()=>{
                if(gear1.value && gear2.value) ratio.value = 1/(gear1.value.z/gear2.value.z);
                const speed = 10/gearSpeed.value;
                const speed2 = ratio.value * speed;
                gearSpeeds.value = `Gear 1: 1/${(60/speed).toFixed(3)} [ 1/min ] Gear 2: 1/${(60/speed2).toFixed(3)} [ 1/min ]`;
                gear1Ref.value.style.animation = `spin ${speed}s linear infinite`;
                gear2Ref.value.style.animation = `spin ${speed2}s linear infinite reverse`;
                selectGear('gear1')
                console.log('test');
                
            },200);
            if(canvasRef.value && gear1.value) drawToothOnCanvas(canvasRef.value,gear1.value);
        })
        return{
            scaleRangeSliderHandler,
            speedRangeSliderHandler,
            toggleDistance,
            gear1GroupRef,
            gear2GroupRef,
            gearPosition,
            showDistance,
            gearXoffset,
            gearSpeeds,
            changeGear,
            selectGear,
            gearSpeed,
            canvasRef,
            gearForm,
            gear1Ref,
            gear2Ref,
            hwp_inp,
            pa_inp,
            bw_inp,
            z_inp,
            scale,
            rw1,
            rw2,
            i,
            m,
        }
    }
}
</script>
<style  src='./assets/styles/app.css' />




 