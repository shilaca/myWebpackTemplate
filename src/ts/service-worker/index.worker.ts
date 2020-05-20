// declare let self: ServiceWorkerGlobalScope
declare let self: any

const ctx = self

// ctx.addEventListener('message', msg => console.log(msg.data))

export default {} as typeof Worker & (new () => Worker)
