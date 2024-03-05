import { createUniqueId } from 'solid-js';

export type RatingProps = {
    name: string;
};

export default function Rating(props: RatingProps) {
    const id = createUniqueId();

    return (
        <div class="grid">
            <label for={id}>Choose a comfortable temperature:</label>

            <input class="w-[200px]" type="range" id={id} name={props.name} list="values" step="25" />

            <datalist id="values" class="flex flex-col justify-between [writing-mode:vertical-lr] w-[200px]">
                <option class="p-0" value="0" label="very cold!" />
                <option class="p-0" value="25" label="cool" />
                <option class="p-0" value="50" label="medium" />
                <option class="p-0" value="75" label="getting warm!" />
                <option class="p-0" value="100" label="hot!" />
            </datalist>
        </div>
    );
}
