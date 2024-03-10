<template>
    <span id="wrapper-canvas"
    @click="addCircle" 
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"></span>
<button @click="() => onReset()">Clear</button>
<button @click="() => onPause()">Pause</button>
    
</template>

<script lang="ts" setup>

let { Engine, World, Render, Bodies } = constants;

type CanvasProps = {
    id?: string
    ref?: HTMLCanvasElement
    testId?: string
}

defineProps<CanvasProps>()

let engine = ref(Engine.create())
let canvas = ref<HTMLCanvasElement | null>(null)
let isMouseDown = ref(false)
let renderRef = ref<typeof Render | null>(null)

const handleMouseDown = (e: MouseEvent) => {
        isMouseDown.value = true
}
const handleMouseUp = () => {
        isMouseDown.value = false
}

onMounted(() => {
    const canvasWrapper = document.getElementById('wrapper-canvas');
    canvas.value = canvasWrapper
    renderRef.value = init(canvas?.value, engine.value)

    const shelfColor = getRandomColor()

    // Shapes 

    let boxA = Bodies.rectangle(240, 200, 100, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80);

    let polygonA = Bodies.polygon(100, 40, 8, 18);

    let shelfA = Bodies.rectangle(250, 300, 500, 30, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: shelfColor } });
    
    let shelfB = Bodies.rectangle(700, 500, 450, 30, { angle: Math.PI * 0.06, isStatic: true, render: { fillStyle: shelfColor } });
    
    let ground = Bodies.rectangle(500, 750, window.innerWidth, 40, { isStatic: true });

    const shapes = [polygonA, boxA, boxB, shelfA, shelfB, ground]

    let { stop, composite, render } = useRenderer(shapes, renderRef.value, engine.value)

    window.addEventListener('resize', () => {
        if (canvas.value) {
            canvas.value.width = window.innerWidth
            canvas.value.height = window.innerHeight
        }
    })
    window.resizeBy(window.innerWidth, window.innerHeight)
})

const onReset =() => {
    clear(renderRef?.value, engine.value.world, engine.value)
}

const onPause = () => {
    renderRef?.value?.stop();
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