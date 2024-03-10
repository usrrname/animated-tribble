import { Composite, Engine, Render, Runner, World } from "matter-js";
import type { RenderReturnType, Shapes } from "~/types";

const useRenderer = (bodies: Shapes, render: Render, engine: Engine): RenderReturnType => {

    World.add(engine.world, bodies)

    let composite = Composite.add(engine.world, bodies);

    Render.run(render);

    let runner = Runner.create();
    Runner.run(runner, engine);
    
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        composite: composite,
        stop: function() {
            Render.stop(render);
            Runner.stop(runner);
        }
    };
} 

export default useRenderer;