import { createMutation } from "@farfetched/core";
import { runtypeContract } from "@farfetched/runtypes";
import { createEffect, createEvent, sample } from "effector";
import { Record, String } from "runtypes";
import { createGate } from "effector-react";
import { debug } from "patronum";

const Gate = createGate();

const Contract = Record({
    data: Record({
        greeting: String,
        imageUrl: String,
    }),
});

const fn = async () => {
    const response = await fetch('http://localhost:1488/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: 'query { greeting imageUrl }'
        }),
    }); 
    return response.json();
}

const effect = createEffect(fn);

const mutation = createMutation({
    effect,
    contract: runtypeContract(Contract),
});

const start = createEvent();

sample({
    clock: Gate.open,
    target: mutation.start,
});

debug(mutation.finished)

const model = {
    input: {
        Gate,
        start,
    },
}

export {
    model,
}
