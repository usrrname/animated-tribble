<template>
    <button @click="() => onReset()">Clear</button>
    <button @click="() => onPause()">Pause</button>
    <span id="wrapper-canvas" @click="addCircle" @mousedown="handleMouseDown" @mouseup="handleMouseUp" ref="canvas"></span>
    
</template>

<script lang="ts" setup>
import type { CanvasProps } from '~/types';
let { Engine, World, Render, Bodies } = constants;

defineProps<CanvasProps>()

let engine = ref(Engine.create())
let canvasWrapper = ref<HTMLCanvasElement | undefined>()
let isMouseDown = ref(false)
let renderRef = ref<typeof Render | undefined>()

let renderOptions = {
        width: window.innerWidth,
        height: window.innerHeight,
        enabled: true,
        wireframes: false,
        pixelRatio: 1,
        background: '#fafafa',
        wireframeBackground: '#222',
        hasBounds: true,
        showDebug: true,
        showStats: true,
        showPerformance: true,
}
    
const handleMouseDown = (e: MouseEvent) => {
        isMouseDown.value = true
}
const handleMouseUp = () => {
        isMouseDown.value = false
}

onMounted(() => {
    const canvasWrapperElement = document.getElementById('wrapper-canvas');
    canvasWrapper.value = canvasWrapperElement as HTMLDivElement;

    renderRef.value = init(canvasWrapper?.value, engine.value, renderOptions)

    const shelfColor = getRandomColor()

    // Shapes 

    let boxA = Bodies.rectangle(240, 200, 100, 80);

    let boxB = Bodies.rectangle(450, 50, 80, 80);

    let polygonA = Bodies.polygon(100, 40, 8, 18);

    let shelfA = Bodies.rectangle(250, 300, 500, 30, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: shelfColor } });
    
    let shelfB = Bodies.rectangle(700, 500, 450, 30, { angle: Math.PI * 0.06, isStatic: true, render: { fillStyle: shelfColor } });
    
    let ground = Bodies.rectangle(500, 750, window.innerWidth, 40, { isStatic: true });

    const { mouseConstraint } = useMouseConstraint(renderRef.value, engine.value)
    
    const shapes = [polygonA, boxA, boxB, shelfA, shelfB, ground, mouseConstraint]

    let { stop, composite, render } = useRenderer(shapes, renderRef.value, engine.value)

    window.addEventListener('resize', () => {
        if (canvasWrapper.value) {
            canvasWrapper.value.width = window.innerWidth
            canvasWrapper.value.height = window.innerHeight
        }
    })
    window.resizeBy(window.innerWidth, window.innerHeight)
})

const onReset =() => {
    clear(renderRef?.value, engine.value.world, engine.value)
    init(canvasWrapper?.value, engine.value, renderOptions)
}

const onPause = () => {
    renderRef?.value?.stop(renderRef?.value);
}

const addCircle = (e: MouseEvent) => {
    if (e) {
      const ball = Bodies.circle( e.clientX, e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
            render: {
            fillStyle: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
            }
          }
      )
        World.add(engine.value.world, [ball])
        Engine.update(engine.value)
    }
  }
</script>

<style>
#wrapper-canvas {
    width: auto
}
#wrapper-canvas > canvas {
    display: flex;
    justify-content: center;
    position: relative;
    height: auto;
    background-color: #f0f0f0;
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}


</style>