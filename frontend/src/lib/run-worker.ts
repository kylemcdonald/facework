import Worker from "worker-loader!../workers/face-reader-worker"

const worker = new Worker()
worker.postMessage({ a: 1 })
