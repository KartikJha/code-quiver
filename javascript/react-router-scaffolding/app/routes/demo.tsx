import type { Route } from "./+types/demo";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Routing Demo" },
        { name: "description", content: "Welcome to Routing Demo!" },
    ];
}

export default function Demo() {
    return (
        <div>
            <h1>Routing Demo</h1>
        </div>
    );
}