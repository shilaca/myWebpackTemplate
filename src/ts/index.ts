import '../scss/style.scss'

import VertexShader from '../shader/main.vert'
import FragmentShader from '../shader/main.frag'

console.log('hello, world!')
console.log('vertex shader: ', VertexShader)
console.log('fragment shader: ', FragmentShader)

const echo = (msg: string): string => 'echo: ' + msg
echo('hello')

const numbers: number[] = [1, 2, 3, 4, 5]
numbers.forEach(num => console.log(num))
