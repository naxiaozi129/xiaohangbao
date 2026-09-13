import { FALLBACK, QA_ITEMS, SAFETY_REPLY } from '../data/qa'
import type { Grade } from '../types'

const UNSAFE =
  /自杀|自残|杀人|伤害|爆炸物|炸弹|枪支|毒品|色情|黄赌毒|密码|身份证号|银行卡/

const SPACEISH =
  /星|月|日|太阳|地球|火|宇|航|飞|轨|卫|船|站|天|空|岩|冰|光|引力|重|失重|银河|彗|流星|陨|登月|发射|神舟|嫦娥|天宫|祝融|北斗|杨利伟/

function normalize(q: string) {
  return q.replace(/\s+/g, '').replace(/[？?！!。，,、]/g, '').toLowerCase()
}

function scoreItem(q: string, keys: string[]) {
  let score = 0
  for (const k of keys) {
    if (q.includes(k)) score += k.length >= 2 ? 2 : 1
  }
  return score
}

function trimByAge(text: string, grade: Grade, simple: boolean) {
  if (simple || grade <= 2) {
    const first = text.split(/[。！？]/)[0]
    return first ? `${first}。` : text
  }
  if (grade <= 4) return text
  return text
}

export function answerQuestion(raw: string, grade: Grade, simple: boolean): string {
  const q = raw.trim()
  if (!q) return '你先告诉我一个问题吧，比如：火箭为什么能飞？'

  if (UNSAFE.test(q)) return SAFETY_REPLY

  const nq = normalize(q)
  let best = QA_ITEMS[0]
  let bestScore = 0
  for (const item of QA_ITEMS) {
    const s = scoreItem(nq, item.keys)
    if (s > bestScore) {
      best = item
      bestScore = s
    }
  }

  if (bestScore < 2) {
    if (SPACEISH.test(q)) return FALLBACK
    return FALLBACK
  }

  const short = trimByAge(best.short, grade, simple)
  const analogy = trimByAge(best.analogy, grade, simple)
  const example = trimByAge(best.example, grade, simple)
  const follow = best.follow

  if (simple || grade <= 2) {
    return `${short}\n\n可以这样想：${analogy}\n\n${follow}`
  }

  if (grade <= 4) {
    return `${short}\n\n可以这样想：${analogy}\n\n举个例子：${example}\n\n${follow}`
  }

  return `${short}\n\n可以这样想：${analogy}\n\n举个例子：${example}\n\n小航宝还想接着聊：${follow}`
}
