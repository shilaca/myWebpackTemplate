// declare let self: DedicatedWorkerGlobalScope
declare let self: any

const ctx: Worker = self

ctx.addEventListener('message', msg => console.log(msg.data))

export default {} as typeof Worker & (new () => Worker)
