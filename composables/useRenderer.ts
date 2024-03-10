import { Composite, Constraint, Engine, Mouse, MouseConstraint, Render, Runner, World } from "matter-js";

type RenderReturnType = {
    render: Render,
    runner: Runner,
    composite: Composite,
    engine: Engine,
    canvas: HTMLCanvasElement,
    stop: () => void
}

type Shapes = Body
    | Composite
    | Constraint
    | MouseConstraint
    | Array<Body | Composite | Constraint | MouseConstraint>;

const useRenderer = (bodies: Shapes, render: Render, engine: Engine): RenderReturnType => {

    World.add(engine.world, bodies)

    let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.3,
                render: {
                    visible: false
                }
            }
    });
    render.mouse = mouse;

    const shapes = [...bodies, mouseConstraint]

    let composite = Composite.add(engine.world, shapes);

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