import type { IRenderDefinition } from "matter-js";

let { Render, Engine } = constants;

const init = (element: HTMLElement | undefined, engine: typeof Engine, options: IRenderDefinition) => {

    let render = Render.create({
        element,
        engine,
        options
    });
    return render;
}

export default init