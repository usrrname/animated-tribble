export type CanvasProps = {
    id?: string
    ref?: HTMLCanvasElement
    testId?: string
}

export type Shapes = Body | Composite | Constraint | MouseConstraint | Bodies | Array<Body | Composite | Constraint | MouseConstraint>;

export type RenderReturnType = {
    render: Render,
    runner: Runner,
    composite: Composite,
    engine: Engine,
    canvas: HTMLCanvasElement,
    stop: () => void
}
