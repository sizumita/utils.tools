import type { QRL } from "@builder.io/qwik";

type InputFile = {
    name: string;
    url: string;
};

export type PreviewProps = {
    inputFiles: InputFile[];
    onRemove$: QRL<() => void>;
};
