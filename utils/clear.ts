import { Engine, Render, World } from 'matter-js';

const clear = (render: Render, world: World, engine: Engine) => {
    Render.stop(render);
    World.clear(world, false);
    Engine.clear(engine);
    render.canvas.remove()
    render.textures = {}
}

export default clear;