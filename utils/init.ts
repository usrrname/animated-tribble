
let { Render, Engine } = constants;

const init = (element: HTMLElement | undefined, engine: typeof Engine) => {

    let options = {
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
        showAngleIndicator: true
    }
    let render = Render.create({
        element,
        engine,
        options
    });

    return render;
    
}

export default init