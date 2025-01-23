"use state"

import { ActionState, FieldErrors } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";


type Action<TInput, TOutput>= (data: TOutput)=> Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
    onSuccess?: (data: TOutput)=> void;
    onError?: (error: string)=> void;
    onComplete?: ()=> void;
}

import { FieldValues } from "react-hook-form";

export const useAction = <TInput, TOutput>(
action: Action<TInput, TOutput>,
options: UseActionOptions<TOutput>={}
)=>{
const [fieldError, setFieldError] = useState<FieldErrors<TInput> | undefined>( undefined);

const [error, setError] = useState<string | undefined>(undefined)
const [data, setData] = useState<string | undefined>(undefined)
const [issLoading, setsetIsLoading] = useState<boolean>(false)

const execute = useCallback(async (input: TInput) => {
    setsetIsLoading(true);
    try {
        const result = await action(input);
        setData(result.data);
        options.onSuccess?.(result.data);
    } catch (err) {
        setError(err.message);
        options.onError?.(err.message);
    } finally {
        setsetIsLoading(false);
        options.onComplete?.();
    }
}, [action, options]);
}