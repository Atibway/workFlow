import {z} from "zod";

export type FieldErrors<T> = {
    [K in keyof T]?: string[]
};

export type ActionState<TInput, TOutput> = {
fieldError?: FieldErrors<TInput>;
error?: string | null;
data?: TOutput
}
export const  CreateSateActions = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput)=> Promise<ActionState<TInput, TOutput>>
) =>{
return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);

    if(!validationResult.success){
return {
    fieldError: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
}
    }

    return handler(validationResult.data);
}
}