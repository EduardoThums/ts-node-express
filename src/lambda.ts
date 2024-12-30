// lambda.js
// require('source-map-support/register')
import serverlessExpress from '@codegenie/serverless-express'
import { createApp } from './app'

let serverlessExpressInstance

// function asyncTask() {
//     return new Promise((resolve) => {
//         console.log('before await')
//         setTimeout(() => {
//             console.log('after await')

//             return resolve('connected to database')
//         }, 3000)
//         // console.log('after await')
//     })
// }

async function setup(event, context) {
    const app = await createApp() // func para criar o app
    // console.log('after asyncTask')
    // console.log(asyncValue)
    serverlessExpressInstance = serverlessExpress({ app })
    return serverlessExpressInstance(event, context)
}

export function handler(event, context) {
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

    return setup(event, context)
}

// export handler