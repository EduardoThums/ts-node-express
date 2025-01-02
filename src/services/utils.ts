export const isRunningInAws = (): boolean => {
    return process.env.LAMBDA_TASK_ROOT !== undefined
}
