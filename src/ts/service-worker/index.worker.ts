export default {} as typeof Worker & (new () => Worker)

const ctx = globalThis

ctx.addEventListener('message', msg => console.log(msg.data))
