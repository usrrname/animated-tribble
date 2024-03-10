import { Engine, Mouse, MouseConstraint, Render, World } from "matter-js";

const useMouseConstraint = (render: Render, engine: Engine) => {
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

    World.add(engine.world, mouseConstraint);

    return {
        render,
        mouse,
        mouseConstraint
    }
}

export default useMouseConstraint;