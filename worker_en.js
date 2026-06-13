/* ════════════════════════════════════════════════════════
   ZEUS AI ORACLE ENGINE — ENGLISH WORKER (worker_en.js)
   KV binding: ORACLE_KV (added 2026-05-29)
   Domains: Stock + Fortune
   Single export default. Cleaned & de-duplicated.
   ════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════
   CARD SCORE TABLE (78 cards)
════════════════════════════════════════ */
const CARD_SCORE = {
  "The Fool": 2, "The Magician": 3, "The High Priestess": 1, "The Empress": 3,
  "The Emperor": 2, "The Hierophant": 1, "The Lovers": 2, "The Chariot": 3,
  "Strength": 2, "The Hermit": -1, "Wheel of Fortune": 5, "Justice": 1,
  "The Hanged Man": -4, "Death": -2, "Temperance": 1, "The Devil": -5,
  "The Tower": -6, "The Star": 5, "The Moon": -3, "The Sun": 6,
  "Judgement": 4, "The World": 6,
  "Ace of Pentacles": 4, "Two of Pentacles": 1, "Three of Pentacles": 2,
  "Four of Pentacles": -1, "Five of Pentacles": -4, "Six of Pentacles": 2,
  "Seven of Pentacles": 1, "Eight of Pentacles": 2, "Nine of Pentacles": 3,
  "Ten of Pentacles": 5,
  "Ace of Swords": 3, "Two of Swords": -1, "Three of Swords": -3,
  "Four of Swords": 0, "Five of Swords": -2, "Six of Swords": 1,
  "Seven of Swords": -3, "Eight of Swords": -2, "Nine of Swords": -4,
  "Ten of Swords": -6,
  "Ace of Cups": 2, "Two of Cups": 2, "Three of Cups": 2, "Four of Cups": -1,
  "Five of Cups": -2, "Six of Cups": 1, "Seven of Cups": -2, "Eight of Cups": -1,
  "Nine of Cups": 3, "Ten of Cups": 4,
  "Ace of Wands": 3, "Two of Wands": 2, "Three of Wands": 3, "Four of Wands": 2,
  "Five of Wands": -1, "Six of Wands": 4, "Seven of Wands": 1, "Eight of Wands": 4,
  "Nine of Wands": 0, "Ten of Wands": -2,
  "Page of Wands": 1, "Knight of Wands": 3, "Queen of Wands": 2, "King of Wands": 3,
  "Page of Cups": 1, "Knight of Cups": 2, "Queen of Cups": 2, "King of Cups": 2,
  "Page of Swords": -1, "Knight of Swords": 2, "Queen of Swords": 1, "King of Swords": 2,
  "Page of Pentacles": 1, "Knight of Pentacles": 1, "Queen of Pentacles": 2, "King of Pentacles": 3
};

/* ════════════════════════════════════════
   CARD_SCORE_MULTI — 4D numeric table (subset)
════════════════════════════════════════ */
const CARD_SCORE_MULTI = {
  "The Fool":          { base: 60, love: 70, risk: 65, vol: 70, attachment: 40, communication: 60, reconciliation: 50, instability: 70, obsession: 30, emotionalDepth: 45 },
  "The Magician":      { base: 80, love: 75, risk: 55, vol: 60, attachment: 65, communication: 85, reconciliation: 60, instability: 35, obsession: 40, emotionalDepth: 70 },
  "The High Priestess":{ base: 65, love: 60, risk: 70, vol: 50, attachment: 55, communication: 25, reconciliation: 50, instability: 45, obsession: 35, emotionalDepth: 90 },
  "The Empress":       { base: 90, love: 95, risk: 40, vol: 40, attachment: 90, communication: 80, reconciliation: 85, instability: 20, obsession: 30, emotionalDepth: 90 },
  "The Emperor":       { base: 85, love: 70, risk: 45, vol: 50, attachment: 60, communication: 45, reconciliation: 50, instability: 25, obsession: 35, emotionalDepth: 50 },
  "The Lovers":        { base: 85, love: 95, risk: 40, vol: 50, attachment: 95, communication: 80, reconciliation: 90, instability: 30, obsession: 40, emotionalDepth: 95 },
  "The Hermit":        { base: 40, love: 35, risk: 80, vol: 30, attachment: 25, communication: 10, reconciliation: 20, instability: 60, obsession: 15, emotionalDepth: 80 },
  "The Moon":          { base: 30, love: 40, risk: 90, vol: 70, attachment: 70, communication: 20, reconciliation: 40, instability: 90, obsession: 75, emotionalDepth: 95 },
  "The Star":          { base: 90, love: 90, risk: 35, vol: 40, attachment: 70, communication: 75, reconciliation: 95, instability: 15, obsession: 20, emotionalDepth: 85 },
  "The Sun":           { base: 95, love: 95, risk: 30, vol: 50, attachment: 85, communication: 95, reconciliation: 95, instability: 10, obsession: 20, emotionalDepth: 80 },
  "The Devil":         { base: 30, love: 80, risk: 95, vol: 90, attachment: 98, communication: 20, reconciliation: 75, instability: 95, obsession: 100, emotionalDepth: 80 },
  "The Tower":         { base: 20, love: 15, risk: 100, vol: 100, attachment: 10, communication: 5, reconciliation: 10, instability: 100, obsession: 20, emotionalDepth: 70 },
  "Ten of Swords":     { base: 10, love: 20, risk: 95, vol: 90, attachment: 15, communication: 5, reconciliation: 5, instability: 95, obsession: 40, emotionalDepth: 75 },
  "Nine of Swords":    { base: 20, love: 25, risk: 90, vol: 80, attachment: 50, communication: 15, reconciliation: 20, instability: 90, obsession: 65, emotionalDepth: 85 },
  "Three of Wands":    { base: 75, love: 70, risk: 55, vol: 60, attachment: 55, communication: 70, reconciliation: 65, instability: 35, obsession: 25, emotionalDepth: 60 },
  "Ace of Pentacles":  { base: 85, love: 65, risk: 45, vol: 55, attachment: 60, communication: 55, reconciliation: 60, instability: 25, obsession: 20, emotionalDepth: 55 },
  "Queen of Wands":    { base: 80, love: 85, risk: 50, vol: 65, attachment: 75, communication: 85, reconciliation: 70, instability: 35, obsession: 30, emotionalDepth: 75 },
  "Six of Cups":       { base: 65, love: 80, risk: 55, vol: 45, attachment: 90, communication: 65, reconciliation: 98, instability: 30, obsession: 45, emotionalDepth: 90 }
};

function calcScore(cardNames, key) {
  if (!cardNames || !cardNames.length) return 50;
  let sum = 0, count = 0;
  cardNames.forEach(name => {
    const entry = CARD_SCORE_MULTI[name];
    if (!entry) return;
    sum += entry[key] ?? 50;
    count++;
  });
  return count > 0 ? Math.round(sum / count) : 50;
}

/* ════════════════════════════════════════
   RELATIONSHIP ENGINE
════════════════════════════════════════ */
function analyzeRelationship(cardNames = []) {
  const attachment      = calcScore(cardNames, "attachment");
  const communication   = calcScore(cardNames, "communication");
  const reconciliation  = calcScore(cardNames, "reconciliation");
  const instability     = calcScore(cardNames, "instability");
  const obsession       = calcScore(cardNames, "obsession");
  const emotionalDepth  = calcScore(cardNames, "emotionalDepth");

  let relationshipType = "neutral";
  if (obsession >= 80 && instability >= 70) relationshipType = "obsessive";
  else if (attachment >= 80 && emotionalDepth >= 80) relationshipType = "soulmate";
  else if (communication <= 20 && attachment >= 50) relationshipType = "silent-withdrawal";
  else if (reconciliation <= 20 && instability >= 80) relationshipType = "collapse";
  else if (instability <= 30 && attachment >= 60) relationshipType = "stable";

  return {
    relationshipType, attachment, communication, reconciliation,
    instability, obsession, emotionalDepth,
    emotionalIntensity: Math.round((attachment + obsession + emotionalDepth) / 3)
  };
}

/* ════════════════════════════════════════
   CARD_MEANING (flow / signal / deep)
════════════════════════════════════════ */
const CARD_MEANING = {
  "The Fool": { flow: "new beginnings / impulsive entry", signal: "early entry energy present — risk awareness low" },
  "The Magician": { flow: "will / execution", signal: "strong execution energy — prepared entry timing" },
  "The High Priestess": { flow: "inner intuition / waiting", signal: "observation favored over hasty entry" },
  "The Empress": { flow: "growth / abundance", signal: "positive growth flow — mid/long-term hold favorable" },
  "The Emperor": { flow: "stability / control", signal: "solid structure — stable flow maintained" },
  "The Hierophant": { flow: "tradition / conservative", signal: "stick to existing strategy — low-volatility zone" },
  "The Lovers": { flow: "crossroads of choice", signal: "a decision point on whether to enter" },
  "The Chariot": { flow: "advance / breakthrough", signal: "strong upward breakout energy detected" },
  "Strength": { flow: "patience / persistence", signal: "ignore short-term noise — mid-term hold energy" },
  "The Hermit": { flow: "solitude / inner search", signal: "stand aside — refrain from hasty entry" },
  "Wheel of Fortune": { flow: "cycle / turning point", signal: "trend reversal signal — watch direction" },
  "Justice": { flow: "balance / fair outcome", signal: "risk/reward balance — neutral zone" },
  "The Hanged Man": { flow: "stagnation / shift of view", signal: "temporary pause — possible reversal after waiting", deep: "the pause is not retreat but a time to gain a new perspective — patience invites insight" },
  "Death": { flow: "ending / new beginning", signal: "close existing position, prepare for transition", deep: "an ending is another name for a beginning — release the old to let new flow in" },
  "Temperance": { flow: "moderation / balance", signal: "avoid over-allocation — diversified approach" },
  "The Devil": { flow: "obsession / downside trap", signal: "loss-fixation risk — avoid emotional reaction", deep: "recognizing the chains is the start of freedom — awareness releases the grip" },
  "The Tower": { flow: "collapse / sudden change", signal: "crash risk — review holdings urgently", deep: "purification of a false structure — what collapses was never real / after the shock, truth surfaces and a new foundation can form" },
  "The Star": { flow: "hope / recovery", signal: "bottom-passing signal — rebound energy detected" },
  "The Moon": { flow: "uncertainty / illusion", signal: "information unclear — avoid hasty judgment", deep: "the fog will lift — when you cannot see, trust your intuition" },
  "The Sun": { flow: "success / clarity", signal: "strong upward conviction — active flow" },
  "Judgement": { flow: "awakening / reassessment", signal: "time to re-examine positions — new flow begins" },
  "The World": { flow: "completion / integration", signal: "goal-achievement energy — consider taking profit" },

  "Ace of Wands": { flow: "passion / fresh start", signal: "rebound attempt — early upward trigger possible" },
  "Two of Wands": { flow: "planning / observation", signal: "broaden the view before entry — strategy stage" },
  "Three of Wands": { flow: "expansion / far sight", signal: "mid/long-term flow positive — long position fit" },
  "Four of Wands": { flow: "stability / celebration", signal: "short-term goal reached — check profit timing" },
  "Five of Wands": { flow: "competition / chaos", signal: "volatility widening — direction unclear" },
  "Six of Wands": { flow: "victory / recognition", signal: "upward momentum maintained — trend-following favored" },
  "Seven of Wands": { flow: "resistance / defense", signal: "strong selling resistance amid an uptrend attempt" },
  "Eight of Wands": { flow: "speed / rapid move", signal: "rapid acceleration — fast entry/exit needed" },
  "Nine of Wands": { flow: "vigilance / last stand", signal: "upward fatigue — final resistance zone" },
  "Ten of Wands": { flow: "overload / burden", signal: "overheated zone — consider profit or reduction" },
  "Page of Wands": { flow: "curiosity / exploration", signal: "exploring new opportunity — small test zone" },
  "Knight of Wands": { flow: "charge / radical action", signal: "strong momentum — beware short-term overheating" },
  "Queen of Wands": { flow: "confidence / command", signal: "conviction entry zone — mid-term upward energy" },
  "King of Wands": { flow: "leadership / firm direction", signal: "clear uptrend — long-hold signal" },

  "Ace of Cups": { flow: "emotion / new flow", signal: "positive shift — beware emotional excess" },
  "Two of Cups": { flow: "harmony / connection", signal: "balanced entry — partnership energy" },
  "Three of Cups": { flow: "celebration / fruition", signal: "short-term gain reached — profit-taking zone" },
  "Four of Cups": { flow: "apathy / disinterest", signal: "attention waning — beware overlooked opportunity" },
  "Five of Cups": { flow: "loss / regret", signal: "beware loss-fixation — re-assess remaining opportunity" },
  "Six of Cups": { flow: "nostalgia / reminiscence", signal: "repeating past patterns — new strategy needed" },
  "Seven of Cups": { flow: "illusion / too many choices", signal: "too many options — need to focus" },
  "Eight of Cups": { flow: "departure / new path", signal: "wind down existing position — transition timing" },
  "Nine of Cups": { flow: "satisfaction / achievement", signal: "near goal — check profit timing" },
  "Ten of Cups": { flow: "completion / abundance", signal: "long-hold stability — peak zone" },
  "Page of Cups": { flow: "intuition / new idea", signal: "emotional entry — verify the logic" },
  "Knight of Cups": { flow: "proposal / temptation", signal: "attractive opportunity — verify if illusion" },
  "Queen of Cups": { flow: "empathy / deep insight", signal: "delicate timing sense — use intuition" },
  "King of Cups": { flow: "emotional control / stability", signal: "stay composed — long-term view favorable" },

  "Ace of Swords": { flow: "clarity / breakthrough", signal: "direction confirmed — decision needed" },
  "Two of Swords": { flow: "deferred decision / deadlock", signal: "conflicting info — decision delay unavoidable" },
  "Three of Swords": { flow: "pain / acknowledging loss", signal: "accept short-term loss — restructure position" },
  "Four of Swords": { flow: "rest / recovery", signal: "observation zone — re-enter after recovery" },
  "Five of Swords": { flow: "division / war of attrition", signal: "avoid needless trades — conserve energy" },
  "Six of Swords": { flow: "transition / move", signal: "depart existing strategy — prepare new flow" },
  "Seven of Swords": { flow: "deception / evasion", signal: "beware distorted info — careful verification" },
  "Eight of Swords": { flow: "restriction / blocked view", signal: "limited judgment — no hasty entry" },
  "Nine of Swords": { flow: "anxiety / nightmare", signal: "excess fear — need cool judgment" },
  "Ten of Swords": { flow: "worst / bottom", signal: "max downside energy — no new entry" },
  "Page of Swords": { flow: "info gathering / vigilance", signal: "intensify data gathering — observation zone" },
  "Knight of Swords": { flow: "radical / hasty", signal: "aggressive entry energy — risk expansion" },
  "Queen of Swords": { flow: "cool / analytical", signal: "objective judgment dominant — strategic entry" },
  "King of Swords": { flow: "authority / firm decision", signal: "clear direction set — long-term strategy valid" },

  "Ace of Pentacles": { flow: "material new start", signal: "real gain energy — good entry timing" },
  "Two of Pentacles": { flow: "balance / managing volatility", signal: "balance amid volatility — staged entry favored" },
  "Three of Pentacles": { flow: "collaboration / skill", signal: "mid-term value accrual — stable hold" },
  "Four of Pentacles": { flow: "conservative / clinging", signal: "over-defense — beware lack of flexibility" },
  "Five of Pentacles": { flow: "weak supply / shrinking sentiment", signal: "observation zone — bottom unconfirmed" },
  "Six of Pentacles": { flow: "distribution / exchange", signal: "profit-distribution zone — good for rebalancing" },
  "Seven of Pentacles": { flow: "patience / mid checkpoint", signal: "mid-hold review — maintain strategy" },
  "Eight of Pentacles": { flow: "mastery / repetition", signal: "steady accrual — long entry valid" },
  "Nine of Pentacles": { flow: "independence / fruition", signal: "stable profit zone — preserve assets" },
  "Ten of Pentacles": { flow: "long-term abundance", signal: "long-hold energy dominant" },
  "Page of Pentacles": { flow: "learning / experiment", signal: "small test entry — form long-term view" },
  "Knight of Pentacles": { flow: "steadiness / persistence", signal: "slow but sure flow — long-term favorable" },
  "Queen of Pentacles": { flow: "practical / abundance mgmt", signal: "stable profit-management zone" },
  "King of Pentacles": { flow: "wealth / sure results", signal: "strong financial energy — mid/long hold signal" }
};
function cardMeaning(cleanName) {
  return CARD_MEANING[cleanName] || { flow: "energy in flux", signal: "watch direction" };
}

/* ════════════════════════════════════════
   CARD_DECISION_MAP — 78 cards BUY/HOLD/SELL
════════════════════════════════════════ */
const CARD_DECISION_MAP = {
  "The Magician": "BUY", "The Empress": "BUY", "The Emperor": "BUY", "The Sun": "BUY",
  "The World": "BUY", "Strength": "BUY", "The Star": "BUY",
  "The Fool": "HOLD", "The Lovers": "HOLD", "Temperance": "HOLD", "Justice": "HOLD",
  "Wheel of Fortune": "HOLD", "The Hierophant": "HOLD", "The Chariot": "HOLD",
  "The High Priestess": "SELL", "The Hermit": "SELL", "The Hanged Man": "SELL",
  "Death": "SELL", "The Devil": "SELL", "The Tower": "SELL", "Judgement": "SELL", "The Moon": "SELL",

  "Ace of Wands": "BUY", "Two of Wands": "HOLD", "Three of Wands": "BUY", "Four of Wands": "HOLD",
  "Five of Wands": "SELL", "Six of Wands": "BUY", "Seven of Wands": "SELL", "Eight of Wands": "BUY",
  "Nine of Wands": "SELL", "Ten of Wands": "SELL", "Page of Wands": "HOLD", "Knight of Wands": "HOLD",
  "Queen of Wands": "BUY", "King of Wands": "BUY",

  "Ace of Cups": "BUY", "Two of Cups": "BUY", "Three of Cups": "BUY", "Four of Cups": "HOLD",
  "Five of Cups": "SELL", "Six of Cups": "HOLD", "Seven of Cups": "SELL", "Eight of Cups": "SELL",
  "Nine of Cups": "BUY", "Ten of Cups": "BUY", "Page of Cups": "HOLD", "Knight of Cups": "SELL",
  "Queen of Cups": "HOLD", "King of Cups": "HOLD",

  "Ace of Swords": "BUY", "Two of Swords": "HOLD", "Three of Swords": "HOLD", "Four of Swords": "HOLD",
  "Five of Swords": "SELL", "Six of Swords": "BUY", "Seven of Swords": "SELL", "Eight of Swords": "SELL",
  "Nine of Swords": "SELL", "Ten of Swords": "SELL", "Page of Swords": "HOLD", "Knight of Swords": "HOLD",
  "Queen of Swords": "SELL", "King of Swords": "SELL",

  "Ace of Pentacles": "BUY", "Two of Pentacles": "HOLD", "Three of Pentacles": "BUY", "Four of Pentacles": "HOLD",
  "Five of Pentacles": "SELL", "Six of Pentacles": "BUY", "Seven of Pentacles": "SELL", "Eight of Pentacles": "SELL",
  "Nine of Pentacles": "BUY", "Ten of Pentacles": "BUY", "Page of Pentacles": "HOLD", "Knight of Pentacles": "HOLD",
  "Queen of Pentacles": "BUY", "King of Pentacles": "BUY"
};

const HOLD_REV_TO_BUY = new Set([
  "The Hanged Man", "The Hermit", "Four of Cups", "Five of Pentacles",
  "Eight of Swords", "Three of Swords", "Nine of Swords", "Ten of Swords", "Five of Cups"
]);

function getFinalDecision(card, isReversed) {
  const base = CARD_DECISION_MAP[card] || "HOLD";
  if (!isReversed) return base;
  if (base === "BUY") return "HOLD";
  if (base === "SELL") {
    if (HOLD_REV_TO_BUY.has(card)) return "BUY";
    return "SELL";
  }
  return "SELL";
}

/* ════════════════════════════════════════
   CARD_FLAVOR (upright)
════════════════════════════════════════ */
const CARD_FLAVOR = {
  "The Fool": "a reckless leap into a new beginning",
  "The Magician": "execution energy taking the initiative",
  "The High Priestess": "a phase relying on inner intuition",
  "The Empress": "a flow of stable abundance and growth",
  "The Emperor": "a time when structure and order come first",
  "The Hierophant": "a time of tradition and conservative approach",
  "The Lovers": "a moment of decision at a crossroads",
  "The Chariot": "breakthrough energy of strong drive",
  "Strength": "the inner force of patience and persistence",
  "The Hermit": "solitary reflection and external shutdown",
  "Wheel of Fortune": "a flow standing at a turning point of fate",
  "Justice": "a zone of balance and fair outcome",
  "The Hanged Man": "a forced pause securing a new perspective",
  "Death": "the closing of an old flow and a transition",
  "Temperance": "a diversified approach of moderation and harmony",
  "The Devil": "the trap of obsession and the moment of freedom",
  "The Tower": "the purifying shock of a false structure",
  "The Star": "hope of recovery after passing the bottom",
  "The Moon": "reliance on intuition amid an uncertain fog",
  "The Sun": "the radiant energy of clear success",
  "Judgement": "the call of awakening and reassessment",
  "The World": "the completion energy of a goal achieved",

  "Ace of Wands": "the starting energy of fresh drive",
  "Two of Wands": "a careful search of expansion plans",
  "Three of Wands": "the arrival of results after waiting",
  "Four of Wands": "a zone of stable celebration and rest",
  "Five of Wands": "the midst of chaotic competition",
  "Six of Wands": "a victory zone of recognized achievement",
  "Seven of Wands": "the limit point of defensive pressure",
  "Eight of Wands": "the speed acceleration of a rapid move",
  "Nine of Wands": "an exhausted final step",
  "Ten of Wands": "the limit of an overweight burden",
  "Page of Wands": "the early stage of passionate exploration",
  "Knight of Wands": "the danger of a hasty charge",
  "Queen of Wands": "confident command",
  "King of Wands": "leadership and firm direction",

  "Ace of Cups": "the pure beginning of a new emotion",
  "Two of Cups": "the balance and agreement of a relationship",
  "Three of Cups": "the shared joy of success and celebration",
  "Four of Cups": "an apathy zone of ignored opportunity",
  "Five of Cups": "the sorrow of loss and remaining value",
  "Six of Cups": "the warm reminiscence of past nostalgia",
  "Seven of Cups": "a confusing zone of too many choices",
  "Eight of Cups": "the decision to leave a stagnant place",
  "Nine of Cups": "an achievement zone of inner satisfaction",
  "Ten of Cups": "the completion flow of full emotion",
  "Page of Cups": "the arrival of an emotional message",
  "Knight of Cups": "the illusion risk of an ideal proposal",
  "Queen of Cups": "the depth of empathy and intuition",
  "King of Cups": "the maturity of emotional control",

  "Ace of Swords": "the breakthrough of clear truth",
  "Two of Swords": "the balance point of a deferred decision",
  "Three of Swords": "facing a painful truth",
  "Four of Swords": "a rest zone for recovery",
  "Five of Swords": "a hollow victory after conflict",
  "Six of Swords": "a transition leaving difficulty behind",
  "Seven of Swords": "the risk of a cunning evasion",
  "Eight of Swords": "self-made restriction",
  "Nine of Swords": "nightmarish anxiety and worry",
  "Ten of Swords": "the bottom zone of passing the worst",
  "Page of Swords": "the curiosity of information search",
  "Knight of Swords": "the risk of a hasty charge",
  "Queen of Swords": "the detachment of cool judgment",
  "King of Swords": "the weight of authoritative decision",

  "Ace of Pentacles": "the start of a material opportunity",
  "Two of Pentacles": "the skill of balanced management",
  "Three of Pentacles": "the recognition of collaboration and results",
  "Four of Pentacles": "the stagnation risk of clinging to stability",
  "Five of Pentacles": "a period of material lack",
  "Six of Pentacles": "the flow of fair distribution",
  "Seven of Pentacles": "the point of patience after effort",
  "Eight of Pentacles": "the focus of craftsmanship",
  "Nine of Pentacles": "the satisfaction of independent abundance",
  "Ten of Pentacles": "the legacy flow of long-term stability",
  "Page of Pentacles": "the early stage of learning and growth",
  "Knight of Pentacles": "the safe progress of steadiness",
  "Queen of Pentacles": "the stability of practical abundance",
  "King of Pentacles": "the authority of financial success"
};

/* ════════════════════════════════════════
   CARD_FLAVOR_REVERSED
════════════════════════════════════════ */
const CARD_FLAVOR_REVERSED = {
  "The Fool": "the failure and regret of a reckless leap",
  "The Magician": "loss of initiative and lack of execution",
  "The High Priestess": "blocked intuition and confused stagnation",
  "The Empress": "growth stagnation and lack of abundance",
  "The Emperor": "structural breakdown and weakened authority",
  "The Hierophant": "rejection of tradition and norm deviation",
  "The Lovers": "avoidance of choice and conflict of mismatch",
  "The Chariot": "weakened drive and direction confusion",
  "Strength": "the limit of patience and loss of control",
  "The Hermit": "the end of solitude and external exposure",
  "Wheel of Fortune": "fate stagnation and delayed transition",
  "Justice": "an unfair outcome and broken balance",
  "The Hanged Man": "the end of stagnation and a sign of new start",
  "Death": "refusal of change and delayed closure",
  "Temperance": "broken harmony and extreme choice",
  "The Devil": "a time of release free from obsession",
  "The Tower": "avoidance of shock and delayed facing of truth",
  "The Star": "weakened hope and delayed recovery",
  "The Moon": "the fog lifting and truth surfacing",
  "The Sun": "delayed success and dimmed light",
  "Judgement": "refusal of awakening and avoided reassessment",
  "The World": "delayed completion and unfinished close",

  "Ace of Wands": "lack of drive and hesitation to start",
  "Two of Wands": "stagnant expansion plan and deferred decision",
  "Three of Wands": "delayed results and frustrated waiting",
  "Four of Wands": "weakened celebration and shaken stability",
  "Five of Wands": "the end of conflict and chance of cooperation",
  "Six of Wands": "delayed and frustrated recognition",
  "Seven of Wands": "abandoned defense and lost position",
  "Eight of Wands": "slowed speed and delayed development",
  "Nine of Wands": "a recovery signal of breaking the limit",
  "Ten of Wands": "relief of burden and putting down the load",
  "Page of Wands": "delayed exploration and weakened motivation",
  "Knight of Wands": "regret of haste and pace adjustment",
  "Queen of Wands": "weakened confidence and lost command",
  "King of Wands": "shaken leadership and confused direction",

  "Ace of Cups": "blocked emotion and hesitation to start anew",
  "Two of Cups": "broken relationship balance and failed agreement",
  "Three of Cups": "severed celebration and weakened rapport",
  "Four of Cups": "the end of apathy and recognition of opportunity",
  "Five of Cups": "recovery from loss and rediscovery of value",
  "Six of Cups": "the end of clinging to the past and facing the present",
  "Seven of Cups": "awakening from illusion and recognizing reality",
  "Eight of Cups": "deferred parting and staying in a stagnant place",
  "Nine of Cups": "weakened satisfaction and emptiness",
  "Ten of Cups": "a crack in emotional fullness and family conflict",
  "Page of Cups": "a blocked emotional message",
  "Knight of Cups": "awakening from an ideal illusion",
  "Queen of Cups": "weakened empathy and formed distance",
  "King of Cups": "failed emotional control and risk of outburst",

  "Ace of Swords": "blocked truth and delayed decision",
  "Two of Swords": "avoided decision and broken balance",
  "Three of Swords": "recovery from a wound and start of healing",
  "Four of Swords": "the end of rest and resumed activity",
  "Five of Swords": "the end of conflict and chance of reconciliation",
  "Six of Swords": "delayed transition and a stagnant place",
  "Seven of Swords": "the end of evasion and surfacing truth",
  "Eight of Swords": "a time of release from restriction",
  "Nine of Swords": "eased worry and relieved anxiety",
  "Ten of Swords": "passing the worst and starting recovery",
  "Page of Swords": "blocked information and weakened curiosity",
  "Knight of Swords": "regret of haste and pace adjustment",
  "Queen of Swords": "weakened coolness and emotional wobble",
  "King of Swords": "weakened authority and avoided decision",

  "Ace of Pentacles": "blocked material opportunity and delayed start",
  "Two of Pentacles": "broken balance and failed management",
  "Three of Pentacles": "a crack in collaboration and lack of results",
  "Four of Pentacles": "release of clinging and a time of giving",
  "Five of Pentacles": "recovery from lack and arriving help",
  "Six of Pentacles": "unfair distribution and only receiving",
  "Seven of Pentacles": "delayed fruition and the limit of patience",
  "Eight of Pentacles": "weakened craftsmanship and lack of focus",
  "Nine of Pentacles": "weakened independence and increased dependence",
  "Ten of Pentacles": "a crack in legacy and family conflict",
  "Page of Pentacles": "stagnant learning and delayed growth",
  "Knight of Pentacles": "stagnant progress and laziness",
  "Queen of Pentacles": "weakened practicality and shaken abundance",
  "King of Pentacles": "weakened financial authority and risk of loss"
};

function getCardFlavor(card, isReversed) {
  if (isReversed) {
    return CARD_FLAVOR_REVERSED[card] || CARD_FLAVOR[card] || `the energy of ${card}`;
  }
  return CARD_FLAVOR[card] || `the energy of ${card}`;
}

/* ════════════════════════════════════════
   STATE-BASED BLOCK SYSTEM (Stock)
════════════════════════════════════════ */
const MEDIUM_CARD_RULES = {
  'The Hanged Man':  { rev: 'SOFT' },
  'Eight of Swords': { rev: 'SOFT' },
  'Four of Cups':    { rev: 'NONE' },
  'Five of Pentacles': { rev: 'NONE' },
  'Seven of Swords': { rev: 'SOFT' }
};

function getBlockLevel(cardName, isReversed) {
  if (cardName === 'The Hermit') return 'HARD';
  if (cardName === 'The Moon') return isReversed ? 'MEDIUM' : 'HARD';
  if (cardName === 'Nine of Swords') return isReversed ? 'SOFT' : 'HARD';
  if (cardName === 'Ten of Swords') return isReversed ? 'MEDIUM' : 'BOTTOM';
  if (MEDIUM_CARD_RULES[cardName]) {
    return isReversed ? MEDIUM_CARD_RULES[cardName].rev : 'MEDIUM';
  }
  return 'NONE';
}

function handleBottom(intent, futureCardScore) {
  if (intent === 'sell') {
    return {
      position: 'Hold & watch (confirming bottom)',
      strategy: 'Worst has passed — refrain from further selling, await rebound signal',
      diagnosis: "Current zone is 'a bottom where the worst has passed — rebound is more likely than further downside'.",
      entryTriggers: [
        { stage: 'Now', action: 'Do not sell more — worst-passed bottom' },
        { stage: 'Signal 1', action: 'On volume increase + bullish reversal -> consider partial re-buy' },
        { stage: 'Confirm 2', action: 'On break of prior-day high -> restore position' }
      ],
      timingNote: 'On condition fulfillment (no fixed time)'
    };
  }
  return {
    position: 'Wait-to-buy (Bottom Watch)',
    strategy: 'Conditional small entry after bottom confirmation (max 20%)',
    diagnosis: "Current zone is 'a bottom under confirmation — small entry possible on signal'.",
    entryTriggers: [
      { stage: 'Now', action: 'Wait — confirming bottom signal' },
      { stage: 'Signal 1', action: 'On volume increase + bullish reversal -> 1/5 small entry' },
      { stage: 'Confirm 2', action: 'On break of prior-day high -> add (up to 20%)' }
    ],
    timingNote: 'On condition fulfillment (no fixed time)'
  };
}

function buildBlockDecision(blockLevel, intent, futureCardScore, currentCardName, isReversed) {
  const futStrong = futureCardScore >= 5;
  switch (blockLevel) {
    case 'HARD':
      return {
        position: 'Hold (no entry)',
        strategy: 'Strong suppression of current card — re-examine after a trend-reversal signal',
        diagnosis: `Current zone is one where '${currentCardName} suppression energy prohibits entry itself'.`,
        entryTriggers: [
          { stage: 'Now', action: 'No entry — HARD suppression (not even small)' },
          { stage: 'Signal 1', action: 'On card-energy shift + volume surge -> re-examine entry' },
          { stage: 'Confirm 2', action: 'On trend reversal + break of prior-day high -> small entry possible' }
        ],
        timingNote: 'No fixed-time entry — signal-based only'
      };
    case 'MEDIUM':
      if (futStrong) {
        return {
          position: 'Conditional entry wait (imminent chance)',
          strategy: 'Suppression present but strong future energy -> small entry immediately on signal',
          diagnosis: `Current zone: '${currentCardName} suppression exists but future energy is strong — entry possible on condition'.`,
          entryTriggers: [
            { stage: 'Now', action: 'Stay on watch (not entry yet)' },
            { stage: 'Signal 1', action: 'Volume surge + trend reversal -> immediate small entry (1/4)' },
            { stage: 'Confirm 2', action: 'On break of prior-day high -> consider adding' }
          ],
          timingNote: 'Signal-based entry — watch early session, catch the turn'
        };
      }
      return {
        position: 'Hold (await signal)',
        strategy: 'Suppression present — enter after trend confirmation',
        diagnosis: `Current zone: '${currentCardName} suppression energy — entry after signal is favorable'.`,
        entryTriggers: [
          { stage: 'Now', action: 'Stay on watch' },
          { stage: 'Signal 1', action: 'Volume increase + bullish reversal -> consider small entry' },
          { stage: 'Confirm 2', action: 'On clear direction -> split entry' }
        ],
        timingNote: 'No fixed-time entry'
      };
    case 'SOFT':
      return {
        position: 'Cautious exploration (careful entry)',
        strategy: 'Weak suppression — small entry possible but keep stop tight',
        diagnosis: `Current zone: '${currentCardName} weak suppression — small entry possible but watch volatility'.`,
        entryTriggers: [
          { stage: 'Now', action: 'Small trial entry possible (1/5) — tight stop' },
          { stage: 'Signal 1', action: 'On trend confirmation -> add 1/4' },
          { stage: 'Confirm 2', action: 'On clear direction -> consider scaling up' }
        ],
        timingNote: 'Watch early session, enter on stable zone'
      };
    default:
      return null;
  }
}

/* ════════════════════════════════════════
   LOVE BLOCK (retained; unused by EN engine)
════════════════════════════════════════ */
const LOVE_BLOCK = {
  HARD:   new Set(['Three of Swords', 'The Tower', 'The Devil', 'The Moon']),
  MEDIUM: new Set(['Seven of Swords', 'Five of Pentacles', 'Five of Swords', 'Eight of Swords']),
  SOFT:   new Set(['Two of Pentacles'])
};
const LOVE_CARD_FLAVOR = {
  'The Tower': 'relationship shock — sudden rupture or exposed truth',
  'The Star': 'recovery after a wound — new emotional connection possible',
  'The Devil': 'obsessive/toxic energy — risk of distorting the relationship',
  'The Moon': 'illusion — misreading the other or the situation',
  'Three of Swords': 'wound/betrayal energy still active in the relationship',
  'Seven of Swords': 'evasion/concealment — the other may be hiding something',
  'Five of Cups': 'loss/regret — clinging to the past blocks new connection',
  'Two of Cups': 'emotional resonance — balanced mutual attraction',
  'The Lovers': 'a crossroads — balance needed between feeling and reason',
  'Ace of Cups': 'the start of a new feeling — relationship-opening energy',
  'Ten of Cups': 'emotional fullness — relationship-completion energy',
  'The Hermit': 'choosing solitude — being alone is the answer for now',
  'Judgement': 'reassessing a past relationship — a second chance possible',
  'The World': 'relationship completion — emotional goal achieved',
  'Four of Cups': 'apathy — the other\'s interest has cooled',
  'Eight of Cups': 'parting — energy of leaving for something better'
};
function detectLoveBlock(currentCard, isReversed) {
  if (currentCard === 'The Moon') return isReversed ? 'MEDIUM' : 'HARD';
  if (LOVE_BLOCK.HARD.has(currentCard)) return 'HARD';
  if (LOVE_BLOCK.MEDIUM.has(currentCard)) return isReversed ? 'SOFT' : 'MEDIUM';
  if (LOVE_BLOCK.SOFT.has(currentCard)) return isReversed ? 'NONE' : 'SOFT';
  return 'NONE';
}
function getLoveCardFlavor(card, isReversed) {
  if (LOVE_CARD_FLAVOR[card]) return LOVE_CARD_FLAVOR[card];
  return getCardFlavor(card, isReversed);
}

/* ════════════════════════════════════════
   MESSAGE POOL (domain x signal) — English
════════════════════════════════════════ */
const MESSAGE_POOL = {
  stock: {
    BUY: [
      "An entry window is gradually opening.",
      "The flow is in the early stage of turning upward.",
      "A small entry now can let you test the flow.",
      "An opportunity zone is forming.",
      "It is a valid timing for a staged entry.",
      "The trend is aligning favorably.",
      "The flow of energy permits entry.",
      "An early signal of upward momentum is detected.",
      "Cosmic timing leans toward entry.",
      "A careful entry may be rewarded here."
    ],
    HOLD: [
      "This is a zone where direction needs confirmation.",
      "Observation is more favorable than a hasty entry.",
      "The flow is not yet confirmed.",
      "Now is a time for waiting rather than judging.",
      "Entry without conviction can lead to risk.",
      "You need to clearly confirm a trend-reversal signal.",
      "Both directions remain open here.",
      "It is a time to read the market from the observer's seat.",
      "Patience creates more value than action now.",
      "Maintain your position weight until the signal is clear."
    ],
    SELL: [
      "This is not an opportunity but a cleanup zone.",
      "The flow has already tilted downward.",
      "Loss defense comes before entry.",
      "If you don't respond now, the loss zone may widen.",
      "A buying window has not yet opened.",
      "This calls for survival strategy, not offense.",
      "Cleaning up positions and securing cash come first.",
      "The trend clearly demands defense mode.",
      "Now the key is minimizing loss, not greed.",
      "Widening volatility — consider shifting to safe assets."
    ]
  },
  fortune: {
    BUY: [
      "Conditions seem to be opening in your favor.",
      "An early signal of positive change is showing.",
      "A measured step forward fits this current.",
      "Intuition and circumstance seem to be aligning.",
      "The opening is real, though not yet wide.",
      "What you begin now has room to take root.",
      "The current leans toward you for now.",
      "Acting on a clear inner signal looks supported.",
      "A small grounded decision today shapes the larger flow.",
      "Steady momentum reads stronger than dramatic motion."
    ],
    HOLD: [
      "Now is a time of observation rather than action.",
      "The direction of fortune is not yet decided.",
      "Deferring a decision is more favorable here.",
      "Time will reveal the answer.",
      "Haste is the greatest enemy at this point.",
      "Order your inner world and await the signal.",
      "It is a time to read the flow from a place of balance.",
      "The timing of action matters more than its result.",
      "A brief pause makes for a larger stride.",
      "Be patient until the signal becomes clear."
    ],
    SELL: [
      "Now is a time to focus on closure rather than new starts.",
      "The energy calls for defense mode.",
      "Action may invite loss in this zone.",
      "Do not ignore your inner warning signal.",
      "It is a time to tidy up what already exists.",
      "Avoidance now creates greater protection.",
      "The flow of fortune has briefly turned away.",
      "A hasty move may bring regret.",
      "Inner stability comes before outward action.",
      "Patience is the greatest wisdom now."
    ]
  }
};
function pickMessage(signal, domain, card) {
  const pool = (MESSAGE_POOL[domain] || MESSAGE_POOL.stock)[signal] || [];
  if (pool.length === 0) return "It is a moment to watch the direction of the flow.";
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

function buildCriticalInterpretation(cards, revFlags, domain, intent) {
  const decisions = cards.map((c, i) => getFinalDecision(c, revFlags[i]));
  const counts = { BUY: 0, HOLD: 0, SELL: 0 };
  decisions.forEach(d => counts[d]++);
  let signal;
  if (counts.SELL >= 2) signal = "SELL";
  else if (counts.BUY >= 2) signal = "BUY";
  else if (counts.SELL > counts.BUY) signal = "SELL";
  else if (counts.BUY > counts.SELL) signal = "BUY";
  else signal = "HOLD";

  const futCard = cards[2];
  const futReversed = revFlags && revFlags[2];
  const futFlavor = getCardFlavor(futCard, futReversed);
  const futCardLabel = futReversed ? `${futCard} (reversed)` : futCard;

  const poolDomain = (domain === 'love' || domain === 'realestate') ? 'fortune' : (domain || 'stock');
  const generalMsg = pickMessage(signal, poolDomain, futCard);
  const flavorMsg = `The energy of ${futCardLabel} suggests ${futFlavor}.`;

  // Domain-appropriate closing — tactical "survival strategy" language only
  // fits the stock domain; sounds jarring in love/fortune/decision contexts.
  const closingByDomain = {
    love: {
      SELL: "Right now, emotional protection matters more than forcing resolution.",
      BUY:  "The connection has room to grow — stay present without rushing it.",
      HOLD: "Let the dynamic settle before reading more into it."
    },
    fortune: {
      SELL: "Right now, observation matters more than action.",
      BUY:  "The flow is opening — small steady steps will go further than big ones.",
      HOLD: "Wait for clearer signals before changing course."
    },
    decision: {
      SELL: "Right now, holding back is the stronger choice.",
      BUY:  "Conditions favor moving forward — staged and deliberate.",
      HOLD: "Gather one more piece of information before deciding."
    },
    stock: {
      SELL: "Now the focus is preserving stability, not chasing return.",
      BUY:  "Staged entry and trend-following are the core strategy.",
      HOLD: "Acting after signal verification is the most stable."
    }
  };
  const dom = domain || 'stock';
  const map = closingByDomain[dom] || closingByDomain.stock;
  const closing = map[signal] || map.HOLD;
  return `${generalMsg}\n${flavorMsg}\n${closing}`;
}

function getDecisionMajority(cards, revFlags) {
  const decisions = cards.map((c, i) => getFinalDecision(c, revFlags[i]));
  const counts = { BUY: 0, HOLD: 0, SELL: 0 };
  decisions.forEach(d => counts[d]++);
  if (counts.SELL >= 2) return "SELL";
  if (counts.BUY >= 2) return "BUY";
  if (counts.SELL > counts.BUY) return "SELL";
  if (counts.BUY > counts.SELL) return "BUY";
  return "HOLD";
}

/* ════════════════════════════════════════
   SYNERGY
════════════════════════════════════════ */
const SYNERGY_RULES = [
  { cards: ["The Lovers", "Two of Cups"], bonus: +3, tag: "complete emotional union", domain: "love" },
  { cards: ["The Lovers", "Ten of Cups"], bonus: +3, tag: "completion of the relationship", domain: "love" },
  { cards: ["The Tower", "Death"], bonus: -4, tag: "rebirth after total collapse", domain: "any" },
  { cards: ["The Sun", "The World"], bonus: +4, tag: "the finest fruition", domain: "any" },
  { cards: ["The Star", "The Moon"], bonus: 0, tag: "hope and chaos crossing", domain: "any" },
  { cards: ["Ten of Swords", "The Star"], bonus: +2, tag: "recovery after passing the bottom", domain: "any" },
  { cards: ["Eight of Wands", "The Chariot"], bonus: +3, tag: "speed and breakthrough combined", domain: "any" },
  { cards: ["Eight of Wands", "Ace of Swords"], bonus: +2, tag: "swift decision", domain: "any" },
  { cards: ["The Devil", "The Tower"], bonus: -3, tag: "collapse of obsession", domain: "any" },
  { cards: ["Three of Swords", "Nine of Swords"], bonus: -3, tag: "deep loss and anxiety", domain: "love" },
  { cards: ["The Magician", "Ace of Pentacles"], bonus: +3, tag: "execution and fruition", domain: "stock" },
  { cards: ["Queen of Pentacles", "Ten of Pentacles"], bonus: +3, tag: "stable wealth accrual", domain: "any" },
  { cards: ["Knight of Swords", "Eight of Wands"], bonus: +2, tag: "rapid advance", domain: "any" }
];
function detectSynergy(cleanCards, queryType) {
  const set = new Set(cleanCards);
  const hits = [];
  SYNERGY_RULES.forEach(rule => {
    if (rule.domain !== "any" && rule.domain !== queryType && !(queryType === "crypto" && rule.domain === "stock")) return;
    const allPresent = rule.cards.every(c => set.has(c));
    if (allPresent) hits.push(rule);
  });
  return hits;
}

/* ════════════════════════════════════════
   SCORE CALC (reversed support + synergy)
════════════════════════════════════════ */
function calcCardScores(cardNames, reversedCSV, queryType) {
  const cardList = (cardNames || "").split(",").map(c => c.trim()).filter(Boolean);
  const reversedList = (reversedCSV || "").split(",");
  let totalScore = 0, riskScore = 0;
  const cleanCards = [];
  const reversedFlags = [];
  cardList.forEach((card, i) => {
    const cleanCard = card.replace(/\s*\(.*?\)/g, '').trim();
    cleanCards.push(cleanCard);
    const base = CARD_SCORE[cleanCard] ?? 0;
    const isRev = reversedList[i]?.trim() === "true";
    reversedFlags.push(isRev);
    const score = isRev ? -base : base;
    totalScore += score;
    if (score < 0) riskScore += Math.abs(score);
    if (isRev) riskScore += 1;
  });
  const synergies = detectSynergy(cleanCards, queryType || "any");
  const synergyBonus = synergies.reduce((s, r) => s + r.bonus, 0);
  totalScore += synergyBonus;
  return { totalScore, riskScore, cleanCards, reversedFlags, synergies };
}

/* ════════════════════════════════════════
   STOCK METRICS (engine internals — verbatim)
════════════════════════════════════════ */
function buildStockMetrics({ totalScore, riskScore, cleanCards, isLeverage, queryType, prompt, intent, reversedFlags }) {
  const stockIntent = intent || "buy";
  const revFlags = reversedFlags || [false, false, false];
  // trendKey is the internal logic enum; trendLabel is the English display string.
  let trendKey = "NEUTRAL";
  if (totalScore >= 6) trendKey = "STRONG_UP";
  else if (totalScore >= 2) trendKey = "UP";
  else if (totalScore <= -6) trendKey = "STRONG_DOWN";
  else if (totalScore <= -2) trendKey = "DOWN";
  const TREND_LABEL = {
    STRONG_UP: "strong uptrend", UP: "uptrend", NEUTRAL: "neutral",
    DOWN: "downtrend", STRONG_DOWN: "strong downtrend"
  };
  const trend = TREND_LABEL[trendKey];

  const CARD_SCORES = {
    "The Sun": 6, "The World": 6, "The Magician": 5, "The Chariot": 5, "Strength": 4,
    "The Star": 5, "Six of Wands": 4, "Three of Pentacles": 3, "Ten of Pentacles": 4,
    "Nine of Cups": 3, "Four of Wands": 3, "Temperance": 2, "Justice": 1, "Wheel of Fortune": 0,
    "Ace of Wands": 3, "Ace of Pentacles": 3, "Ace of Cups": 2, "Ace of Swords": 2,
    "The Fool": 1, "The Empress": 3, "The Emperor": 2, "The Hierophant": 1,
    "The Hanged Man": -2, "Death": -2, "The Moon": -2, "Judgement": 1,
    "The Tower": -6, "Ten of Swords": -6, "Five of Pentacles": -3, "Five of Cups": -3,
    "Five of Swords": -2, "Three of Swords": -3, "Nine of Swords": -3, "Eight of Swords": -2,
    "The Devil": -4, "Seven of Swords": -2, "Seven of Wands": 0, "Five of Wands": -1,
    "Two of Swords": -1, "Four of Cups": -1, "Four of Pentacles": 0, "Six of Cups": 0,
    "Seven of Cups": -1, "Eight of Cups": -1, "Ten of Cups": 3
  };
  const getScore = (name) => CARD_SCORES[name] ?? 0;
  const pastScore = getScore(cleanCards[0] || '');
  const currentScore = getScore(cleanCards[1] || '');
  const futureScore = getScore(cleanCards[2] || '');

  // narrativeKey is the internal logic enum; narrativeLabel is English display.
  let narrativeKey = "BASE";
  if (futureScore > currentScore + 2 && currentScore < 0) {
    narrativeKey = "REBOUND_ATTEMPT";
  } else if (futureScore > currentScore && currentScore > 0) {
    narrativeKey = "TREND_STRENGTHENING";
  } else if (futureScore < currentScore - 2 && currentScore < 0) {
    narrativeKey = "DECLINE_ACCEL";
  } else if (futureScore < currentScore && currentScore > 0) {
    narrativeKey = "MOMENTUM_FADING";
  } else if (pastScore < 0 && currentScore < 0 && futureScore >= 0) {
    narrativeKey = "BOTTOMING_REBOUND";
  } else if (pastScore > 0 && currentScore > 0 && futureScore <= 0) {
    narrativeKey = "PEAK_FATIGUE";
  }
  const NARRATIVE_LABEL = {
    BASE: trend,
    REBOUND_ATTEMPT: "short-term dip -> rebound-attempt transition zone",
    TREND_STRENGTHENING: `${trend} — trend strengthening`,
    DECLINE_ACCEL: "accelerating decline — further pullback pressure",
    MOMENTUM_FADING: `${trend} — momentum fading (caution)`,
    BOTTOMING_REBOUND: "bottoming after a low — rebound-attempt zone",
    PEAK_FATIGUE: "fatigue after a rise — pullback possible"
  };
  const trendNarrative = NARRATIVE_LABEL[narrativeKey];

  // action display text (English) + actionKey logic flag used by later branches.
  let action = "Wait & see";
  let actionKey = "WAIT";
  let positionAdjust = null;

  if (stockIntent === "sell") {
    if (trendKey === "STRONG_UP") { action = "🚫 Hold — keep until the trend peaks"; actionKey = "HOLD_SELL"; }
    else if (trendKey === "UP") { action = "Partial exit — staged profit-taking"; actionKey = "PARTIAL_EXIT"; }
    else if (trendKey === "DOWN") { action = "🟢 Sell now — prevent further loss"; actionKey = "SELL_NOW"; }
    else if (trendKey === "STRONG_DOWN") { action = "🚨 Full exit — liquidate immediately"; actionKey = "FULL_EXIT"; }
    else { action = "Conditional exit — confirm the trend, then scale out"; actionKey = "COND_EXIT"; }

    if (narrativeKey === "REBOUND_ATTEMPT" || narrativeKey === "BOTTOMING_REBOUND") {
      action = "Hold — take profit after the rebound"; actionKey = "HOLD_SELL";
    } else if (narrativeKey === "DECLINE_ACCEL") {
      action = "🚨 Sell now — defend against further downside"; actionKey = "SELL_NOW";
      positionAdjust = "urgent";
    } else if (narrativeKey === "MOMENTUM_FADING") {
      action = "Partial exit — realize some profit"; actionKey = "PARTIAL_EXIT";
      positionAdjust = "moderate";
    } else if (narrativeKey === "PEAK_FATIGUE") {
      action = "Pre-emptive exit — scale out near the peak"; actionKey = "PARTIAL_EXIT";
      positionAdjust = "moderate";
    }

    if (totalScore <= -3) {
      action = "🚨 Full exit — liquidate immediately"; actionKey = "FULL_EXIT";
      positionAdjust = "urgent";
    }
  } else {
    if (trendKey === "STRONG_UP") { action = "Strong buy"; actionKey = "STRONG_BUY"; }
    else if (trendKey === "UP") { action = "Split buy"; actionKey = "SPLIT_BUY"; }
    else if (trendKey === "DOWN") { action = "Reduce exposure"; actionKey = "REDUCE"; }
    else if (trendKey === "STRONG_DOWN") { action = "Avoid immediately"; actionKey = "AVOID"; }

    if (narrativeKey === "REBOUND_ATTEMPT" || narrativeKey === "BOTTOMING_REBOUND") {
      action = "Wait, then conditional staged entry"; actionKey = "WAIT";
      positionAdjust = "tentative";
    } else if (narrativeKey === "DECLINE_ACCEL") {
      action = "🚫 No entry — focus on defense"; actionKey = "NO_ENTRY";
      positionAdjust = "noEntry";
    } else if (narrativeKey === "MOMENTUM_FADING") {
      action = "Cautious staged entry — reduce size"; actionKey = "CAUTIOUS_ENTRY";
      positionAdjust = "cautious";
    } else if (narrativeKey === "PEAK_FATIGUE") {
      action = "Hold off on new entry — await pullback"; actionKey = "CAUTIOUS_ENTRY";
      positionAdjust = "cautious";
    }

    const _revCount = (revFlags || []).filter(x => x === true).length;
    const _curScore = (CARD_SCORE[cleanCards[1]] ?? 0) * (revFlags[1] ? -1 : 1);
    const _futScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
    if (totalScore >= 2 && (_revCount >= 1 || (_curScore <= 0 && _futScore > 0))) {
      if (!positionAdjust || positionAdjust === null) {
        positionAdjust = "cautious";
        if (actionKey !== "CAUTIOUS_ENTRY" && actionKey !== "REENTRY_WAIT") {
          action = "Cautious staged entry — take quick profit, then wait to re-enter";
          actionKey = "REENTRY_WAIT";
        }
      }
    }
  }

  let riskLevel = "moderate";
  if (riskScore >= 7) riskLevel = "very high";
  else if (riskScore >= 4) riskLevel = "high";
  if (isLeverage) riskLevel = "very high";

  let entryStrategy, exitStrategy;
  if (stockIntent === "sell") {
    if (trendKey === "STRONG_UP") { entryStrategy = "Track the trend peak — keep holding"; exitStrategy = "Scale out as targets are reached"; }
    else if (trendKey === "UP") { entryStrategy = "Partial exit (2–3 tranches)"; exitStrategy = "Staged profit-taking"; }
    else if (trendKey === "DOWN") { entryStrategy = "🟢 Begin selling now"; exitStrategy = "Full liquidation advised"; }
    else if (trendKey === "STRONG_DOWN") { entryStrategy = "🚨 Sell everything immediately"; exitStrategy = "Cut off further loss"; }
    else { entryStrategy = "Conditional staged exit"; exitStrategy = "Decide after confirming the trend"; }
  } else {
    entryStrategy = "Wait & observe"; exitStrategy = "Respond after confirming the trend";
    if (trendKey === "STRONG_UP") { entryStrategy = "Initial entry + add on pullbacks"; exitStrategy = "Scale out profit as targets are reached"; }
    else if (trendKey === "UP") { entryStrategy = "Staged entry (2–3 tranches)"; exitStrategy = "Take partial profit at short-term highs"; }
    else if (trendKey === "DOWN") { entryStrategy = "🚫 No new buying"; exitStrategy = "Await a rebound signal"; }
    else if (trendKey === "STRONG_DOWN") { entryStrategy = "🚫 Absolutely no buying — stay on the sidelines"; exitStrategy = "Hold the -5% defense line (reassess if breached)"; }
  }

  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let timingSeed = Math.abs(totalScore);
  for (let i = 0; i < (prompt || '').length; i++) timingSeed += prompt.charCodeAt(i);
  for (let i = 0; i < cleanCards.length; i++) {
    for (let j = 0; j < cleanCards[i].length; j++) timingSeed += cleanCards[i].charCodeAt(j);
  }
  const buySeed = timingSeed;
  const sellSeed = timingSeed * 7 + 13;
  let buyDayIdx = buySeed % 7;
  let buyHour = (buySeed * 7) % 24;
  let buyMinute = (buySeed * 13) % 60;
  let sellDayIdx = sellSeed % 7;
  let sellHour = (sellSeed * 7) % 24;
  let sellMinute = (sellSeed * 13) % 60;

  let finalTimingText = "";
  let entryTimingText = "";
  let exitTimingText = "";

  if (queryType === "stock") {
    if (buyDayIdx === 0 || buyDayIdx === 6) buyDayIdx = 1 + (buySeed % 5);
    if (sellDayIdx === 0 || sellDayIdx === 6) sellDayIdx = 1 + (sellSeed % 5);
    if (buyHour < 9 || buyHour >= 15) buyHour = 9 + (buySeed % 6);
    if (sellHour < 9 || sellHour >= 15) sellHour = 9 + (sellSeed % 6);
    buyMinute = Math.floor(buyMinute / 5) * 5;
    sellMinute = Math.floor(sellMinute / 5) * 5;

    const buyDayValue = buyDayIdx * 10000 + buyHour * 100 + buyMinute;
    const sellDayValue = sellDayIdx * 10000 + sellHour * 100 + sellMinute;
    if (sellDayValue <= buyDayValue) {
      if (buyHour < 14) {
        sellDayIdx = buyDayIdx;
        sellHour = Math.min(14, buyHour + 1 + (sellSeed % 3));
        sellMinute = (sellSeed * 7) % 60;
        sellMinute = Math.floor(sellMinute / 5) * 5;
      } else {
        sellDayIdx = buyDayIdx + 1;
        if (sellDayIdx > 5) sellDayIdx = 1;
        sellHour = 9 + (sellSeed % 6);
        sellMinute = Math.floor(((sellSeed * 13) % 60) / 5) * 5;
      }
    }

    const buyHourFmt = buyHour < 12 ? `${buyHour}:00 AM` : (buyHour === 12 ? '12:00 PM' : `${buyHour - 12}:00 PM`);
    const sellHourFmt = sellHour < 12 ? `${sellHour}:00 AM` : (sellHour === 12 ? '12:00 PM' : `${sellHour - 12}:00 PM`);

    const buyHourDesc = buyHour === 9 ? 'right after the open' :
      buyHour <= 10 ? 'morning trend-settling zone' :
        buyHour <= 12 ? 'late-morning reversal timing' :
          buyHour <= 13 ? 'post-lunch direction check' : 'pre-close inflection';
    const sellHourDesc = sellHour === 9 ? 'opening-gap handling' :
      sellHour <= 10 ? 'early-session pop profit' :
        sellHour <= 12 ? 'late-morning high capture' :
          sellHour <= 13 ? 'post-lunch profit-taking' : 'closing liquidation';

    entryTimingText = `${DAYS[buyDayIdx]} ${buyHourFmt}:${String(buyMinute).padStart(2,'0')} (${buyHourDesc})`;
    exitTimingText = `${DAYS[sellDayIdx]} ${sellHourFmt}:${String(sellMinute).padStart(2,'0')} (${sellHourDesc})`;
    finalTimingText = `Buy: ${entryTimingText} / Sell: ${exitTimingText}`;
  } else if (queryType === "crypto") {
    buyMinute = Math.floor(buyMinute / 5) * 5;
    sellMinute = Math.floor(sellMinute / 5) * 5;
    const cryptoHourDesc = (h) => {
      if (h <= 3) return 'late-night low zone (volatility contracting)';
      if (h <= 6) return 'pre-dawn reversal timing';
      if (h <= 9) return 'Asia-morning breakout zone';
      if (h <= 12) return 'Asia-midday peak';
      if (h <= 15) return 'afternoon pullback zone';
      if (h <= 18) return 'Europe-open momentum';
      if (h <= 21) return 'Europe–US overlap peak';
      return 'US late-night volatility peak';
    };
    const buyHourFmt = buyHour < 12 ? `${buyHour || 12}:00 AM` : (buyHour === 12 ? '12:00 PM' : `${buyHour - 12}:00 PM`);
    const sellHourFmt = sellHour < 12 ? `${sellHour || 12}:00 AM` : (sellHour === 12 ? '12:00 PM' : `${sellHour - 12}:00 PM`);
    entryTimingText = `${DAYS[buyDayIdx]} ${buyHourFmt}:${String(buyMinute).padStart(2,'0')} (${cryptoHourDesc(buyHour)})`;
    exitTimingText = `${DAYS[sellDayIdx]} ${sellHourFmt}:${String(sellMinute).padStart(2,'0')} (${cryptoHourDesc(sellHour)})`;
    finalTimingText = `Buy: ${entryTimingText} / Sell: ${exitTimingText}`;
  }

  const posLabels = ["Past", "Present", "Future"];
  const cardNarrative = cleanCards.map((c, i) => {
    const m = cardMeaning(c);
    const isRev = revFlags[i] === true;
    if (isRev) return `${posLabels[i] || '?'} (${c} [reversed]): ${m.flow} stalled/delayed — the natural flow is blocked`;
    return `${posLabels[i] || '?'} (${c}): ${m.flow} — ${m.signal}`;
  });
  const flowSummary = (() => {
    const firstScore = (CARD_SCORE[cleanCards[0]] ?? 0) * (revFlags[0] ? -1 : 1);
    const lastScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
    if (lastScore > firstScore) return "Past -> future energy is rising (entry energy strengthening)";
    if (lastScore < firstScore) return "Past -> future energy is falling (watch for energy exhaustion)";
    return "Balanced energy flow (respond after confirming direction)";
  })();
  const riskChecks = cleanCards.map((c, i) => {
    const baseS = CARD_SCORE[c] ?? 0;
    const s = revFlags[i] ? -baseS : baseS;
    if (s <= -5) return `🔴 ${c}${revFlags[i] ? ' [reversed]' : ''}: collapse/crash energy — strong risk signal`;
    if (s <= -3) return `🟠 ${c}${revFlags[i] ? ' [reversed]' : ''}: downward-pressure energy — hold off on adding`;
    if (s >= 4) return `🟢 ${c}: stable upward energy — positive signal`;
    return `⚪ ${c}${revFlags[i] ? ' [reversed]' : ''}: neutral energy — watch the flow`;
  });

  const upPct = Math.max(5, Math.min(20, 5 + totalScore));
  const basePct = Math.max(0, Math.min(10, 2 + Math.floor(totalScore / 2)));
  const scenarios = {
    bull: `🟢 Bullish (future card fully realized): +${upPct}% reachable — ${cleanCards[2] || 'future card'} energy maximized`,
    base: `⚪ Base (current flow holds): around +${basePct}% — current card energy persists`,
    bear: `🔴 Bearish (risk card materializes): -5% breakdown possible — hold the stop-loss line`
  };

  const posNum = totalScore >= 6 ? 30 : totalScore >= 2 ? 20 : 0;
  const roadmap = (totalScore >= 2) ? [
    `1st entry: ${finalTimingText} — ${Math.floor(posNum / 2)}% of the position (first energy convergence)`,
    `2nd entry: after re-confirming the flow — add ${posNum - Math.floor(posNum / 2)}% (once energy strengthens)`,
    `1st take-profit: trim half at +${basePct}%`,
    `2nd take-profit: clear the rest at +${upPct}%`,
    `Stop-loss: liquidate at -5% (treat as card energy depleted)`
  ] : [
    `No-entry zone — card energy is stuck at down/neutral`,
    `Watch points: rising volume + support at the lows`,
    `Re-entry condition: after a trend-reversal signal (card energy +2 or more)`,
    `Held positions: reduce or stop out on a bounce`,
    `Risk management: trim existing holdings before losses widen`
  ];

  const keyCard = cleanCards[2] || cleanCards[1] || "future card";
  const worstCard = (() => {
    let worst = null, min = 999;
    cleanCards.forEach(c => { const s = CARD_SCORE[c] ?? 0; if (s < min) { min = s; worst = c; } });
    return worst || keyCard;
  })();

  const interpretByTrend = {
    STRONG_UP: `The current flow is riding strong upward energy. The force of ${keyCard} suggests momentum is working in your favor. Staged entries and disciplined execution are the key to protecting gains.`,
    UP: `The flow is mildly positive, but breakout energy is still limited. The energy of ${keyCard} hints that entering after trend confirmation is favorable. Patience and a staged approach are the virtues of this zone.`,
    NEUTRAL: `Energy is in a neutral, direction-seeking zone. The force of ${keyCard} signals this is a time for careful observation. Keep your position light until a clear signal appears.`,
    DOWN: `The flow is under downward pressure. The energy of ${worstCard} warns that adding here could lead to loss. Defense and patience are the best strategy now.`,
    STRONG_DOWN: `The current flow strongly discourages emotional entry. The energy of ${worstCard} in particular can trigger loss-fixation and distorted judgment. Waiting and then re-entering is the most stable course.`
  };
  let finalOracle = interpretByTrend[trendKey] || interpretByTrend.NEUTRAL;
  if (isLeverage) finalOracle += ` That said, high-volatility assets (leverage / special tickers) may not realize the interpreted direction as-is. Treat the volatility itself as a risk.`;

  let finalTrend = trendNarrative || trend;
  let finalAction = action;
  let finalActionKey = actionKey;
  let finalRisk = riskLevel;
  if (finalTrend === trend && trendKey === "NEUTRAL") finalTrend = "neutral (pre-reversal)";
  if (finalActionKey === "WAIT") {
    finalAction = stockIntent === 'sell' ? "🚫 Hold off selling -> await rebound" : "🚫 No buying -> stay on the sidelines";
  }
  if (!finalRisk) finalRisk = "moderate (direction unconfirmed)";

  const isNoEntry = finalActionKey === "NO_ENTRY" || finalActionKey === "AVOID"
    || positionAdjust === "noEntry"
    || (stockIntent !== "sell" && totalScore <= -3);
  let position;
  if (stockIntent === "sell") {
    const isUrgent = finalActionKey === "SELL_NOW" || finalActionKey === "FULL_EXIT" || positionAdjust === "urgent";
    const isModerate = positionAdjust === "moderate";
    position = {
      weight: isUrgent ? "🚨 1st 50% now -> 2nd full liquidation" :
        isModerate ? "30–50% partial exit (momentum-fading response)" :
          totalScore <= -2 ? "70–100% sell (clear most of it)" :
            totalScore >= 6 ? "10–20% partial profit (keep core)" :
              totalScore >= 2 ? "30–50% staged exit" : "50–70% sell (defense mode)",
      stopLoss: isUrgent ? "Liquidate the rest if price breaks -2%" :
        totalScore >= 2 ? "Sell immediately if holdings fall another -3%" : "Liquidate immediately if it breaks -2% from here",
      target: isUrgent ? "Scale out on bounces (do not expect a full recovery)" :
        isModerate ? `Add to profit-taking at +${basePct}%` :
          totalScore >= 6 ? `Add to profit-taking near +${upPct}%` :
            totalScore >= 2 ? `Take profit in the +${basePct}–${Math.min(10, upPct - 2)}% range` : "Sell as soon as a bounce appears"
    };
  } else {
    const isCautious = positionAdjust === "cautious";
    const isTentative = positionAdjust === "tentative";
    position = {
      weight: isNoEntry ? "0% (now) — reassess after a signal shift" :
        isCautious ? "10–20% (momentum fading — cautious entry)" :
          isTentative ? "5–10% (trial entry if conditions are met)" :
            totalScore >= 6 ? "40–50% (strong-conviction zone)" :
              totalScore >= 2 ? "20–30% (staged entry)" : "10–20% (exploratory zone)",
      stopLoss: isNoEntry ? "Hold/entry: enforce -3% (reassess if breached)" :
        isCautious ? "Stop out at -2–3% (keep it tight)" : "Stop out at -3–5%",
      target: isNoEntry ? "Reassess on a +3–5% bounce after the first signal" :
        isCautious ? `+${basePct}–${Math.min(8, upPct - 3)}% range (conservative)` :
          totalScore >= 6 ? `+${Math.min(15, basePct + 5)}–${upPct}% range` : `+${basePct}–${Math.min(12, upPct)}% range`
    };
  }

  const timingDetail = isNoEntry
    ? `${finalTimingText}  (⚠️ no entry right now — reassess around the times above)`
    : `${finalTimingText}`;

  const reversedCount = (revFlags || []).filter(x => x === true).length;
  const currentCardScore = (CARD_SCORE[cleanCards[1]] ?? 0) * (revFlags[1] ? -1 : 1);
  const futureCardScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
  const hasMidstreamObstacle = (currentCardScore <= 0 && futureCardScore > 0);
  const hasReversedSignal = reversedCount >= 1 && totalScore >= 2;

  const _blockCurrentCard = cleanCards[1];
  const _blockReversed = revFlags[1] || false;

  function isRealBottom(cardName, score) {
    return cardName === 'Ten of Swords' && score <= -6;
  }

  const _rawBlockLevel = (stockIntent !== 'sell')
    ? getBlockLevel(_blockCurrentCard, _blockReversed) : 'NONE';
  const _adjustedBlockLevel = (_rawBlockLevel === 'BOTTOM' && !isRealBottom(_blockCurrentCard, totalScore))
    ? 'NONE' : _rawBlockLevel;
  const _rawCurrentScore = CARD_SCORE[_blockCurrentCard] ?? 0;
  const _rawFutureScore = CARD_SCORE[cleanCards[2]] ?? 0;
  const _hasFuturePositive = (_rawFutureScore > 0 || futureCardScore > 0);
  const _blockLevel = (_adjustedBlockLevel === 'HARD')
    ? 'HARD'
    : (_adjustedBlockLevel !== 'NONE' && _hasFuturePositive && _rawCurrentScore <= 0)
      ? _adjustedBlockLevel : 'NONE';

  let _blockDecision = null;
  if (_blockLevel === 'BOTTOM') _blockDecision = handleBottom(stockIntent, futureCardScore);
  else if (_blockLevel !== 'NONE') _blockDecision = buildBlockDecision(_blockLevel, stockIntent, futureCardScore, _blockCurrentCard, _blockReversed);

  let decisionPosition, decisionStrategy;
  if (stockIntent === "sell") {
    if (totalScore >= 6 && !hasReversedSignal) { decisionPosition = "Hold & Watch"; decisionStrategy = "Hold to the trend peak -> scale out on a peak signal"; }
    else if (totalScore >= 2) { decisionPosition = "Partial Exit"; decisionStrategy = "Staged profit-taking -> keep part of the core"; }
    else if (totalScore <= -3) { decisionPosition = "Full Exit"; decisionStrategy = "Scale out on bounces -> final exit"; }
    else { decisionPosition = "Conditional Exit"; decisionStrategy = "Sell on a rebound signal, or trim partially"; }
  } else {
    if (positionAdjust === "noEntry" || (totalScore <= -3)) { decisionPosition = "Wait & See"; decisionStrategy = "No new entry -> await a trend-reversal signal"; }
    else if (positionAdjust === "tentative") { decisionPosition = "Exploratory"; decisionStrategy = "Small entry -> verify the signal"; }
    else if (totalScore >= 6 && !hasReversedSignal && !hasMidstreamObstacle && positionAdjust !== "cautious") { decisionPosition = "Strong Buy"; decisionStrategy = "Initial entry + add on pullbacks -> hold to target"; }
    else if (hasMidstreamObstacle || hasReversedSignal || positionAdjust === "cautious") { decisionPosition = "Short-Term Buy"; decisionStrategy = "Early entry -> quick profit -> wait to re-enter"; }
    else if (totalScore >= 2) { decisionPosition = "Split Buy"; decisionStrategy = "Staged entry -> add after trend confirmation"; }
    else {
      const _futSig = CARD_DECISION_MAP[cleanCards[2]] || "HOLD";
      const _futEff = revFlags[2] ? (_futSig === "BUY" ? "HOLD" : _futSig === "SELL" ? "BUY" : "SELL") : _futSig;
      if (_futEff === "BUY") { decisionPosition = "Wait & See"; decisionStrategy = "Enter after a rebound signal -> avoid getting stuck in chop"; }
      else { decisionPosition = "Wait & See"; decisionStrategy = "Review entry after confirming direction"; }
    }
  }

  const _futCardName = cleanCards[2];
  const _curCardName = cleanCards[1];
  const _pastCardName = cleanCards[0];
  const _curFlavor = getCardFlavor(_curCardName, revFlags[1]);
  const _futFlavor = getCardFlavor(_futCardName, revFlags[2]);
  const _curCardLabel = revFlags[1] ? `${_curCardName} (reversed)` : _curCardName;
  const _futCardLabel = revFlags[2] ? `${_futCardName} (reversed)` : _futCardName;

  let diagnosis;
  const _futureSig = CARD_DECISION_MAP[_futCardName] || "HOLD";
  const _futureSigEffective = revFlags[2] ? (_futureSig === "BUY" ? "HOLD" : _futureSig === "SELL" ? "BUY" : "SELL") : _futureSig;
  if (stockIntent === "sell") {
    if (totalScore <= -3) diagnosis = "This is a zone where 'loss defense, not profit-taking, comes first'.";
    else if (totalScore >= 6) diagnosis = "This is a zone to 'consider staged profit-taking near the trend peak'.";
    else if (hasReversedSignal || hasMidstreamObstacle) diagnosis = "This is a zone to 'keep the core through short-term volatility while trimming part'.";
    else diagnosis = "This is a stable zone where 'staged profit-taking is effective'.";
  } else {
    if (positionAdjust === "noEntry" || (totalScore <= -3)) diagnosis = "This is a zone where 'it isn't the time to enter; defense comes first'.";
    else if (positionAdjust === "tentative") diagnosis = "This is an exploratory zone where 'a small entry can verify the signal'.";
    else if (totalScore >= 6 && !hasReversedSignal && !hasMidstreamObstacle && positionAdjust !== "cautious") diagnosis = "This is an entry-able zone where 'strong upward momentum is underway'.";
    else if (hasMidstreamObstacle || hasReversedSignal || positionAdjust === "cautious") diagnosis = "This is a zone where 'entry is possible but you must watch short-term volatility'.";
    else if (totalScore >= 2) diagnosis = "This is a stable zone where 'staged entry can confirm the flow'.";
    else {
      if (_futureSigEffective === "BUY") diagnosis = "This is a zone where 'a rebound is possible, but it isn't entry timing yet'.";
      else diagnosis = "This is a neutral zone where 'you should seek direction and wait for a signal'.";
    }
  }

  let cardEvidence;
  const _futDecision = CARD_DECISION_MAP[_futCardName] || "HOLD";
  const _curDecision = CARD_DECISION_MAP[_curCardName] || "HOLD";
  const _futEffective = revFlags[2] ? (_futDecision === "BUY" ? "HOLD" : _futDecision === "SELL" ? "BUY_REV" : "SELL") : _futDecision;
  const _curEffective = revFlags[1] ? (_curDecision === "BUY" ? "HOLD" : _curDecision === "SELL" ? "BUY_REV" : "SELL") : _curDecision;
  const _strip = (s) => (s || '').replace(/\s+(zone|moment|energy|situation)$/i, '');
  const _curMeaningClean = _strip(_curFlavor);
  const _futMeaningClean = _strip(_futFlavor);
  if (_futEffective === "BUY" && _curEffective !== "BUY") {
    cardEvidence = `${_futCardLabel} shows ${_futMeaningClean},\nbut the ${_curMeaningClean} energy of ${_curCardLabel} is pressing the market and limiting movement.`;
  } else if (_futEffective === "SELL" && _curEffective === "BUY") {
    cardEvidence = `The ${_curMeaningClean} energy of ${_curCardLabel} is lifting the flow short-term,\nbut the ${_futMeaningClean} of ${_futCardLabel} suggests a pullback after the peak.`;
  } else if (_futEffective === "SELL" && _curEffective === "SELL") {
    cardEvidence = `The ${_curMeaningClean} energy of ${_curCardLabel} is pressing the present,\nand even the ${_futMeaningClean} of ${_futCardLabel} signals further weakness.`;
  } else if (_futEffective === "BUY" && _curEffective === "BUY") {
    cardEvidence = `The ${_curMeaningClean} energy of ${_curCardLabel} is favorably aligned,\nand the ${_futMeaningClean} of ${_futCardLabel} signals trend strengthening.`;
  } else if (_futEffective === "HOLD" || _curEffective === "HOLD") {
    cardEvidence = `The ${_curMeaningClean} energy of ${_curCardLabel} is at a balance point,\nand the ${_futMeaningClean} of ${_futCardLabel} advises careful observation.`;
  } else {
    cardEvidence = `The ${_curMeaningClean} energy of ${_curCardLabel} shapes the present flow,\nand the ${_futMeaningClean} of ${_futCardLabel} foreshadows the next stage.`;
  }

  let outcomePrediction;
  if (stockIntent === "sell") {
    if (totalScore <= -3) outcomePrediction = "👉 If you don't sell now, 'losses likely widen on further downside',\n👉 so immediate cleanup beats selling after a bounce.";
    else if (totalScore >= 6) outcomePrediction = "👉 Selling everything now risks 'missing further upside',\n👉 so staged profit-taking that keeps the core is far better.";
    else outcomePrediction = "👉 Clearing all at once risks 'missing a short-term bounce',\n👉 so staged selling is far better.";
  } else {
    if (positionAdjust === "noEntry" || (totalScore <= -3)) outcomePrediction = "👉 Entering now risks 'getting trapped in further downside',\n👉 so entering after a trend-reversal signal is far better.";
    else if (totalScore >= 6 && !hasReversedSignal && !hasMidstreamObstacle && positionAdjust !== "cautious") outcomePrediction = "👉 Delaying entry risks 'missing the main upward leg',\n👉 so immediate staged buying is favorable.";
    else if (hasMidstreamObstacle || hasReversedSignal || positionAdjust === "cautious") outcomePrediction = "👉 Going full-size now risks 'getting shaken by short-term volatility',\n👉 so staged entry + quick profit is far better.";
    else if (totalScore >= 2) outcomePrediction = "👉 Entering big now exposes you to 'unconfirmed-trend risk',\n👉 so staged entry that confirms the signal first is favorable.";
    else outcomePrediction = "👉 Entering now risks 'getting stuck in dull chop or further downside',\n👉 so entering after a rebound signal is far better.";
  }

  let entryTriggers;
  if (stockIntent === "sell") {
    if (totalScore <= -3) entryTriggers = [
      { stage: "Now", action: "Reduce immediately (clear 50% first)" },
      { stage: "Signal 1", action: "On support break -> trim more" },
      { stage: "Confirm 2", action: "On a down candle with volume -> full liquidation" }
    ];
    else entryTriggers = [
      { stage: "Now", action: "Begin staged exit (clear 1/3)" },
      { stage: "Signal 1", action: "On a short-term high -> trim another 1/3" },
      { stage: "Confirm 2", action: "On a trend-slowing signal -> keep only part of the core" }
    ];
  } else {
    if (positionAdjust === "noEntry" || (totalScore <= -3)) entryTriggers = [
      { stage: "Now", action: "Stay on the sidelines (no new entry)" },
      { stage: "Signal 1", action: "Rising volume + bullish reversal -> consider entry" },
      { stage: "Confirm 2", action: "Break of prior-day high -> small entry" }
    ];
    else if (totalScore >= 6 && !hasReversedSignal && !hasMidstreamObstacle && positionAdjust !== "cautious") entryTriggers = [
      { stage: "Now", action: "Begin staged entry (1/3)" },
      { stage: "Add 1", action: "On a pullback -> add 1/3" },
      { stage: "Confirm 2", action: "On a new high -> buy the final 1/3" }
    ];
    else if (hasMidstreamObstacle || hasReversedSignal || positionAdjust === "cautious") entryTriggers = [
      { stage: "Now", action: "Small trial entry (1/4)" },
      { stage: "Signal 1", action: "Rising volume + bullish reversal -> add 1/4" },
      { stage: "Confirm 2", action: "Break of prior-day high -> remaining entry (prepare to take quick profit)" }
    ];
    else if (totalScore >= 2) entryTriggers = [
      { stage: "Now", action: "1/3 trial entry" },
      { stage: "Add 1", action: "On trend confirmation -> add 1/3" },
      { stage: "Confirm 2", action: "Approaching target -> final 1/3 entry" }
    ];
    else entryTriggers = [
      { stage: "Now", action: "Stay on the sidelines" },
      { stage: "Signal 1", action: "Rising volume + bullish reversal -> consider entry" },
      { stage: "Confirm 2", action: "Break of prior-day high -> small entry" }
    ];
  }

  let layerRiskLevel = finalRisk;
  if (hasReversedSignal && layerRiskLevel === "moderate") layerRiskLevel = "moderate–high";
  if (hasMidstreamObstacle && layerRiskLevel === "moderate") layerRiskLevel = "moderate–high";
  if (reversedCount >= 2) layerRiskLevel = layerRiskLevel === "very high" ? "very high" : "high";

  let entryRanges = [];
  let exitRanges = [];
  let watchRanges = [];

  if (_blockLevel === 'HARD') {
    entryRanges = []; exitRanges = [];
    watchRanges = ["Sidelines all day — await a trend-reversal signal"];
  } else if (_blockLevel === 'BOTTOM') {
    entryRanges = []; exitRanges = [];
    watchRanges = ["Confirm bottom signal early (09:30–10:30)", "Check for bullish reversal mid-morning (10:30–11:30)"];
  } else if (queryType === "stock") {
    if (totalScore >= 6 && !hasReversedSignal) {
      entryRanges = ["Early-morning stable zone (09:30–10:30)", "Mid-morning (10:30–11:30)"];
      exitRanges = ["Late-morning peak (11:30–12:00)", "Late-afternoon liquidation (14:30–15:20)"];
      watchRanges = ["Market open (09:00–09:30)", "Closing auction (15:20–15:30)"];
    } else if (_blockLevel === 'MEDIUM') {
      entryRanges = []; exitRanges = [];
      watchRanges = ["Sidelines at the open (09:00–10:30)", "If conditions are met, consider mid-morning entry (10:30–11:30)", "Lunch zone (12:00–13:00)"];
    } else if (hasMidstreamObstacle || hasReversedSignal) {
      entryRanges = ["After mid-morning stabilizes (10:30–11:30)"];
      exitRanges = ["Late-morning peak (11:30–12:00)", "Just before the afternoon close (14:30–15:20)"];
      watchRanges = ["Early session (09:00–10:30)", "Lunch zone (12:00–13:00)", "Closing auction (15:20–15:30)"];
    } else if (totalScore >= 2) {
      entryRanges = ["Mid-morning (10:30–11:30)"];
      exitRanges = ["Late-afternoon liquidation (14:30–15:20)"];
      watchRanges = ["Early session (09:00–10:30)", "Late morning (11:30–12:00)", "Lunch zone (12:00–13:00)", "Closing auction (15:20–15:30)"];
    } else {
      entryRanges = [];
      exitRanges = stockIntent === "sell" ? ["Opening gap (09:00–10:00)", "Afternoon close liquidation (14:30–15:20)"] : [];
      watchRanges = ["Sidelines all day (await a trend-reversal signal)"];
    }
  } else if (queryType === "crypto") {
    if (totalScore >= 6) {
      entryRanges = ["Pre-dawn calm (02:00–06:00)", "Morning activity (10:00–12:00)"];
      exitRanges = ["Afternoon peak (14:00–16:00)", "Late-night volatility (22:00–24:00)"];
      watchRanges = ["US market open (22:30–23:30 KST)"];
    } else {
      entryRanges = ["Pre-dawn calm (02:00–06:00)"];
      exitRanges = ["Afternoon peak (14:00–16:00)"];
      watchRanges = ["US session volatility (22:00–02:00 KST)"];
    }
  }

  let criticalRules;
  if (stockIntent === "sell") {
    if (totalScore <= -3) criticalRules = ["Prioritize immediate liquidation", "Don't hold just hoping for a bounce", "Never average down by adding"];
    else if (totalScore >= 6) criticalRules = ["Staged profit-taking — don't dump all at once", "Keep part of the core position", "Act after confirming a peak signal"];
    else criticalRules = ["In profit, avoid greed — take staged profit", "Don't keep holding just for a bounce", "Never add into a short-term bounce"];
  } else {
    if (isNoEntry || totalScore <= -3) criticalRules = ["No new entry", "Prioritize clearing existing positions", "Have an exit plan ready for any bounce"];
    else if (hasMidstreamObstacle || hasReversedSignal) criticalRules = ["Enter early, take quick profit", "Never hold long-term here", "Add only after a re-entry signal"];
    else if (totalScore >= 6) criticalRules = ["Stage your buys — never go full-size at once", "Take staged profit as targets are hit", "Always honor your stop-loss"];
    else criticalRules = ["In profit, avoid greed — sell in stages", "Never add without a plan", "Always honor your stop-loss — no emotional holding"];
  }

  const riskCautions = [];
  if (hasReversedSignal) riskCautions.push("Reversed-card signal — trend may lose durability");
  if (hasMidstreamObstacle) riskCautions.push("Present-card stall signal — short-term volatility up");
  if (totalScore <= -3) riskCautions.push("Downward pressure — watch for a sharp bounce then re-drop");
  if (reversedCount >= 2) riskCautions.push("Multiple reversals — judge entry timing carefully");
  if (riskCautions.length < 3) { riskCautions.push("Don't chase the highs"); riskCautions.push("Don't hold long-term with unrealized profit"); }
  const finalRiskCautions = riskCautions.slice(0, 3);

  const SIGNAL_IMPACT = {
    "The Tower": "false-structure purge — forced-reset signal",
    "Death": "old flow ends — entering a forced-reset zone",
    "The Devil": "recognizing the obsession trap — freedom begins",
    "The Hanged Man": "forced pause — time to gain a new perspective",
    "The Moon": "unclear info — intuition-reliant zone",
    "The Sun": "clear success signal — active action possible",
    "The World": "goal achieved — profit-taking / completion zone",
    "The Star": "hope of recovery — bottom-passing signal",
    "The Chariot": "strong forward drive — breakout energy",
    "Judgement": "awakening / reassessment — review the position",
    "The Fool": "a new start — exploring an unknown opportunity",
    "The Magician": "taking initiative — clear outcome from action",
    "The High Priestess": "heightened intuition — inner signal first",
    "The Empress": "stable growth — abundant flow",
    "The Emperor": "structure established — rule-based action",
    "The Hierophant": "following tradition — back to basics",
    "The Lovers": "a crossroads — a decision is needed",
    "Strength": "inner strength — patience prevails",
    "The Hermit": "solitary reflection — shut out the noise",
    "Wheel of Fortune": "turn of fate — a shift in the flow is near",
    "Justice": "balance restored — a fair outcome",
    "Temperance": "temperance and harmony — a diversified approach"
  };
  function getSignalImpact(card, isReversed, role) {
    let base = SIGNAL_IMPACT[card];
    if (!base) {
      const m = CARD_MEANING[card] || { flow: "energy flow", signal: "watch the direction" };
      base = `${m.flow}`;
    }
    if (isReversed) {
      const reversed = {
        "Page of Cups": "emotion-based entry fails — low-confidence judgment",
        "Knight of Cups": "hasty-proposal illusion — under-verified judgment",
        "Queen of Cups": "emotional over-distortion — reduced objectivity",
        "King of Cups": "loss of composure — risk of emotional decisions",
        "Two of Cups": "relationship rift — failed agreement",
        "Three of Cups": "illusion of success — results fall short",
        "Four of Cups": "opportunity-awareness returns — end of waiting",
        "Five of Cups": "overcoming loss — rediscovering remaining value",
        "Six of Cups": "releasing the past — able to focus on the present",
        "Seven of Cups": "facing reality — the illusion breaks",
        "Eight of Cups": "stagnation persists — unable to leave",
        "Nine of Cups": "results below expectations — psychological distortion",
        "Ten of Cups": "surface stability — inner discontent",
        "Knight of Wands": "loss of drive — direction lost",
        "Queen of Wands": "shrinking confidence — loss of initiative",
        "King of Wands": "weakened leadership — lack of decisiveness",
        "Page of Wands": "cooled passion — lack of motivation",
        "Ace of Wands": "weak starting drive — hard to push forward",
        "Two of Wands": "vague plan — delayed execution",
        "Three of Wands": "waiting comes to nothing — weak results",
        "Four of Wands": "celebration falls through — stability broken",
        "Five of Wands": "conflict resolved — cooperation possible",
        "Six of Wands": "delayed results — under-recognized",
        "Seven of Wands": "defense collapses — position weakened",
        "Eight of Wands": "slowing pace — delayed development",
        "Nine of Wands": "energy depleted — the final step",
        "Ten of Wands": "burden eased — putting the load down",
        "Knight of Swords": "restraining haste — composure returns",
        "Queen of Swords": "weakened coolness — wavering judgment",
        "King of Swords": "weakened authority — lack of resolve",
        "Page of Swords": "distorted info — clouded judgment",
        "Ace of Swords": "vague direction — lack of decision",
        "Two of Swords": "decision forced — avoidance impossible",
        "Three of Swords": "the wound begins to heal — recovery possible",
        "Four of Swords": "rest ends — activity resumes",
        "Five of Swords": "conflict ends — reconciliation possible",
        "Six of Swords": "stagnation — unable to move on",
        "Seven of Swords": "truth surfaces — deception exposed",
        "Eight of Swords": "freed from restraint — liberty restored",
        "Nine of Swords": "worry eases — anxiety relieved",
        "Ten of Swords": "the worst is past — recovery begins",
        "Knight of Pentacles": "steadiness breaks — consistency lost",
        "Queen of Pentacles": "weakened stability — abundance threatened",
        "King of Pentacles": "weakened financial control — exposed to risk",
        "Page of Pentacles": "stalled learning — delayed progress",
        "Ace of Pentacles": "opportunity lost — hard to begin",
        "Two of Pentacles": "balance broken — priorities in disarray",
        "Three of Pentacles": "collaboration fails — go it alone",
        "Four of Pentacles": "obsession released — flow restored",
        "Five of Pentacles": "recovering from lack — help arrives",
        "Six of Pentacles": "unfairness corrected — balance restored",
        "Seven of Pentacles": "patience ends — results emerge",
        "Eight of Pentacles": "reduced focus — scattered effort",
        "Nine of Pentacles": "independence threatened — dependence emerges",
        "Ten of Pentacles": "legacy at risk — stability shaken",
        "The Tower": "forced reset delayed — surface calm (unease remains)",
        "Death": "change refused — stagnation persists",
        "The Devil": "obsession weakens — freedom possible",
        "The Hanged Man": "stalled/delayed — the natural flow is blocked",
        "The Moon": "the fog lifts — truth surfaces",
        "The Sun": "success delayed — the light is veiled",
        "The World": "completion delayed — one step short",
        "The Star": "hope weakens — trust wavers",
        "The Chariot": "loss of drive — direction lost",
        "Judgement": "awakening delayed — change avoided",
        "The Fool": "restraining haste — composure returns",
        "The Magician": "loss of initiative — weakened action",
        "The High Priestess": "clouded intuition — objectivity needed",
        "The Empress": "stalled growth — abundance weakened",
        "The Emperor": "weakened authority — loss of control",
        "The Hierophant": "tradition rejected — seeking a new path",
        "The Lovers": "relationship rift — conflict arises",
        "Strength": "patience at its limit — risk of blow-up",
        "The Hermit": "solitude ends — returning to the world",
        "Wheel of Fortune": "fate stalls — change on hold",
        "Justice": "unfairness — balance disturbed",
        "Temperance": "balance broken — risk of extremes"
      };
      return reversed[card] || `${base} — stalled/delayed (the natural flow is blocked)`;
    }
    return base;
  }

  const _domain = (queryType === "crypto") ? "stock" : (queryType || "stock");
  const _revFlags = revFlags || [false, false, false];

  if (_blockDecision) {
    const _blockExecution = {
      weight: _blockLevel === 'HARD' ? '0% — entry prohibited (not even a small size)'
        : _blockLevel === 'BOTTOM' ? 'up to 20% (only if conditions are met)'
          : _blockLevel === 'MEDIUM' ? '0% (now) — consider a small size after a signal'
            : '5–10% cautious entry (tight stop)',
      stopLoss: _blockLevel === 'HARD' ? 'No entry — stop-loss not needed'
        : _blockLevel === 'BOTTOM' ? 'On entry, enforce -3% (tight)'
          : 'Stop out immediately on a -2–3% break',
      target: _blockLevel === 'HARD' ? 'No entry — target not needed'
        : _blockLevel === 'BOTTOM' ? '+3–5% after the first signal (conditional)'
          : 'Decide after confirming a signal'
    };
    const _blockTiming = (_blockLevel === 'HARD')
      ? null
      : _blockLevel === 'BOTTOM'
        ? { entryRanges: [], exitRanges: [], watchRanges: ['Confirm bottom signal early (09:30–10:30)', 'Volume + bullish-reversal confirmation (10:30–11:30)'] }
        : { entryRanges: [], exitRanges: [], watchRanges: ['Enter when conditions are met — no fixed time'] };

    return {
      queryType,
      trend: finalTrend,
      action: finalAction,
      riskLevel: finalRisk,
      entryStrategy, exitStrategy,
      finalTimingText: _blockDecision.timingNote || 'Enter when conditions are met',
      entryTimingText: 'When conditions are met',
      exitTimingText: '-',
      totalScore, riskScore,
      volatilityScore: calcScore(cleanCards, 'vol'),
      cardNarrative, flowSummary, riskChecks, scenarios, roadmap,
      position: _blockExecution,
      finalOracle,
      isLeverage,
      layers: {
        decision: { ..._blockDecision, cardEvidence, outcomePrediction, blockLevel: _blockLevel },
        execution: _blockExecution,
        timing: _blockTiming,
        signal: {
          past: cardNarrative[0] || '-',
          current: cardNarrative[1] || '-',
          future: cardNarrative[2] || '-',
          pastImpact: getSignalImpact(cleanCards[0], revFlags[0], 'past'),
          currentImpact: getSignalImpact(cleanCards[1], revFlags[1], 'present'),
          futureImpact: getSignalImpact(cleanCards[2], revFlags[2], 'future'),
          summary: flowSummary,
          verdict: _blockLevel === 'HARD' ? 'Strong present-card suppression — no-entry zone'
            : _blockLevel === 'BOTTOM' ? 'Confirming the bottom — exploration possible if conditions met'
              : 'Suppression present — enter after a signal'
        },
        risk: {
          level: _blockLevel === 'HARD' ? 'high (HARD suppression)' : layerRiskLevel,
          volatility: 'possibly increasing',
          cautions: finalRiskCautions
        },
        rules: criticalRules,
        criticalInterpretation: buildCriticalInterpretation(cleanCards, _revFlags, _domain, stockIntent)
      }
    };
  }

  let criticalInterpretation = buildCriticalInterpretation(cleanCards, _revFlags, _domain, stockIntent);

  return {
    queryType,
    trend: finalTrend,
    action: finalAction,
    riskLevel: finalRisk,
    entryStrategy, exitStrategy,
    finalTimingText: timingDetail,
    entryTimingText: entryTimingText || '-',
    exitTimingText: exitTimingText || '-',
    totalScore, riskScore,
    volatilityScore: calcScore(cleanCards, 'vol'),
    cardNarrative, flowSummary, riskChecks, scenarios, roadmap,
    position,
    finalOracle,
    isLeverage,
    layers: {
      decision: {
        position: decisionPosition,
        strategy: decisionStrategy,
        diagnosis,
        cardEvidence,
        outcomePrediction,
        entryTriggers,
        blockLevel: _blockLevel || 'NONE'
      },
      execution: position,
      timing: { entryRanges, exitRanges, watchRanges },
      signal: {
        past: cardNarrative[0] || '-',
        current: cardNarrative[1] || '-',
        future: cardNarrative[2] || '-',
        pastImpact: getSignalImpact(cleanCards[0], revFlags[0], 'past'),
        currentImpact: getSignalImpact(cleanCards[1], revFlags[1], 'present'),
        futureImpact: getSignalImpact(cleanCards[2], revFlags[2], 'future'),
        summary: flowSummary,
        verdict: hasMidstreamObstacle ? "Early upside valid, later unstable" :
          hasReversedSignal ? "Trend valid, watch short-term volatility" :
            totalScore >= 6 ? "Strong uptrend — trend-following is valid" :
              totalScore >= 2 ? "Mild uptrend — staged approach is valid" :
                totalScore <= -3 ? "Downward pressure — refrain from entry" : "Direction-seeking zone — act after a signal"
      },
      risk: {
        level: layerRiskLevel,
        volatility: hasReversedSignal || hasMidstreamObstacle ? "possibly increasing" : (totalScore <= -3 ? "high" : "moderate"),
        cautions: finalRiskCautions
      },
      rules: criticalRules,
      criticalInterpretation: criticalInterpretation
    }
  };
}

/* ════════════════════════════════════════
   FORTUNE HELPERS + METRICS
   (reconstructed to documented design — English)
════════════════════════════════════════ */
function getMoonPhase(date = new Date()) {
  // Approximate synodic phase (29.53059 days), reference new moon 2000-01-06
  const synodic = 29.53058867;
  const ref = Date.UTC(2000, 0, 6, 18, 14, 0) / 86400000;
  const now = date.getTime() / 86400000;
  let age = ((now - ref) % synodic + synodic) % synodic;
  const idx = Math.floor((age / synodic) * 8 + 0.5) % 8;
  const phases = [
    { name: "New Moon", energy: "a time for fresh intentions and quiet starts" },
    { name: "Waxing Crescent", energy: "building momentum — small steps gather force" },
    { name: "First Quarter", energy: "a decision point — push through resistance" },
    { name: "Waxing Gibbous", energy: "refinement before fruition — adjust and persist" },
    { name: "Full Moon", energy: "culmination and clarity — what was hidden surfaces" },
    { name: "Waning Gibbous", energy: "gratitude and release — share what you have gathered" },
    { name: "Last Quarter", energy: "letting go — clear away what no longer serves" },
    { name: "Waning Crescent", energy: "rest and reflection — prepare for the next cycle" }
  ];
  return { ...phases[idx], age: Math.round(age * 10) / 10 };
}

function getNumerologyTime(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const reduce = (n) => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((s, c) => s + Number(c), 0);
    }
    return n;
  };
  const num = reduce(y + m + d);
  const meanings = {
    1: "initiative and independence — a day to lead",
    2: "balance and partnership — a day to cooperate",
    3: "expression and creativity — a day to communicate",
    4: "structure and effort — a day to build foundations",
    5: "change and freedom — a day to adapt",
    6: "harmony and responsibility — a day to nurture",
    7: "insight and reflection — a day to seek truth",
    8: "power and material flow — a day for decisive action",
    9: "completion and compassion — a day to release",
    11: "intuition and inspiration — a heightened spiritual day",
    22: "mastery and large-scale building — a day of great potential",
    33: "service and healing — a day of profound giving"
  };
  return { number: num, meaning: meanings[num] || "a day of balanced energy" };
}

// Deterministic phrasing picker: same cards -> same wording (keeps a reading
// internally consistent) but different draws get different openers, breaking
// the template feel. Hash the card names into a stable index.
// ════════════════════════════════════════════════════════════════
//  EMOTION ENGINE + STYLE SELECTOR
//  Turns cards+score into an emotional state, then picks ONE oracle
//  style (never mixed — mixing is what kills the "human" feel).
//  The chosen style + emotion is also passed to the AI so the actual
//  generated prose carries the same voice.
// ════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════
//  BIAS DETECTOR (QA layer) — analyzes a batch of generated readings
//  for the 4 failure modes that make an oracle feel robotic/biased.
// ════════════════════════════════════════════════════════════════
function detectOutputBias(readings) {
  const issues = [];
  if (!readings || readings.length < 3) return { ok: true, issues };
  const openings = readings.map(r => (r.finalOracle || '').split(/[.!?]/)[0].trim().slice(0, 40));
  const openCounts = {};
  openings.forEach(o => { openCounts[o] = (openCounts[o] || 0) + 1; });
  const maxOpen = Math.max(...Object.values(openCounts));
  if (maxOpen > Math.ceil(readings.length * 0.34)) {
    issues.push({ type: 'tone_repetition', severity: 'medium', fix: 'increase style/variant spread', detail: `one opening repeats ${maxOpen}/${readings.length}` });
  }
  const trends = readings.map(r => (r.trend || '').toLowerCase());
  const allPos = trends.every(t => /favorable|warming|expansive|opening|connected|growing/.test(t));
  const allNeu = trends.every(t => /uncertain|balance|tender|unsettled|seeking/.test(t));
  const allNeg = trends.every(t => /challenging|contracting|cooling|fracturing|guarded|strained/.test(t));
  if (allPos || allNeu || allNeg) {
    issues.push({ type: 'polarity_bias', severity: 'high', fix: 'check score-zone thresholds', detail: allPos ? 'all positive' : allNeg ? 'all negative' : 'neutral overload' });
  }
  const styles = {};
  readings.forEach(r => { if (r.oracleStyle) styles[r.oracleStyle] = (styles[r.oracleStyle] || 0) + 1; });
  const maxStyle = Math.max(0, ...Object.values(styles));
  if (Object.keys(styles).length && maxStyle > Math.ceil(readings.length * 0.7)) {
    issues.push({ type: 'style_drift', severity: 'medium', fix: 'rebalance pickOracleStyle thresholds', detail: JSON.stringify(styles) });
  }
  const lens = readings.map(r => (r.finalOracle || '').length);
  const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
  const variance = lens.reduce((a, b) => a + (b - mean) ** 2, 0) / lens.length;
  const stdev = Math.sqrt(variance);
  if (mean > 0 && stdev / mean < 0.08) {
    issues.push({ type: 'verbosity_imbalance', severity: 'low', fix: 'vary sentence count by style', detail: `length CV ${(stdev / mean).toFixed(3)}` });
  }
  return { ok: issues.length === 0, issues };
}

const MAJOR_ARCANA = new Set(["The Fool","The Magician","The High Priestess","The Empress","The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit","Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"]);
const _LOW_CLARITY_CARDS = new Set(["The Moon","Seven of Cups","The High Priestess","Eight of Swords","Two of Swords","The Hanged Man"]);

function mapEmotion(cleanCards, totalScore, reversedFlags) {
  const rev = reversedFlags || [];
  // valence: overall positive/negative feel, normalized roughly to -1..+1
  const valence = Math.max(-1, Math.min(1, totalScore / 18));
  // tension: major arcana + reversals raise emotional charge
  const majorCount = cleanCards.filter(c => MAJOR_ARCANA.has(c)).length;
  const revCount = rev.filter(Boolean).length;
  let tension = 0.35 + majorCount * 0.13 + revCount * 0.08;
  tension = Math.max(0, Math.min(1, tension));
  // clarity: foggy/ambiguous cards lower it
  const fogCount = cleanCards.filter(c => _LOW_CLARITY_CARDS.has(c)).length;
  let clarity = 0.85 - fogCount * 0.28;
  clarity = Math.max(0.1, Math.min(1, clarity));
  return { valence, tension, clarity };
}

// Pick exactly ONE style. Priority: clarity → tension → valence.
// FLOW = warm continuous; MIRROR = reflective/you-focused; FRAGMENT = short intuitive.
function pickOracleStyle(emo, cleanCards) {
  // Target distribution: FRAGMENT 30% / GROUNDED 30% / DIRECT 20% / REFLECTIVE 15% / POETIC 5%
  // Card-hash creates variance so the same emotional zone doesn't always pick the same style.
  const cards = Array.isArray(cleanCards) ? cleanCards : [];
  let h = 0;
  const s = cards.join('|');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const bucket = h % 100; // 0..99

  // Strong foggy/charged emotional signal → FRAGMENT (highest priority).
  if (emo.clarity <= 0.35) return 'FRAGMENT';
  if (emo.valence <= -0.3 && emo.tension >= 0.7) return 'FRAGMENT';

  // Otherwise, rotate by card-hash with target distribution.
  // POETIC is rare (5%) and only when clarity is high (poetic over-decoration on murky cards is the worst combo).
  if (bucket < 5 && emo.clarity >= 0.7) return 'POETIC';
  if (bucket < 35) return 'FRAGMENT';     // 30% (5..34 if POETIC took 0..4, else 0..29)
  if (bucket < 65) return 'GROUNDED';     // 30%
  if (bucket < 85) return 'DIRECT';       // 20%
  return 'REFLECTIVE';                    // 15%
}

// ══════════════════════════════════════════════════════════════════
// INTERPRETATION LENS ROUTER (Layer 1)
// Picks ONE primary lens for this reading. Weighted deterministic —
// question keywords, card matches, and emotional zone contribute.
// Last-used lens gets a cooldown penalty (Layer 2 cooldown).
// Primary only — never blends lenses (prevents averaging).
// ══════════════════════════════════════════════════════════════════
const LENS_KEYS = ['attachment', 'avoidance', 'burnout', 'grief'];

// Question keyword signals (case-insensitive substring match).
const LENS_QUESTION_KEYWORDS = {
  attachment: [
    "still think about", "think about him", "think about her", "miss him", "miss her",
    "can't move on", "cant move on", "let go", "obsessed", "stuck on",
    "come back", "get back", "reunite", "reach out", "text first",
    "love me", "feel about me", "feel about", "does he like", "does she like",
    "is he the one", "is she the one", "soulmate", "meant to be"
  ],
  avoidance: [
    "should i", "do i need to", "stay", "leave", "wait",
    "afraid", "scared", "anxious about", "what if", "risk",
    "comfortable", "safe choice", "not ready", "too soon",
    "avoid", "ignore", "ghost", "withdraw", "pull away"
  ],
  burnout: [
    "tired", "exhausted", "drained", "too much", "burnt out", "burned out",
    "overwhelm", "overwhelmed", "can't keep up", "cant keep up",
    "no energy", "stretched", "carrying", "weight", "responsibility",
    "career", "job", "work", "boss", "fired", "quit"
  ],
  grief: [
    "lost", "loss", "ended", "ending", "over", "gone",
    "grieve", "grief", "mourn", "miss", "remember",
    "passed", "died", "death", "goodbye", "closure",
    "incomplete", "unfinished", "never said"
  ]
};

// Card affinity — cards that lean strongly toward each lens.
const LENS_CARD_AFFINITY = {
  attachment: [
    "The Lovers", "Two of Cups", "The Empress", "Page of Cups",
    "Knight of Cups", "Nine of Cups", "Ten of Cups",
    "The Devil", "The Moon", "Six of Cups"
  ],
  avoidance: [
    "Two of Swords", "Four of Cups", "Seven of Cups", "Eight of Cups",
    "The Hermit", "The Hanged Man", "Four of Swords",
    "Seven of Swords", "Five of Cups"
  ],
  burnout: [
    "Ten of Wands", "Nine of Wands", "Five of Pentacles",
    "Eight of Swords", "Nine of Swords", "Ten of Swords",
    "Four of Pentacles", "Seven of Pentacles", "The Tower"
  ],
  grief: [
    "Death", "Three of Swords", "Five of Cups", "Eight of Cups",
    "Ten of Swords", "The Tower", "Five of Pentacles",
    "Judgement", "The Moon"
  ]
};

// Emotion-zone affinity (small contribution).
function _lensEmotionAffinity(emo, lens) {
  if (!emo) return 0;
  if (lens === 'attachment') {
    // attachment thrives where valence is mixed-to-negative AND tension is high
    return (emo.valence <= 0 ? 1 : 0) + (emo.tension >= 0.5 ? 1 : 0);
  }
  if (lens === 'avoidance') {
    // avoidance thrives where clarity is low (foggy) OR tension is moderate
    return (emo.clarity <= 0.5 ? 2 : 0) + (emo.tension >= 0.4 && emo.tension <= 0.7 ? 1 : 0);
  }
  if (lens === 'burnout') {
    // burnout thrives where valence is negative AND clarity is mid-to-low
    return (emo.valence <= -0.2 ? 2 : 0) + (emo.clarity <= 0.6 ? 1 : 0);
  }
  if (lens === 'grief') {
    // grief thrives where valence is strongly negative AND tension is moderate
    return (emo.valence <= -0.3 ? 2 : 0) + (emo.tension >= 0.3 && emo.tension <= 0.7 ? 1 : 0);
  }
  return 0;
}

function pickInterpretationLens(prompt, cleanCards, emo, prevLens) {
  const lowerPrompt = String(prompt || '').toLowerCase();
  const cards = Array.isArray(cleanCards) ? cleanCards : [];

  const scores = {};
  for (const lens of LENS_KEYS) {
    let s = 0;
    // (1) Question keywords — strongest signal (weight 5 each)
    for (const kw of LENS_QUESTION_KEYWORDS[lens]) {
      if (lowerPrompt.indexOf(kw) >= 0) s += 5;
    }
    // (2) Card affinity — medium signal (weight 3 each)
    for (const card of cards) {
      if (LENS_CARD_AFFINITY[lens].indexOf(card) >= 0) s += 3;
    }
    // (3) Emotion zone — small contribution (weight 1 per unit)
    s += _lensEmotionAffinity(emo, lens);
    // (4) Baseline so untriggered lenses still have some chance
    s += 1;
    scores[lens] = s;
  }

  // Layer 2 cooldown — strongly discourage same lens twice in a row.
  // Heavy penalty + near-veto: only repeats if NO other lens scored anywhere near.
  if (prevLens && scores[prevLens] !== undefined) {
    scores[prevLens] = scores[prevLens] - 100;  // effectively veto unless other lenses are also negative
  }

  // Pick the lens with highest score. On ties, card-hash tiebreaker for variety.
  let h = 0;
  const hashSrc = cards.join('|') + '|' + lowerPrompt.slice(0, 40);
  for (let i = 0; i < hashSrc.length; i++) h = (h * 31 + hashSrc.charCodeAt(i)) >>> 0;

  let best = LENS_KEYS[0], bestScore = -1;
  // Iterate in hash-shuffled order for tiebreaker fairness
  const order = LENS_KEYS.slice().sort((a, b) => {
    return ((h + a.charCodeAt(0)) >>> 0) - ((h + b.charCodeAt(0)) >>> 0);
  });
  for (const lens of order) {
    if (scores[lens] > bestScore) {
      bestScore = scores[lens];
      best = lens;
    }
  }
  return best;
}

// Lens-specific prompt voices — injected into system prompt.
// Each is 3-5 lines. AI applies the lens to all three cards without a card pool.
// Lens prompts — NATIVE-FIRST design. The lens is a secondary thread, not a
// total reinterpretation. High-impact archetypal cards keep their own meaning.
// This prevents the "every card becomes grief/attachment" homogenization that
// research shows comes from over-applying a persona/lens.
const LENS_NATIVE_PRIORITY = `
CARD PRIORITY: Read each card's primary meaning first. High-impact cards keep their core meaning regardless of lens: Tower (upheaval), Death (transformation), Devil (bondage), Justice (cause-effect), Sun (clarity), World (completion), Fool (new start), Wheel (fate), Judgement (reckoning). Apply lens only where it naturally fits — not forced onto every card.`;

const LENS_PROMPT = {
  attachment: `INTERPRETATION LENS (secondary thread): ATTACHMENT.
Where it naturally fits, notice attachment dynamics — what's being sought or held onto, where longing points. Apply this only to cards where it genuinely resonates, not to every card.
Example (only where fitting): Five of Cups may carry "the version of yourself you hoped to become inside that connection." But a card like The Tower stays as upheaval, not attachment.`,

  avoidance: `INTERPRETATION LENS (secondary thread): AVOIDANCE.
Where it naturally fits, notice what's being avoided — the truth not faced, the choice deferred. Apply only where it genuinely resonates, not to every card.
Example (only where fitting): Four of Cups may carry "staying still feels safer than choosing wrong." But a card like The Sun stays as clarity/vitality, not avoidance.`,

  burnout: `INTERPRETATION LENS (secondary thread): BURNOUT.
Where it naturally fits, notice depletion — what's been carried too long. Apply only where it genuinely resonates, not to every card.
Example (only where fitting): Ten of Wands may carry "the cost of holding it together when no one notices." But a card like The Fool stays as a fresh leap, not exhaustion.`,

  grief: `INTERPRETATION LENS (secondary thread): GRIEF.
Where it naturally fits, notice unfinished loss — what hasn't been mourned. Apply only where it genuinely resonates, not to every card.
Example (only where fitting): Eight of Cups may carry "leaving the version of yourself who still believed." But a card like The Tower stays as sudden upheaval, and Justice stays as cause-and-effect — not mourning.`
};

// ══════════════════════════════════════════════════════════════════
// WEIGHTED SYMBOLIC GRAVITY SYSTEM (3-tier)
// Computes how much each card "pulls" on the spread. When one card is
// significantly heavier, the AI is instructed to let the reading orbit it
// — earned asymmetry, not random. Tiers:
//   0–6  balanced reading (no special instruction)
//   7–8  subtle orbit ("a large part of this reading keeps returning to...")
//   9+   dominant spread ("everything bends back toward...")
// ══════════════════════════════════════════════════════════════════

// Cards that carry extra emotional/conflict weight (used in gravity calc).
const CONFLICT_INTENSITY_CARDS = new Set([
  "Death", "The Tower", "The Devil", "Three of Swords",
  "Five of Cups", "Eight of Swords", "Nine of Swords", "Ten of Swords",
  "Five of Pentacles", "Five of Wands", "The Moon", "Five of Swords"
]);

// Question keywords that resonate with specific card suits/themes.
// Strong match → +3 gravity to that card.
const QUESTION_CARD_RESONANCE = {
  // attachment / longing
  "still think": ["The Lovers", "Two of Cups", "Six of Cups", "Page of Cups", "Knight of Cups"],
  "miss": ["Six of Cups", "Five of Cups", "Page of Cups", "Eight of Cups"],
  "let go": ["The Devil", "Eight of Cups", "Death", "Five of Cups"],
  "obsessed": ["The Devil", "Knight of Cups", "Nine of Swords"],
  // grief / endings
  "lost": ["Death", "Three of Swords", "Five of Cups", "Eight of Cups"],
  "ended": ["Death", "The Tower", "Eight of Cups", "Ten of Swords"],
  "grief": ["Death", "Five of Cups", "Three of Swords"],
  "closure": ["Death", "Judgement", "The World"],
  // avoidance / fear
  "afraid": ["The Hanged Man", "Two of Swords", "Eight of Swords", "Seven of Swords"],
  "not ready": ["The Hanged Man", "Two of Swords", "Four of Cups"],
  "avoid": ["Seven of Swords", "Four of Cups", "The Hermit"],
  "stay": ["Four of Cups", "The Hermit", "Four of Pentacles"],
  "leave": ["Eight of Cups", "Death", "Six of Swords"],
  // burnout / exhaustion
  "tired": ["Ten of Wands", "Nine of Wands", "Four of Swords"],
  "exhausted": ["Ten of Wands", "Five of Pentacles", "Four of Swords"],
  "burden": ["Ten of Wands", "Five of Pentacles"],
  "career": ["Eight of Pentacles", "Three of Pentacles", "Ten of Pentacles"],
  // power / decision
  "should i": ["The Magician", "Two of Swords", "Justice", "The Lovers"],
  "decide": ["Justice", "Two of Swords", "The Lovers"]
};

function _isCard(c) { return typeof c === 'string' && c.length > 0; }

function calculateCardGravity(card, reversed, prompt, allCards) {
  if (!_isCard(card)) return 0;
  let gravity = 0;

  // 1. Major Arcana — archetype weight (+4)
  if (MAJOR_ARCANA.has(card)) gravity += 4;

  // 2. Reversed adds intensity (+2), reversed + conflict-card (+2 more)
  if (reversed) {
    gravity += 2;
    if (CONFLICT_INTENSITY_CARDS.has(card)) gravity += 2;
  } else if (CONFLICT_INTENSITY_CARDS.has(card)) {
    // Upright conflict cards also carry weight, but less than reversed
    gravity += 1;
  }

  // 3. Question resonance — strong contextual pull (+3)
  const lowerPrompt = String(prompt || '').toLowerCase();
  for (const [kw, cards] of Object.entries(QUESTION_CARD_RESONANCE)) {
    if (lowerPrompt.indexOf(kw) >= 0 && cards.indexOf(card) >= 0) {
      gravity += 3;
      break;  // only one resonance bonus per card
    }
  }

  // 4. Repeating suit theme — if 2+ cards share a suit, each one gets +1
  if (Array.isArray(allCards) && allCards.length > 1) {
    const suits = ['Cups', 'Wands', 'Swords', 'Pentacles'];
    for (const suit of suits) {
      if (card.endsWith(' of ' + suit)) {
        const sameSuit = allCards.filter(c => c && c.endsWith(' of ' + suit)).length;
        if (sameSuit >= 2) gravity += 1;
        break;
      }
    }
  }

  return gravity;
}

function calculateGravityProfile(cleanCards, reversedFlags, prompt) {
  const cards = Array.isArray(cleanCards) ? cleanCards : [];
  const revs = Array.isArray(reversedFlags) ? reversedFlags : [];
  const gravities = cards.map((c, i) => ({
    card: c,
    reversed: !!revs[i],
    position: ['Past', 'Present', 'Future'][i] || `Card ${i + 1}`,
    score: calculateCardGravity(c, !!revs[i], prompt, cards)
  }));

  // Sort by gravity (highest first)
  const sorted = [...gravities].sort((a, b) => b.score - a.score);
  const dominant = sorted[0];
  const second = sorted[1];

  // Tier classification — based on dominant card's absolute score AND
  // its margin over the second-place card. Calibrated against scenario-based
  // distribution: most spreads land 3-5, distinctly heavy spreads land 7+.
  let tier = 'balanced';
  if (dominant && dominant.score >= 8 && (dominant.score - (second ? second.score : 0)) >= 2) {
    tier = 'dominant';
  } else if (dominant && dominant.score >= 6) {
    tier = 'subtle';
  }

  return { gravities, dominant, second, tier };
}

// Tier-specific prompt addition. AI is told what KIND of asymmetry, not just
// "be unbalanced." Includes a guard against ignoring other cards.
function buildGravityPromptBlock(profile) {
  if (!profile || !profile.dominant || profile.tier === 'balanced') return '';

  const d = profile.dominant;
  const cardLabel = d.reversed ? `${d.card} (reversed)` : d.card;
  const positionLabel = d.position;

  if (profile.tier === 'subtle') {
    return `\nSYMBOLIC GRAVITY (mild emphasis only):
${cardLabel} in the ${positionLabel} position carries somewhat heavier symbolic weight. Give it slightly more interpretive attention in the body. Do NOT let this override the overall direction, verdict, or other system blocks.`;
  }

  // dominant
  return `\nSYMBOLIC GRAVITY (notable emphasis only):
If one card carries unusual symbolic weight — here, ${cardLabel} in the ${positionLabel} position — allow it to receive slightly more interpretive attention in the body, without overriding the spread's overall direction or verdict. Read all three cards properly. This is emphasis, not domination.`;
}

// Style guidance injected into the AI system prompt (so generated prose matches).
const ORACLE_STYLE_PROMPT = {
  // 30% — short impressions, fragments. The voice you liked.
  FRAGMENT: `VOICE: short, intuitive, human. Brief sentences. Occasional fragments. A little ambiguity. Like a reader speaking as impressions arrive. e.g. "Not fixed. More like movement. Something forming." Avoid long explanatory sentences. Do NOT slip into poetic over-decoration.`,

  // 30% — plain, conversational, like a smart friend reading the cards.
  GROUNDED: `VOICE: grounded and conversational. Talk like a thoughtful friend who happens to read tarot well — plain language, direct observations, occasional dry insight. No mystical decoration, no inner-journey monologue. Just clear reading.`,

  // 20% — emotionally direct, names what's actually happening.
  DIRECT: `VOICE: emotionally direct. Name the feeling and the dynamic plainly. e.g. "There's an unfinished story here. Not a closed one." Cut through hedging. Honest, not harsh. No therapy cadence.`,

  // 15% — quiet reflection, but never therapy-style.
  REFLECTIVE: `VOICE: reflective but compressed. Read both the situation AND the inner state — never reduce everything to "your own growth journey." Use "this may reflect…", "something in you…" sparingly. NO long self-help paragraphs.`,

  // 5% — poetic, sparse. RARE — only when cards truly invite it.
  POETIC: `VOICE: poetic and sparse. Use this voice rarely and only briefly. Image-based, restrained. Stop before it becomes decorative. Real humans are poetic in flashes, not for paragraphs.`
};

// Universal anti-cliché rules — compressed. Critical bans kept, examples trimmed.
const ORACLE_UNIVERSAL_RULES = `
HARD RULES:

BANNED OPENINGS: "My dear one", "Dear seeker", "Beloved", any salutation. Start with the cards or situation.

BANNED PHRASES: "quiet chambers", "unfolding energies", "tapestry of your", "gentle inquiry", "tender stillness", "delicate dance", "whispers of", "the universe is offering", "twin flame", "soul contract", "Trust the journey", "survival strategy".

NO ESSAY CONNECTORS: Avoid "however", "therefore", "this suggests", "looking ahead", "presently", "moving forward", "this created", "this dynamic". Each paragraph = direct observation, not analytical essay.

CONCRETE OVER ABSTRACT: Avoid "alignment", "authenticity", "inner truth", "higher self", "energetic", "self-worth", "genuine growth". Describe lived tension directly — silence, distance, pressure, waiting, hesitation. Example: say "one side keeps carrying more" not "energetic imbalance". Say "steps back when things get defined" not "fear of commitment".

RELATIONSHIP DIVERSITY (love): Love readings must NOT default to self-protection or withdrawal every time. Vary: chemistry, timing, communication gap, admiration, power dynamic, curiosity, life stage mismatch. Relationship ≠ always emotional wound.

SELF-PROTECTION LIMIT: "protect/withdraw/hold back/conserve" appears in fewer than 25% of love readings unless cards strongly justify it.

PHRASE HARD LIMIT: Each of these appears AT MOST ONCE per reading: "lingering", "hesitation", "stillness", "protect", "withdraw", "conserve", "inward", "sacred".

GUIDING PRINCIPLES: Three principles must each start with a DIFFERENT verb or form. Banned repeated openers — never use more than one of these per reading: Notice, Observe, Consider, Reflect, Allow, Cultivate, Recognize, Examine, Define, Acknowledge, Explore, Embrace, Release, Honor, Trust, Seek, Recall, Reconsider, Discern. Instead vary: questions ("What would it mean to stop..."), direct statements ("The pattern here is..."), sharp commands ("Stop waiting for..."), naming ("Name the exact moment when..."), contrasts ("The difference between X and Y is...").

SIGNAL: Must NOT repeat the emotional direction already in the body. Signal = one unexpected resonance the body did not say. Banned generic phrases: "clarity will come once intentions are spoken", "the direction waits on what's said out loud", "something is winding down here".

SENTENCE RHYTHM: Mix short (3-5 words) against longer sentences. Avoid equal-length mechanical rhythm.

POSITIONAL ASYMMETRY (important):
- PAST: 1-2 sentences. Brief background only.
- PRESENT: 3-4 sentences. The heart — go deepest here.
- FUTURE: 2-3 sentences. Point direction, don't over-explain.
Total: ~150-180 words. Never equal length across three cards.

NO REPETITION (critical — this is the most common failure):
- Each of the three cards must carry a DIFFERENT message. Past ≠ Present ≠ Future. If all three cards seem to point at the same idea (e.g. "don't rush", "they withdraw", "hold back"), find what makes each one distinct and lead with that difference. Never let the reading become one theme restated three times.
- The Position, Signal, Risk, Guiding Principles, and Deep Interpretation must EACH add NEW information — not restate the body. If the body already said "they pull back", the Risk must NOT also say "don't push them" and the Signal must NOT also say "they withdraw". Every section earns its place by saying something the others did not.
- Before finishing, check: am I saying the same thing in four different boxes? If yes, change three of them to cover different angles (one on action, one on timing, one on what to watch, one on what it means).

PARAGRAPH STRUCTURE: Three SEPARATE paragraphs with blank lines between. Never merge into one block.

REQUIRED: Read the SITUATION (relationship, context, dynamics), not only the querent's inner journey. Sound like a real human reader, not a therapist's script. End with a grounded observation, not a benediction.

CARD READING DEPTH:
- REVERSED CARD NATIVE MEANING: Sun rev = forced joy/performance. High Priestess rev = knowing but refusing to see. Hanged Man rev = refusing the pause. Tower rev = avoiding collapse. Moon rev = deliberate self-deception. Death rev = clinging to what must end. Devil rev = breaking free or deeper entrapment. Read the SPECIFIC reversed meaning, not generic "blockage".
- When multiple reversed cards appear, do NOT collapse into one repeating theme. Each reversed card = different domain of resistance.

END BLOCKS (write AFTER main oracle body):
GUIDE_START
• [guidance line 8-22 words]
• [guidance line 8-22 words]
• [guidance line 8-22 words]
GUIDE_END
CAUTION_START
• [1 practical caution 8-22 words — concrete, not a restatement of body]
CAUTION_END
CLOSING_START
[1 closing line 10-25 words — grounded observation, not emotional restatement]
CLOSING_END

CRITICAL: Write the full reading FIRST, then END BLOCKS. Do NOT start with GUIDE_START.`;

function pickVariant(cleanCards, variants) {
  let h = 0;
  const s = (cleanCards || []).join('|');
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return variants[h % variants.length];
}

function buildFortuneMetrics({ totalScore, riskScore, cleanCards, reversedFlags, prompt, domain }) {
  const revFlags = reversedFlags || [false, false, false];
  const isDecision = domain === 'decision';

  // Action is driven by the SAME basis as trend (totalScore) so they can never
  // 3-zone polarity. The neutral band is intentionally wide so middling draws
  // resolve to "observe/wait" instead of defaulting to forward-leaning.
  const signal = getDecisionMajority(cleanCards, revFlags); // BUY / HOLD / SELL
  let posBias; // GO / OBSERVE / HOLD_BACK
  if (totalScore >= 5) posBias = "GO";
  else if (totalScore <= -5) posBias = "HOLD_BACK";
  else {
    // mid zone (-4..+4): let card-majority tilt, but only a clear majority moves
    // it off "observe"; a weak/mixed signal stays as genuine uncertainty.
    if (signal === "BUY" && totalScore >= 2) posBias = "GO";
    else if (signal === "SELL" && totalScore <= -2) posBias = "HOLD_BACK";
    else posBias = "OBSERVE";
  }

  // trend label derived from the same zones (consistent with posBias)
  let trend;
  if (posBias === "GO") trend = totalScore >= 9 ? "strongly favorable" : "favorable";
  else if (posBias === "HOLD_BACK") trend = totalScore <= -9 ? "strongly challenging" : "challenging";
  else trend = "uncertain — finding direction";

  let action;
  if (isDecision) {
    action = posBias === "GO"
      ? pickVariant(cleanCards, [
          "A step forward may feel natural here, if it feels right",
          "Conditions seem to favor a measured move ahead",
          "Moving forward — deliberately, not impulsively — looks supported",
          "This may be a moment that quietly invites action"
        ])
      : posBias === "HOLD_BACK"
        ? pickVariant(cleanCards, [
            "This may be a moment that asks for more time before anything is decided",
            "Holding the decision longer may serve better than deciding now",
            "The clearer answer may want one more piece of information first",
            "Letting this rest a little longer may reveal what isn't yet visible"
          ])
        : pickVariant(cleanCards, [
            "A little more clarity may want to settle before this becomes clear",
            "The shape of the choice is still forming — give it room",
            "Something is still resolving underneath — patience reads more honest than action",
            "This sits in between right now — let it find its own edge"
          ]);
  } else {
    action = posBias === "GO"
      ? pickVariant(cleanCards, [
          "This may align with a season of forward movement",
          "The current seems to be opening — small, steady steps fit",
          "Conditions feel supportive of gentle momentum",
          "Something is genuinely warming — there is room to engage"
        ])
      : posBias === "HOLD_BACK"
        ? pickVariant(cleanCards, [
            "This may speak more to patience and gentle self-care than to action",
            "Conserving energy may serve better than spending it outward right now",
            "The flow asks for tending to your own ground, not reaching",
            "A quieter season suits this — restore before re-engaging"
          ])
        : pickVariant(cleanCards, [
            "This may be a time for watching and letting the direction settle on its own",
            "Letting the pattern reveal itself reads stronger than forcing it",
            "The next direction is still forming — observation matters more than effort",
            "Something is still settling — clarity comes from stillness here"
          ]);
  }

  let riskLevel = "moderate";
  if (riskScore >= 7) riskLevel = "high";
  else if (riskScore >= 4) riskLevel = "elevated";

  const moonPhase = getMoonPhase();
  const numerology = getNumerologyTime();

  const posLabels = ["Past", "Present", "Future"];
  const cardNarrative = cleanCards.map((c, i) => {
    const m = cardMeaning(c);
    const isRev = revFlags[i] === true;
    const flavor = getCardFlavor(c, isRev);
    return `${posLabels[i] || '?'} (${isRev ? c + ' reversed' : c}): ${flavor} — ${m.flow}`;
  });

  const firstScore = (CARD_SCORE[cleanCards[0]] ?? 0) * (revFlags[0] ? -1 : 1);
  const lastScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
  const _rising = lastScore > firstScore;
  const _falling = lastScore < firstScore;
  // flowSummary is fully SUBORDINATE to posBias so it can never contradict
  // the trend / action / closing. Card-order only colors the wording.
  let flowSummary;
  if (posBias === 'GO') {
    flowSummary = _rising
      ? pickVariant(cleanCards, [
          "There is movement toward something brighter — the current is turning in your favor.",
          "Something is gathering momentum beneath the surface, and it leans your way.",
          "The pattern suggests a rising tide — energy is building in your favor.",
          "Step by step, the way ahead is opening — the momentum runs with you."
        ])
      : pickVariant(cleanCards, [
          "Even after an early dip, the deeper current seems to run in your favor.",
          "There were rough patches, yet the overall direction still tilts toward you.",
          "The early turbulence settles — on the whole, the energy supports you."
        ]);
  } else if (posBias === 'HOLD_BACK') {
    flowSummary = _rising
      ? pickVariant(cleanCards, [
          "A late spark appears, but the wider current still runs against you — tread gently.",
          "Something brightens near the end, yet the overall pattern stays heavy for now.",
          "There is a flicker of lift, though the deeper flow still asks for caution."
        ])
      : pickVariant(cleanCards, [
          "The energy seems to be drawing inward — a time to conserve rather than reach.",
          "Something is winding down here — the current invites rest over effort.",
          "The pattern suggests a contracting season — gather your strength gently."
        ]);
  } else { // OBSERVE
    flowSummary = pickVariant(cleanCards, [
      "The energy holds in a quiet balance — clarity may come once you name what you want.",
      "Things feel poised between directions — the picture is still forming.",
      "There is a pause in the pattern — the next step isn't yet clear."
    ]);
  }

  const futCard = cleanCards[2];
  const futRev = revFlags[2];
  const futFlavor = getCardFlavor(futCard, futRev);
  const futLabel = futRev ? `${futCard} (reversed)` : futCard;

  const scenarios = {
    best: `Best case: if you align with the ${moonPhase.name} energy (${moonPhase.energy}), ${futLabel} brings ${futFlavor}.`,
    likely: `Likely case: holding to balance and patience, the present flow continues steadily.`,
    caution: `Caution: ignoring the inner signal risks repeating an old pattern — stay aware.`
  };

  const roadmap = (totalScore >= 2) ? [
    "Now: act on your strongest intuition — the door is open.",
    "Soon: a small confirming sign will appear — follow it.",
    "Then: commit fully once the direction holds.",
    "Throughout: keep your inner stability — it is your compass."
  ] : [
    "Now: pause and observe rather than act.",
    "Soon: watch for a clear shift in the flow.",
    "Then: move only after the signal confirms.",
    "Throughout: protect your peace — patience is the wiser path."
  ];

  const closing = posBias === "GO"
    ? (isDecision ? "The path is open — a committed step now can carry you forward." : "What you begin now can bear good fruit — trust the flow.")
    : posBias === "HOLD_BACK"
      ? (isDecision ? "This may not be the moment to commit — let the situation ripen first." : "Now is a time for patience and protection rather than new beginnings.")
      : "Wait for the fog to lift — the answer is forming.";

  // Decision readings are not daily horoscopes — drop moon/numerology framing.
  // 3-tone oracle mix: flow (flowSummary) + observation + reflection.
  // Each tone is deterministic per card combo so a reading stays consistent.
  const observationTone = pickVariant(cleanCards, posBias === 'GO' ? [
    "Something is quietly forming beneath the surface.",
    "There is a sense of pieces beginning to align.",
    "An undercurrent seems to be gathering shape."
  ] : posBias === 'HOLD_BACK' ? [
    "Something beneath the surface is still working itself out.",
    "There is a sense of things needing to settle before they clear.",
    "An old pattern seems to be asking for attention first."
  ] : [
    "Something is taking shape, though its form isn't clear yet.",
    "There is a quiet in-between quality to this moment.",
    "The picture seems to be still developing beneath the surface."
  ]);
  const reflectionTone = pickVariant([...cleanCards].reverse(), posBias === 'GO' ? [
    "More than an outcome, this speaks to trusting your own readiness.",
    "This points less to what happens next and more to your alignment with it.",
    "At heart, this is about meeting the moment as yourself."
  ] : posBias === 'HOLD_BACK' ? [
    "More than a verdict, this speaks to protecting your own steadiness.",
    "This points less to the situation and more to your relationship with patience.",
    "At heart, this is an invitation to tend to yourself first."
  ] : [
    "More than an answer, this speaks to sitting honestly with the uncertainty.",
    "This points less to a direction and more to listening inward.",
    "At heart, this is about clarity you give yourself, not one you're handed."
  ]);

  const finalOracle = isDecision
    ? `${flowSummary} ${observationTone} The cards weigh your choice as ${trend}, and ${futLabel} points toward ${futFlavor}. ${closing} ${reflectionTone}`
    : `${flowSummary} ${observationTone} With ${futLabel} ahead suggesting ${futFlavor}, the ${moonPhase.name} (${moonPhase.energy}) and a numerology vibration of ${numerology.number} (${numerology.meaning}) color today's reflection. ${closing} ${reflectionTone}`;

  const criticalInterpretation = buildCriticalInterpretation(cleanCards, revFlags, "fortune", "buy");

  const timingLayer = isDecision
    ? {
        guidance: posBias === "GO" ? "The window is open — act while the momentum holds."
          : posBias === "HOLD_BACK" ? "Give it time — revisit once conditions settle."
            : "Await a clearer sign before you commit."
      }
    : {
        moonPhase: `${moonPhase.name} — ${moonPhase.energy}`,
        numerology: `${numerology.number} — ${numerology.meaning}`,
        guidance: posBias === "GO" ? "Favorable window now through the next phase."
          : posBias === "HOLD_BACK" ? "Defer action until the next cycle."
            : "Await a clearer signal before acting."
      };

  return {
    domain: isDecision ? "decision" : "fortune",
    trend, action, riskLevel,
    totalScore, riskScore,
    moonPhase, numerology,
    cardNarrative, flowSummary, scenarios, roadmap,
    finalOracle,
    layers: {
      decision: {
        position: posBias === "GO" ? (isDecision ? "Proceed" : "Act (Favorable)")
          : posBias === "HOLD_BACK" ? (isDecision ? "Hold" : "Withhold (Protect)")
            : (isDecision ? "Deliberate" : "Observe (Wait)"),
        strategy: action,
        diagnosis: isDecision ? `The cards weigh this choice as ${trend}.` : `The current flow is ${trend}.`,
        outcomePrediction: closing
      },
      timing: timingLayer,
      signal: {
        past: cardNarrative[0] || '-',
        current: cardNarrative[1] || '-',
        future: cardNarrative[2] || '-',
        summary: flowSummary,
        verdict: trend
      },
      risk: {
        level: riskLevel,
        cautions: scenarios.caution ? [scenarios.caution] : []
      },
      rules: isDecision ? [
        "Separate fear from genuine intuition.",
        "A clear 'no' is also a valid answer.",
        "Decide from values, not pressure."
      ] : [
        "Trust intuition over impulse.",
        "Do not force what is not ready.",
        "Inner stability comes before outward action."
      ],
      criticalInterpretation
    }
  };
}

/* ════════════════════════════════════════
   ENGLISH ENGINE + ROUTING
   (reconstructed to documented design)
════════════════════════════════════════ */
function resolveBlock(ctx) {
  // Top-level guard: only short-circuit on a HARD block of the present card.
  const { cleanCards, reversedFlags, intent } = ctx;
  if (intent === 'sell') return null;
  const currentCard = cleanCards[1];
  const isRev = reversedFlags[1] || false;
  const level = getBlockLevel(currentCard, isRev);
  if (level !== 'HARD') return null;
  const futureScore = CARD_SCORE[cleanCards[2]] ?? 0;
  const decision = buildBlockDecision('HARD', 'buy', futureScore, currentCard, isRev);
  return { level, currentCard, isRev, decision };
}

function buildBlockedResponse(block, domain) {
  const d = block.decision || {};
  return {
    domain,
    blocked: true,
    trend: "blocked — strong suppression",
    action: d.position || "Hold (no entry)",
    riskLevel: "high",
    finalOracle: `${block.currentCard}${block.isRev ? ' (reversed)' : ''} is exerting a strong suppressive energy. ${d.diagnosis || 'Entry itself is prohibited until the energy shifts.'}`,
    layers: {
      decision: {
        position: d.position || "Hold (no entry)",
        strategy: d.strategy || "Re-examine only after a trend-reversal signal.",
        diagnosis: d.diagnosis || "",
        entryTriggers: d.entryTriggers || [],
        blockLevel: block.level
      },
      timing: { guidance: d.timingNote || "Signal-based only — no fixed-time entry." },
      signal: { verdict: "HARD suppression — no-entry zone" },
      risk: { level: "high", cautions: ["No new entry until energy shifts."] },
      rules: ["Do not enter — not even a small position.", "Wait for a confirmed reversal."],
      criticalInterpretation: ""
    }
  };
}

function runStockEngine(ctx) {
  // Wealth Energy / Abundance Flow engine.
  // IMPORTANT: This is a non-financial, symbolic reading. It deliberately does
  // NOT call buildStockMetrics (which produces trade-style numbers). It emits
  // no prices, percentages, stop-losses, targets, tickers, or buy/sell directives.
  return runWealthEngine(ctx);
}

function runWealthEngine(ctx) {
  const { totalScore, riskScore, cleanCards, reversedFlags, prompt } = ctx;
  const revFlags = reversedFlags || [false, false, false];

  // The subject is abstracted toward inner value & self-worth, away from
  // anything resembling a specific asset, market, or financial instrument.
  const subjectName = "your sense of value and what you're cultivating";

  // Internal energy enum (logic only; never a trade signal)
  let energyKey = "BALANCED";
  if (totalScore >= 6) energyKey = "EXPANSIVE";
  else if (totalScore >= 2) energyKey = "OPENING";
  else if (totalScore <= -6) energyKey = "CONTRACTING";
  else if (totalScore <= -2) energyKey = "GUARDED";

  const TREND_LABEL = {
    EXPANSIVE: "expansive, abundant energy",
    OPENING: "gently opening energy",
    BALANCED: "steady, self-defining energy",
    GUARDED: "guarded, inward-turning energy",
    CONTRACTING: "contracting, restoring energy"
  };
  const trend = TREND_LABEL[energyKey];

  // "Action" as a gentle reflection with a soft direction (interpretation,
  // not instruction). Centered on inner posture and self-worth.
  const ACTION_LABEL = {
    EXPANSIVE: "This may align with a season of opening toward what you truly value.",
    OPENING: "Something may be gently warming — there is room for grounded, unhurried steps.",
    BALANCED: "This may be a time to let clarity settle before leaning in any direction.",
    GUARDED: "This may speak to tending your own sense of worth before reaching outward.",
    CONTRACTING: "This may be a season for restoring and reconnecting with what matters, more than pushing."
  };
  const action = ACTION_LABEL[energyKey];

  // Risk reframed as "turbulence", purely symbolic.
  let riskLevel = "steady";
  if (riskScore >= 7) riskLevel = "turbulent";
  else if (riskScore >= 4) riskLevel = "shifting";

  const posLabels = ["Past", "Present", "Future"];
  const cardNarrative = cleanCards.map((c, i) => {
    const m = cardMeaning(c);
    const isRev = revFlags[i] === true;
    const flavor = getCardFlavor(c, isRev);
    return `${posLabels[i] || '?'} (${isRev ? c + ' reversed' : c}): ${flavor}`;
  });

  const firstScore = (CARD_SCORE[cleanCards[0]] ?? 0) * (revFlags[0] ? -1 : 1);
  const lastScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
  const _rising = lastScore > firstScore;
  // flowSummary subordinate to energyKey so it never contradicts trend/closing.
  // Phrased around inner value, not resources/money.
  let flowSummary;
  if (energyKey === "EXPANSIVE" || energyKey === "OPENING") {
    flowSummary = _rising
      ? pickVariant(cleanCards, [
          "Something is opening within your sense of worth — a quiet momentum is gathering.",
          "An inner sense of value is steadily becoming more grounded — small recognitions are landing.",
          "Worth feels less like a question and more like a settling — the ground beneath your value is firming.",
          "A quiet expansion in self-regard is underway — what you bring is registering more clearly."
        ])
      : pickVariant(cleanCards, [
          "Even after an early dip, your inner sense of value is steadily opening.",
          "Despite a rough patch, the deeper current around worth is turning toward fullness.",
          "An early shadow gave way — your sense of enough is gradually returning.",
          "Past doubt is loosening; the felt sense of value is widening again."
        ]);
  } else if (energyKey === "CONTRACTING" || energyKey === "GUARDED") {
    flowSummary = _rising
      ? pickVariant(cleanCards, [
          "A late lift appears, yet the deeper current still feels restricted — move with care.",
          "Brightness near the end, but the underlying sense of worth still asks for protection.",
          "Something eases late, though the inner ground around value remains tender."
        ])
      : pickVariant(cleanCards, [
          "The energy feels restricted around value and self-worth — a time to restore rather than expand.",
          "A contraction in self-regard is real here — replenishment matters more than reaching.",
          "Worth feels tightened right now — this is a season for repair, not push.",
          "Inner resources feel thin — let the well refill before drawing from it."
        ]);
  } else { // BALANCED
    flowSummary = pickVariant(cleanCards, [
      "The energy holds in balance — clarity comes once you reconnect with what you truly value.",
      "Worth sits in a quiet middle place — naming what genuinely matters is what tips it.",
      "Inner value rests in stillness — the next definition comes from honesty, not effort.",
      "There is a pause in the pattern of self-worth — what you choose to honor will shape what follows."
    ]);
  }

  const futCard = cleanCards[2];
  const futRev = revFlags[2];
  const futFlavor = getCardFlavor(futCard, futRev);
  const futLabel = futRev ? `${futCard} (reversed)` : futCard;

  const closing = energyKey === "EXPANSIVE" || energyKey === "OPENING"
    ? "There is room for growth here — stay grounded in what genuinely matters to you, and let it unfold."
    : energyKey === "CONTRACTING" || energyKey === "GUARDED"
      ? "This may be a season for restoring your inner sense of enough, rather than reaching outward."
      : "Let your own sense of value settle before you lean in any direction.";

  const _posE = (energyKey === "EXPANSIVE" || energyKey === "OPENING");
  const _negE = (energyKey === "CONTRACTING" || energyKey === "GUARDED");
  const valObservation = pickVariant(cleanCards, _posE ? [
    "Something is quietly opening in how you hold your own worth.",
    "There is a sense of value settling into place beneath the surface.",
    "An inner steadiness seems to be gathering."
  ] : _negE ? [
    "Something beneath the surface is asking you to reconnect with what's enough.",
    "There is a sense of energy that has been spread too thin.",
    "An old story about not-enough seems to be surfacing for release."
  ] : [
    "Something is shifting in how you measure your own worth.",
    "There is a quiet, in-between quality to where you stand.",
    "Your sense of value seems to be still finding its center."
  ]);
  const valReflection = pickVariant([...cleanCards].reverse(), _posE ? [
    "More than any outcome, this speaks to trusting that you are enough.",
    "This points less to gain and more to alignment with what you value.",
    "At heart, this is about worth you carry, not worth you chase."
  ] : _negE ? [
    "More than circumstances, this speaks to restoring your inner sense of enough.",
    "This points less to lack and more to where your energy wants tending.",
    "At heart, this is an invitation to reconnect with what truly matters to you."
  ] : [
    "More than a direction, this speaks to clarifying what you actually value.",
    "This points less to a goal and more to listening inward.",
    "At heart, this is about meaning you define for yourself."
  ]);
  const finalOracle = `${flowSummary} ${valObservation} ${futLabel} suggests ${futFlavor}. ${closing} ${valReflection} This is a symbolic reflection on self-worth and intention — not financial advice.`;

  // Self-contained, non-financial summary (does NOT use the shared
  // buildCriticalInterpretation, which emits buy/sell/entry trade language).
  const criticalInterpretation = `${flowSummary}\nThe energy of ${futLabel} suggests ${futFlavor}.\n${closing}`;

  return {
    domain: 'stock',
    subjectName,
    trend, action, riskLevel,
    totalScore, riskScore,
    volatilityScore: calcScore(cleanCards, 'vol'),   // shown as an abstract "energy intensity" %
    cardNarrative, flowSummary,
    finalOracle,
    disclaimer: "Inner Abundance readings are symbolic reflections on self-worth and personal values, for entertainment and self-insight only. They are not financial, investment, or trading advice, and do not reference any specific security.",
    layers: {
      decision: {
        position: `Inner abundance: ${trend}`,
        strategy: action,
        diagnosis: `The energy around ${subjectName} currently reads as ${trend}.`,
        cardEvidence: `${cardNarrative[1] || '-'} -> ${cardNarrative[2] || '-'}`,
        outcomePrediction: closing,
        blockLevel: 'NONE'
      },
      execution: {
        focus: energyKey === "EXPANSIVE" ? "strong and clear"
          : energyKey === "OPENING" ? "warming and steady"
            : energyKey === "BALANCED" ? "watchful and open"
              : energyKey === "GUARDED" ? "protective and measured"
                : "conserving and patient",
        grounding: "When the energy feels off or rushed, step back and protect your peace.",
        aspiration: `What ${subjectName} may grow toward if the energy is honored.`
      },
      timing: {
        guidance: energyKey === "EXPANSIVE" || energyKey === "OPENING"
          ? "Favorable moments arrive when you feel clear, calm, and unhurried."
          : "Give it space — revisit when the energy feels settled rather than pressured."
      },
      signal: {
        past: cardNarrative[0] || '-',
        current: cardNarrative[1] || '-',
        future: cardNarrative[2] || '-',
        summary: flowSummary,
        verdict: trend
      },
      risk: {
        level: riskLevel,
        cautions: [
          "Let intention, not impulse, guide your choices.",
          "Protect your inner stability before any outward move.",
          "This reading is symbolic — make your own informed decisions."
        ]
      },
      rules: [
        "Treat this as reflection, not instruction.",
        "Ground your energy before acting on anything.",
        "Seek qualified professionals for real financial decisions."
      ],
      criticalInterpretation
    }
  };
}

function _legacyRunStockEngine_DISABLED(ctx) {
  const { totalScore, riskScore, cleanCards, reversedFlags,
    isLeverage, prompt, intent } = ctx;

  // English subject (reuses the EN extractor)
  const subjectRaw = extractSubjectEN(prompt);
  const subjectName = (subjectRaw && subjectRaw.length >= 2) ? subjectRaw : 'this asset';

  // Reuse the (verbatim) Korean stock engine internals for structured layers
  const kr = buildStockMetrics({
    totalScore, riskScore, cleanCards, isLeverage,
    queryType: 'stock', prompt, intent, reversedFlags
  });

  // Override top-level summary fields with English
  let enTrend = "neutral";
  if (totalScore >= 6) enTrend = "strong uptrend";
  else if (totalScore >= 2) enTrend = "uptrend";
  else if (totalScore <= -6) enTrend = "strong downtrend";
  else if (totalScore <= -2) enTrend = "downtrend";

  let enAction;
  if (intent === 'sell') {
    if (totalScore <= -3) enAction = "Full exit — protect against further loss";
    else if (totalScore >= 6) enAction = "Hold to peak — stage partial profit-taking";
    else if (totalScore >= 2) enAction = "Partial exit — staged profit-taking";
    else enAction = "Conditional exit — confirm trend first";
  } else {
    if (totalScore <= -3) enAction = "No entry — defensive watch";
    else if (totalScore >= 6) enAction = "Strong buy — staged entry";
    else if (totalScore >= 2) enAction = "Split buy — confirm then scale";
    else enAction = "Wait & see — observe the flow";
  }

  let enRisk = "moderate";
  if (riskScore >= 7 || isLeverage) enRisk = "very high";
  else if (riskScore >= 4) enRisk = "high";

  return {
    ...kr,
    domain: 'stock',
    subjectName,
    trend: enTrend,
    action: enAction,
    riskLevel: enRisk,
    volatilityScore: calcScore(cleanCards, 'vol')
  };
}

function runFortuneEngine(ctx) {
  const { totalScore, riskScore, cleanCards, reversedFlags, prompt, domain } = ctx;
  const metrics = buildFortuneMetrics({ totalScore, riskScore, cleanCards, reversedFlags, prompt, domain });
  metrics.volatilityScore = calcScore(cleanCards, 'vol');
  return metrics;
}

/* ════════════════════════════════════════
   LOVE ENGINE (wires analyzeRelationship + love block
   into the same layers{} shape as fortune/stock)
════════════════════════════════════════ */
function buildLoveMetrics({ totalScore, riskScore, cleanCards, reversedFlags, prompt, synergies }) {
  const revFlags = reversedFlags || [false, false, false];
  const rel = analyzeRelationship(cleanCards);
  const subtype = detectLoveSubtype(prompt || '');
  const isReflection = subtype === 'reflection';

  // Love-specific block on the present card (HARD/MEDIUM/SOFT)
  const currentCard = cleanCards[1];
  const currentRev = revFlags[1] || false;
  const blockLevel = detectLoveBlock(currentCard, currentRev);

  // ── ONE reconciled basis for everything ──
  // Combine the card score (totalScore) with the relationship signal.
  // The card score is the PRIMARY driver (it has real polarity spread);
  // relScore only nudges, so we don't collapse everything to the middle.
  // relScore: positive = connection supported, negative = strained.
  const relScore = (rel.attachment - 50) * 0.4
    + (rel.communication - 50) * 0.3
    + (rel.reconciliation - 50) * 0.3
    - rel.instability * 0.3
    - (rel.obsession >= 80 ? 20 : 0);
  // Card score dominates; relScore nudges within ±~3.
  let bias = totalScore + Math.max(-3, Math.min(3, relScore / 12));
  if (blockLevel === 'HARD') bias -= 6;
  else if (blockLevel === 'MEDIUM') bias -= 2;

  // ── 3-ZONE EMOTIONAL SYSTEM (forces real polarity, not middle-clustering) ──
  // SEPARATION (strained) / UNRESOLVED (mixed) / CONNECTION (supported)
  let loveZone;
  if (blockLevel === 'HARD') loveZone = 'SEPARATION';
  else if (rel.obsession >= 80 && rel.instability >= 60) loveZone = 'SEPARATION';
  else if (bias >= 3) loveZone = 'CONNECTION';
  else if (bias <= -3) loveZone = 'SEPARATION';
  else loveZone = 'UNRESOLVED';

  const posBias = loveZone === 'CONNECTION' ? 'GO'
    : loveZone === 'SEPARATION' ? 'HOLD_BACK' : 'CAUTION';

  // Trend label: derived from the SAME bias (and relationshipType for color).
  let trend;
  if (posBias === 'HOLD_BACK') {
    trend = (rel.relationshipType === 'collapse' || blockLevel === 'HARD') ? 'fracturing'
      : (rel.relationshipType === 'obsessive') ? 'intense but unstable'
      : (rel.relationshipType === 'silent-withdrawal') ? 'distant — communication strained'
      : 'cooling';
  } else if (posBias === 'GO') {
    trend = (rel.relationshipType === 'soulmate') ? 'deeply connected'
      : (rel.relationshipType === 'stable') ? 'stable and growing'
      : 'warming';
  } else {
    // UNRESOLVED — vary by which way it leans, so it's not a single flat label
    trend = bias >= 1 ? 'tender but warming'
      : bias <= -1 ? 'tender but uncertain'
      : 'held in quiet balance';
  }

  // Action / position from the SAME posBias.
  let action, position;
  if (posBias === 'HOLD_BACK') {
    if (blockLevel === 'HARD') {
      action = pickVariant(cleanCards, [
        "This may speak more to pausing than to reaching out right now",
        "Reaching out may not serve here — the ground for it isn't ready",
        "Quiet may carry more weight than contact in this moment"
      ]);
      position = "Hold back (block present)";
    } else if (rel.obsession >= 80) {
      action = pickVariant(cleanCards, [
        "This may be a moment to gently protect your peace and ease away from the intensity",
        "Stepping back from the loop may matter more than understanding it right now",
        "Loosening the grip on the outcome may bring real relief"
      ]);
      position = "Protect yourself";
    } else if (rel.instability >= 70) {
      action = pickVariant(cleanCards, [
        "This may ask for steadying yourself before anything is said or done",
        "Finding your own ground first may matter more than any move toward the other",
        "Settling internally reads more important than acting outwardly here"
      ]);
      position = "Stabilize before acting";
    } else {
      action = pickVariant(cleanCards, [
        "This may speak to letting the connection breathe before any move",
        "Giving the bond space may reveal what closeness can't",
        "Pulling back gently may serve the connection more than pushing forward"
      ]);
      position = "Hold back";
    }
  } else if (posBias === 'GO') {
    action = pickVariant(cleanCards, [
      "An honest, open-hearted step may feel natural here, if it feels right",
      "A genuine reach toward the other reads aligned with the energy",
      "Speaking what you actually feel may be the move this asks for",
      "Showing up openly may meet the current of this connection"
    ]);
    position = "Move forward";
  } else { // CAUTION
    action = pickVariant(cleanCards, [
      "This may be a time to watch gently and let the dynamic settle on its own",
      "Holding presence without acting may be the strongest move right now",
      "Letting the bond reveal its direction may matter more than steering it",
      "Stillness may read more honest than effort in this moment"
    ]);
    position = "Observe & wait";
  }

  let riskLevel = "moderate";
  if (rel.instability >= 80 || riskScore >= 7 || rel.obsession >= 80) riskLevel = "high";
  else if (rel.instability >= 50 || riskScore >= 4) riskLevel = "elevated";

  const posLabels = ["Past", "Present", "Future"];
  const cardNarrative = cleanCards.map((c, i) => {
    const isRev = revFlags[i] === true;
    const flavor = getLoveCardFlavor(c, isRev);
    return `${posLabels[i] || '?'} (${isRev ? c + ' reversed' : c}): ${flavor}`;
  });

  // flowSummary gated by posBias so it can't say "gaining warmth" in a HOLD_BACK reading.
  const firstScore = (CARD_SCORE[cleanCards[0]] ?? 0) * (revFlags[0] ? -1 : 1);
  const lastScore = (CARD_SCORE[cleanCards[2]] ?? 0) * (revFlags[2] ? -1 : 1);
  let flowSummary;
  if (posBias === 'HOLD_BACK') {
    flowSummary = (lastScore > firstScore)
      ? pickVariant(cleanCards, [
          "A late softening appears, but the overall current is still strained — protect your heart first.",
          "There's a gentler note toward the end, yet the deeper current stays heavy for now.",
          "Something eases late, though the bond as a whole still asks you to guard your heart."
        ])
      : pickVariant(cleanCards, [
          "The emotional current is fading from past to future — protect your heart and avoid overreach.",
          "The warmth seems to be receding here — a time to hold your own ground gently.",
          "The connection is cooling as it moves forward — let your heart rest rather than reach."
        ]);
  } else if (posBias === 'GO') {
    flowSummary = (lastScore >= firstScore)
      ? pickVariant(cleanCards, [
          "The emotional current is rising from past to future — the bond is gaining warmth.",
          "There's a clear warming through the arc — the connection is opening.",
          "Feeling is building from past to future — the bond grows more alive."
        ])
      : pickVariant(cleanCards, [
          "Despite a dip along the way, the overall connection holds a steady warmth.",
          "There were rough patches, yet the bond keeps a real, steady warmth.",
          "Even with a wobble, the connection stays warm at its core."
        ]);
  } else {
    flowSummary = pickVariant(cleanCards, [
      "The emotional current holds in a tender balance — clarity will come once intentions are spoken.",
      "Right now the feeling sits in a delicate in-between — what's unspoken is still shaping it.",
      "The bond rests in a quiet, undecided place — honesty is what will tip it either way.",
      "There's a tender stillness here — the direction waits on what's said out loud."
    ]);
  }

  const futCard = cleanCards[2];
  const futRev = revFlags[2];
  const futFlavor = getLoveCardFlavor(futCard, futRev);
  const futLabel = futRev ? `${futCard} (reversed)` : futCard;

  // closing derived from the SAME posBias — never contradicts flowSummary/action.
  const closing = posBias === 'HOLD_BACK'
    ? (blockLevel === 'HARD' ? "For now, choose distance and self-care over pursuit."
        : "This is a season to protect your heart, not to push for more.")
    : posBias === 'GO'
      ? "The energy supports an honest, open-hearted step."
      : "Let the connection breathe — the answer is still forming.";

  // Qualitative descriptors instead of clinical numbers in the prose oracle
  // (the raw numbers still live in layers.execution for the detailed view).
  const _lvl = (v) => v >= 75 ? 'strong' : v >= 45 ? 'moderate' : 'faint';
  const bondText = rel.relationshipType === 'obsessive'
      ? "an intense, gripping pull that needs gentle boundaries"
    : rel.relationshipType === 'soulmate'
      ? "a deep, resonant connection"
    : rel.relationshipType === 'stable'
      ? "a steady, grounded bond"
    : rel.relationshipType === 'collapse'
      ? "a bond under real strain"
    : rel.relationshipType === 'silent-withdrawal'
      ? "a quiet distance that words could bridge"
    // neutral fallback — describe by zone & lean, not clinical level-words
    : loveZone === 'CONNECTION'
      ? pickVariant(cleanCards, ["a warming, hopeful connection", "a bond that's quietly opening", "a tie with real promise in it"])
    : loveZone === 'SEPARATION'
      ? pickVariant(cleanCards, ["a connection that's pulling apart for now", "a bond that's grown distant", "a tie under quiet strain"])
    : pickVariant(cleanCards, ["a connection still finding its shape", "a bond in an in-between place", "a tie that hasn't fully spoken yet", "a relationship still defining itself"]);
  const loveObservation = pickVariant(cleanCards, posBias === 'GO' ? [
    "Something warm is quietly taking shape between you.",
    "There is a sense of the connection finding its footing.",
    "An undercurrent of genuine feeling seems to be gathering."
  ] : posBias === 'HOLD_BACK' ? [
    "Something between you is still tender and unsettled beneath the surface.",
    "There is a sense of needing space before anything is clear.",
    "An old ache seems to be asking for care first."
  ] : [
    "Something is shifting between you, though its shape isn't clear yet.",
    "There is a quiet, in-between feeling here.",
    "The connection seems to be still finding its words."
  ]);
  const loveReflection = pickVariant([...cleanCards].reverse(), posBias === 'GO' ? [
    "More than what they do next, this speaks to meeting them openly as yourself.",
    "This points less to a guarantee and more to your own readiness to connect.",
    "At heart, this is about honesty — yours first."
  ] : posBias === 'HOLD_BACK' ? [
    "More than their choices, this speaks to protecting your own heart.",
    "This points less to the outcome and more to your steadiness within it.",
    "At heart, this is an invitation to tend to yourself first."
  ] : [
    "More than an answer, this speaks to letting the truth surface gently.",
    "This points less to certainty and more to honest, unhurried attention.",
    "At heart, this is about clarity you both grow into, not one you force."
  ]);
  const finalOracle = isReflection
    ? `${flowSummary} ${loveObservation} What lingers here points less to them and more to something within you still asking to be understood. ${futLabel} points toward ${futFlavor}. The deeper invitation is to tend to your own heart and what it learned. ${loveReflection}`
    : `${flowSummary} ${loveObservation} The bond reads as ${bondText}. ${futLabel} points toward ${futFlavor}. ${closing} ${loveReflection}`;

  const criticalInterpretation = buildCriticalInterpretation(cleanCards, revFlags, "love", "buy");

  return {
    domain: "love",
    trend, action, riskLevel,
    totalScore, riskScore,
    relationship: rel,
    cardNarrative, flowSummary,
    finalOracle,
    volatilityScore: calcScore(cleanCards, 'vol'),
    synergies: synergies || [],
    layers: {
      decision: {
        position,
        strategy: action,
        diagnosis: `The bond currently reads as ${bondText} (${trend}).`,
        cardEvidence: `${cardNarrative[1] || '-'} -> ${cardNarrative[2] || '-'}`,
        outcomePrediction: closing,
        blockLevel
      },
      execution: {
        approach: position,
        attachment: rel.attachment,
        communication: rel.communication,
        reconciliation: rel.reconciliation
      },
      timing: {
        guidance: posBias === 'HOLD_BACK'
          ? "Give it space — revisit only after the tension clearly eases."
          : posBias === 'GO'
            ? "A favorable window is open now — act with sincerity."
            : "Wait for a clear, mutual signal before making a move."
      },
      signal: {
        past: cardNarrative[0] || '-',
        current: cardNarrative[1] || '-',
        future: cardNarrative[2] || '-',
        summary: flowSummary,
        verdict: trend
      },
      risk: {
        level: riskLevel,
        instability: rel.instability,
        obsession: rel.obsession,
        cautions: rel.obsession >= 80
          ? ["High attachment-fixation signal — protect your emotional boundaries."]
          : rel.instability >= 70
            ? ["High instability — avoid impulsive messages or decisions."]
            : ["Keep expectations grounded; communicate openly."]
      },
      rules: [
        "Do not chase — let mutual interest set the pace.",
        "Speak honestly rather than testing or guessing.",
        "Protect your own emotional stability first."
      ],
      criticalInterpretation
    }
  };
}

function runLoveEngine(ctx) {
  const { totalScore, riskScore, cleanCards, reversedFlags, prompt, synergies } = ctx;
  return buildLoveMetrics({ totalScore, riskScore, cleanCards, reversedFlags, prompt, synergies });
}

function mainEngine(ctx) {
  // 'stock' is now the non-financial Wealth Energy domain. It does NOT use the
  // trade-style block guard (resolveBlock/buildBlockedResponse emit market
  // language); it always routes to the symbolic Wealth engine.
  if (ctx.domain === 'stock') return runWealthEngine(ctx);
  if (ctx.domain === 'love') return runLoveEngine(ctx);
  // 'fortune' and 'decision' both use the fortune engine
  return runFortuneEngine(ctx);
}

/* ════════════════════════════════════════
   ENGLISH CLASSIFIERS / HELPERS
════════════════════════════════════════ */
function classifyDomainEN(prompt) {
  const p = (prompt || '').toLowerCase();
  const stockKeywords = [
    'stock', 'stocks', 'share', 'shares', 'invest', 'investment', 'buy', 'sell',
    'price', 'ticker', 'crypto', 'bitcoin', 'btc', 'eth', 'ethereum', 'coin',
    'market', 'trade', 'trading', 'portfolio', 'nasdaq', 'sp500', 's&p',
    'etf', 'dividend', 'profit', 'entry', 'exit', 'leverage', 'futures', 'option'
  ];
  if (stockKeywords.some(k => p.includes(k))) return 'stock';
  return 'fortune';
}

function detectStockIntentEN(prompt) {
  const p = (prompt || '').toLowerCase();
  const sellKeywords = ['sell', 'exit', 'take profit', 'should i sell', 'dump', 'cash out', 'close my position', 'get out'];
  if (sellKeywords.some(k => p.includes(k))) return 'sell';
  return 'buy';
}

function extractSubjectEN(prompt) {
  if (!prompt) return '';
  let p = prompt.replace(/[?,.!]+$/g, '').trim();

  // Strip leading time/intent framing
  const STRIP = [
    /^(should i|can i|will|is it a good time to|do you think i should)\s+/i,
    /^(what about|how about|tell me about|what's the outlook for|outlook for)\s+/i,
    /\b(buy|sell|invest in|hold|trade)\b/gi,
    /\b(today|tomorrow|this week|next week|this month|right now|now)\b/gi,
    /\b(stock|stocks|shares?|crypto|coin)\b/gi
  ];
  for (const pat of STRIP) p = p.replace(pat, ' ');
  p = p.replace(/\s+/g, ' ').trim();

  // Prefer an explicit ticker-like token (2-5 uppercase letters) from the original
  const tickerMatch = (prompt.match(/\b([A-Z]{2,5})\b/) || [])[1];
  if (tickerMatch && !['I', 'A', 'THE', 'IS', 'IT'].includes(tickerMatch)) return tickerMatch;

  // Otherwise return the cleaned remainder if meaningful
  if (p.length >= 2 && p.length <= 40) return p;
  return '';
}

/* ════════════════════════════════════════
   PAYMENT PLANS (mirror of frontend PAYMENT_PLANS)
   durationMs is authoritative on the server side too.
════════════════════════════════════════ */
const PLANS = {
  // trial: 3 deep readings over 24h
  trial:    { id: 'trial',    durationMs: 24 * 60 * 60 * 1000,        deepPerDay: 3, basicPerDay: 10, priceCents: 99 },
  // monthly: 2 deep/day + 10 basic/day
  monthly:  { id: 'monthly',  durationMs: 30 * 24 * 60 * 60 * 1000,   deepPerDay: 2, basicPerDay: 10, priceCents: 799 },
  // yearly: 3 deep/day + 10 basic/day
  yearly:   { id: 'yearly',   durationMs: 365 * 24 * 60 * 60 * 1000,  deepPerDay: 3, basicPerDay: 10, priceCents: 5900 },
  // dev: unlimited readings for testing — never expose to real users
  dev:      { id: 'dev',      durationMs: 365 * 24 * 60 * 60 * 1000,  deepPerDay: 999, basicPerDay: 999, priceCents: 0 }
};
function isValidPlan(plan) {
  return typeof plan === 'string' && Object.prototype.hasOwnProperty.call(PLANS, plan);
}

/* ════════════════════════════════════════
   STATELESS SIGNED TOKENS (HMAC-SHA256, no KV needed)
   Format: base64url(payloadJSON).base64url(hmac)
   payload = { plan, iat, exp }
════════════════════════════════════════ */
function b64urlEncode(bytes) {
  let bin = '';
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlDecodeToBytes(str) {
  const pad = str.length % 4 === 0 ? '' : '='.repeat(4 - (str.length % 4));
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function utf8(str) { return new TextEncoder().encode(str); }
function bytesToStr(bytes) { return new TextDecoder().decode(bytes); }

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw', utf8(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign', 'verify']
  );
}
function getTokenSecret(env) {
  // Set via `wrangler secret put TOKEN_SECRET`. Dev fallback only.
  return (env && env.TOKEN_SECRET) ? env.TOKEN_SECRET : 'DEV_ONLY_INSECURE_SECRET_CHANGE_ME';
}

// ── KV helpers (optional). If no KV namespace is bound, these no-op safely so
//    the worker keeps running before the user creates/binds the namespace.
//    Bind in Cloudflare dashboard as `ORACLE_KV` (Settings > Variables > KV).
function getKV(env) {
  return (env && env.ORACLE_KV && typeof env.ORACLE_KV.get === 'function') ? env.ORACLE_KV : null;
}
function randomJti() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
}

async function issueToken(env, plan) {
  const planDef = PLANS[plan] || PLANS.monthly;
  const now = Date.now();
  const jti = randomJti();
  const payload = { plan, iat: now, exp: now + planDef.durationMs, jti };
  const payloadB64 = b64urlEncode(utf8(JSON.stringify(payload)));
  const key = await importHmacKey(getTokenSecret(env));
  const sig = await crypto.subtle.sign('HMAC', key, utf8(payloadB64));
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

async function verifyToken(env, token) {
  try {
    if (!token || typeof token !== 'string' || token.indexOf('.') < 0) return null;
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return null;
    const key = await importHmacKey(getTokenSecret(env));
    const ok = await crypto.subtle.verify('HMAC', key, b64urlDecodeToBytes(sigB64), utf8(payloadB64));
    if (!ok) return null;
    const payload = JSON.parse(bytesToStr(b64urlDecodeToBytes(payloadB64)));
    if (!payload || typeof payload.exp !== 'number') return null;
    if (Date.now() > payload.exp) return null; // expired
    // Revocation check (refunds/abuse): if KV is bound and this jti is listed
    // as revoked, reject. No KV bound -> skip (token still valid by signature).
    const kv = getKV(env);
    if (kv && payload.jti) {
      try {
        const revoked = await kv.get(`revoked:${payload.jti}`);
        if (revoked) return null;
      } catch (_) { /* KV read failure -> fail open on revocation only */ }
    }
    return payload; // { plan, iat, exp, jti }
  } catch (_) {
    return null;
  }
}

// Revoke a token by its jti (call this from a refund webhook/admin path).
async function revokeToken(env, jti, ttlSeconds) {
  const kv = getKV(env);
  if (!kv || !jti) return false;
  try {
    await kv.put(`revoked:${jti}`, '1', ttlSeconds ? { expirationTtl: ttlSeconds } : undefined);
    return true;
  } catch (_) { return false; }
}

// ── Rate limiting (per-IP, fixed window). KV-backed; no-op if KV unbound. ──
async function checkRateLimit(env, request, limit, windowSec) {
  const kv = getKV(env);
  if (!kv) return { ok: true }; // no KV -> don't block
  const ip = request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For') || 'unknown';
  const windowId = Math.floor(Date.now() / 1000 / windowSec);
  const slot = `rl:${ip}:${windowId}`;
  try {
    const cur = parseInt(await kv.get(slot) || '0', 10);
    if (cur >= limit) return { ok: false, retryAfter: windowSec };
    await kv.put(slot, String(cur + 1), { expirationTtl: windowSec + 5 });
    return { ok: true };
  } catch (_) {
    return { ok: true }; // KV error -> fail open (never lock users out)
  }
}

// ══════════════════════════════════════════════════════════════════
// THREE-LAYER USER PROTECTION (cost + emotional wellbeing)
// Layer 1: daily deep/basic limits (cost control)
// Layer 2: emotional-dependency detection (gentle, non-blocking)
// Layer 3: crisis-signal detection (safety — routes to real help)
// ══════════════════════════════════════════════════════════════════

// Layer 3 — crisis signals. Conservative: only clear, unambiguous phrases.
// Mixed casual uses ("dying to know if he likes me") must NOT trigger.
const CRISIS_SIGNALS = [
  'kill myself', 'killing myself', 'end my life', 'end it all', 'want to die',
  'wanna die', 'no reason to live', 'better off dead', 'suicide', 'suicidal',
  'self harm', 'self-harm', 'hurt myself', 'harming myself', "can't go on",
  'cannot go on', 'no point living', "don't want to be here anymore",
  'take my own life', 'ending things',
  // Strictly-vetted euphemisms — unambiguous crisis signals only (no everyday overlap).
  'better off without me', 'be better off without me', 'tired of living',
  "don't see a future for myself", 'want to disappear forever',
  'nothing left to live for', 'want the pain to stop forever',
  "don't want to live anymore", "don't want to live any more"
];
function detectCrisisSignal(prompt) {
  const p = String(prompt || '').toLowerCase();
  // Require the phrase to appear as a clear unit; skip obvious false positives.
  if (/dying to (know|see|hear|find out|meet)/.test(p)) {
    // "dying to know" etc. — strip before checking so it doesn't false-trigger
    return CRISIS_SIGNALS.some(sig => sig !== 'want to die' && p.includes(sig));
  }
  return CRISIS_SIGNALS.some(sig => p.includes(sig));
}
const CRISIS_RESPONSE = "Some things weigh more than a card reading can hold — and that's okay. If something heavy is sitting with you right now, please don't carry it alone. Talking to someone you trust, or just a real person who's there to listen, can steady things more than any reading can. In the US, 988 connects you with someone to talk to, anytime. Be gentle with yourself.";

// Layer 1 — daily limits. Returns {allowed, kind, remaining, message}.
// kind: 'deep' (AI call, costs money) | 'basic' (deterministic, free).
// Uses KV with a YYYYMMDD key. No KV bound -> allow (fail open).
function _todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}`;
}
async function checkDailyLimit(env, jti, plan, kind) {
  // Dev plan has no limits — for testing only
  if (plan === 'dev') return { allowed: true, remaining: 999 };
  const kv = getKV(env);
  if (!kv || !jti) return { allowed: true, remaining: null }; // fail open
  const planDef = PLANS[plan] || PLANS.monthly;
  const cap = kind === 'deep' ? (planDef.deepPerDay || 1) : (planDef.basicPerDay || 10);
  const key = `daily_${kind}:${jti}:${_todayKey()}`;
  try {
    const cur = parseInt(await kv.get(key) || '0', 10);
    if (cur >= cap) {
      const isTrial = plan === 'trial';
      return {
        allowed: false,
        remaining: 0,
        message: kind === 'deep'
          ? isTrial
            ? "You've used all three of your trial readings. We hope they gave you something to sit with. When you're ready to continue, a monthly or yearly plan gives you a fresh reading every day."
            : "Today's reading is complete. The cards have shared what they can for now — sometimes the clearest answer comes from letting it settle. Come back tomorrow with a fresh question."
          : "You've drawn many cards today. Let them settle before turning over more — the meaning deepens when you give it space."
      };
    }
    // increment with ~26h TTL (covers the UTC day plus buffer)
    await kv.put(key, String(cur + 1), { expirationTtl: 26 * 60 * 60 });
    return { allowed: true, remaining: cap - cur - 1 };
  } catch (_) {
    return { allowed: true, remaining: null }; // KV error -> fail open
  }
}

// Layer 2 — emotional dependency. Gentle, non-blocking. Detects repeated
// returns to the same domain / very similar question. Returns a soft message
// to APPEND to the reading (never blocks). Relies on client-sent prevContext.
function detectDependencyPattern(prevContext, domain, prompt) {
  if (!prevContext || typeof prevContext !== 'object') return null;
  const sameDomainStreak = typeof prevContext.sameDomainStreak === 'number' ? prevContext.sameDomainStreak : 0;
  const prevQ = typeof prevContext.lastQuestion === 'string' ? prevContext.lastQuestion.toLowerCase().trim() : '';
  const curQ = String(prompt || '').toLowerCase().trim();
  // crude similarity: same domain 3+ days running, or near-identical question
  const sameDomain = prevContext.lastDomain === domain;
  const similarQuestion = prevQ && curQ && (prevQ === curQ ||
      (prevQ.length > 10 && curQ.length > 10 &&
       (curQ.includes(prevQ.slice(0, 20)) || prevQ.includes(curQ.slice(0, 20)))));
  if ((sameDomain && sameDomainStreak >= 3) || similarQuestion) {
    return "Sometimes clarity settles more deeply after a little distance from the cards. Not every uncertainty needs another pull right away — give this one some room, and notice what surfaces on its own.";
  }
  return null;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
}

// ══════════════════════════════════════════════════════════════════
// ZEUS SHIELD EN — Security Engine (  )
// Based on Korean app V60-ZEUS-SHIELD-MASTER, adapted for EN:
//   - ORACLE_KV (not ZEUS_TAROT_KV)
//   - English tarot tone messages
//   - EN-specific prompt injection patterns
//   - Plan limits handled by checkDailyLimit (not duplicated here)
// ══════════════════════════════════════════════════════════════════

// Device fingerprint — SHA-256(UA + Accept-Language)
// Combines with IP to block VPN-bypass abuse.
async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// Shield error messages — English tarot tone (not clinical)
const SHIELD_MESSAGES = {
  SYSTEM_LOCK:    "The oracle is taking a breath right now. Everything is fine — please come back in a few minutes and the cards will be ready for you.",
  QUESTION_EMPTY: "The cards need something to work with. Share what's on your mind, even just a few words.",
  QUESTION_LONG:  "There's a lot here. Try distilling it to the heart of what you're really asking — under 500 characters usually opens a clearer reading.",
  PROMPT_BLOCKED: "That question isn't something the oracle can read. Try asking about your situation in your own words.",
  CONCURRENT:     "A reading is still completing. Give it just a moment, then try again — the oracle is almost ready.",
  COOLDOWN:       "The oracle is still settling from your last reading. Take a breath, and try again in a moment.",
  GLOBAL_LIMIT:   "The oracle is resting after a busy stretch. This won't take long — please try again in a few minutes.",
};

function shieldResponse(code, status = 429) {
  const msg = SHIELD_MESSAGES[code] || "Please try again in a moment.";
  const enc = new TextEncoder();
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'cooldown', message: msg })}\n\n`));
      c.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'done' })}\n\n`));
      c.close();
    }
  });
  return new Response(stream, {
    status: 200, // always 200 so CORS passes and frontend stream parser reads it
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    }
  });
}

// English-specific blocked prompt patterns
// Targets prompt injection, structure extraction, abuse patterns.
const EN_BLOCKED_PATTERNS = [
  /https?:\/\//i,                       // URL injection
  /<script/i,                            // XSS
  /\bignore\b.{0,30}\binstructions\b/i, // prompt injection
  /\bforget\b.{0,30}\binstructions\b/i, // prompt injection
  /\brepeat\b.{0,10}\d{2,}/i,           // "repeat 100 times"
  /\ball\b.{0,10}\d{2,}.{0,10}\bcards\b/i, // "all 78 cards"
  /json\s+format/i,                      // structure extraction
  /system\s+prompt/i,                    // prompt extraction
  /\bpretend\b.{0,20}\byou are\b/i,     // role hijack
  /\bact as\b.{0,20}\b(gpt|claude|ai|assistant)\b/i, // role hijack
];

async function handleZeusShieldEN(request, env, jti, question) {
  const kv = getKV(env);

  // [0] GLOBAL EMERGENCY KILL SWITCH
  // Manually set SYSTEM_LOCK="true" in KV to halt all readings immediately.
  if (kv) {
    const lock = await kv.get('SYSTEM_LOCK');
    if (lock === 'true') return shieldResponse('SYSTEM_LOCK', 503);
  }

  // [1] QUESTION VALIDATION — prompt injection + abuse pattern
  if (!question || question.trim().length < 2) return shieldResponse('QUESTION_EMPTY', 400);
  if (question.length > 500) return shieldResponse('QUESTION_LONG', 400);
  for (const pat of EN_BLOCKED_PATTERNS) {
    if (pat.test(question)) return shieldResponse('PROMPT_BLOCKED', 400);
  }

  // [2] DEVICE FINGERPRINT — UA + Accept-Language + IP
  const ip  = request.headers.get('cf-connecting-ip')
           || request.headers.get('x-forwarded-for')
           || 'unknown';
  const ua   = request.headers.get('user-agent') || '';
  const lang = request.headers.get('accept-language') || '';
  const fp   = await sha256(`${ua}:${lang}`);

  // Guest users (no jti) — only apply concurrency lock, skip usage tracking.
  // Free users don't get deep readings anyway (gated by premium check),
  // so tracking guest usage would only cause false positives.
  if (!jti) {
    const guestKey = `active_en:guest:${fp}:${ip}`;
    const guestActive = await kv.get(guestKey);
    if (guestActive === 'true') return shieldResponse('CONCURRENT', 429);
    await kv.put(guestKey, 'true', { expirationTtl: 60 });
    return { success: true, isResponse: false, keyBase: null, usageKey: null, globalKey: null, concurrentKey: guestKey };
  }

  const keyBase = `${jti}:${fp}:${ip}`;

  if (!kv) return null; // KV unbound → fail open (never block legitimate users)

  // [3] CONCURRENCY LOCK — block rapid-fire / macro attacks
  const concurrentKey = `active_en:${keyBase}`;
  const active = await kv.get(concurrentKey);
  if (active === 'true') return shieldResponse('CONCURRENT', 429);
  await kv.put(concurrentKey, 'true', { expirationTtl: 60 }); // min 60s required by Cloudflare KV

  try {
    // Adaptive cooldown removed — daily limits (checkDailyLimit) already control
    // reading frequency per plan. Adding a separate cooldown lock with KV TTL >= 60s
    // creates poor UX (1-min wait between readings) for legitimate users.
    // Heavy users are already handled by daily caps.
    const usageKey  = `usage_en:${keyBase}`;
    const currentUsage = parseInt(await kv.get(usageKey) || '0', 10);

    // [7] DAILY BUDGET SHIELD — global AI call ceiling
    // EN app starts conservative at 5,000/day; auto-locks 10 min on breach.
    const globalKey = 'GLOBAL_DAILY_AI_USAGE_EN';
    const globalUsage = parseInt(await kv.get(globalKey) || '0', 10);
    if (globalUsage > 5000) {
      await kv.put('SYSTEM_LOCK', 'true', { expirationTtl: 600 });
      return shieldResponse('GLOBAL_LIMIT', 503);
    }

    // Shield passed — return tracking metadata for commit/rollback
    return { success: true, isResponse: false, keyBase, usageKey, globalKey, concurrentKey };

  } catch (err) {
    await kv.delete(concurrentKey);
    throw err;
  }
}

// Commit usage after successful Gemini call
async function commitShieldEN(env, sd) {
  const kv = getKV(env);
  if (!kv || !sd) return;
  try {
    // Only track usage for authenticated users (guests have null usageKey)
    if (sd.usageKey) {
      const u = parseInt(await kv.get(sd.usageKey) || '0', 10);
      await kv.put(sd.usageKey, String(u + 1), { expirationTtl: 86400 });
    }
    if (sd.globalKey) {
      const g = parseInt(await kv.get(sd.globalKey) || '0', 10);
      await kv.put(sd.globalKey, String(g + 1), { expirationTtl: 86400 });
    }
    // Release concurrency lock so user can immediately start another reading
    if (sd.concurrentKey) await kv.delete(sd.concurrentKey);
  } catch (_) {}
}

// Rollback on Gemini failure (don't penalise users for our errors)
async function rollbackShieldEN(env, sd) {
  const kv = getKV(env);
  if (!kv || !sd) return;
  try { await kv.delete(sd.concurrentKey); } catch (_) {}
}

// ════════════════════════════════════════════════════════════════
//  WEALTH_SEED — symbolic "abundance energy" seeds for all 78 cards.
//  Format: { energy, shadow } keyword-style phrases (NOT finished prose).
//  These are reference seeds the AI expands into a Wealth Energy reading.
//  HARD RULE: zero financial/trading terms (no stock/buy/sell/invest/%/etc).
//  Korean source: tarotDB _ + _ directional meaning, abstracted.
// ════════════════════════════════════════════════════════════════
const WEALTH_SEED = {
  "The Fool": { energy: "fresh, unformed beginnings around ambition; instinct over planning; a light first step into open territory", shadow: "impulse without structure; movement without grounding" },
  "The Magician": { energy: "skill becoming momentum; turning what you already carry into visible progress; aligned, capable action", shadow: "scattered focus; too many directions at once" },
  "The High Priestess": { energy: "quiet inner knowing guiding your resources; progress building unseen beneath the surface; patience as strategy", shadow: "acting before clarity arrives; ignoring inner signals" },
  "The Empress": { energy: "natural growth and overflow; a season of receiving; effort ripening into nourishment at its own pace", shadow: "overindulgence; comfort outweighing balance" },
  "The Emperor": { energy: "structure, order, and steady command; building on a solid, disciplined foundation; long-term stability", shadow: "rigidity; control that blocks natural flow" },
  "The Hierophant": { energy: "tradition and proven principles; trusted guidance and established paths; the steady, conservative route", shadow: "blind convention; following rules past their usefulness" },
  "The Lovers": { energy: "a meaningful choice about where to commit your energy; alignment of heart and resources; partnership and shared direction", shadow: "indecision; values pulling in two directions" },
  "The Chariot": { energy: "focused drive breaking through; willpower turning effort into forward motion; momentum mastered", shadow: "force without direction; pushing before the path is clear" },
  "Strength": { energy: "quiet endurance and inner steadiness; patient mastery over impulse; gentle persistence outlasting noise", shadow: "burnout from over-gripping; forcing what needs softness" },
  "The Hermit": { energy: "withdrawal into clarity; questioning the crowd's excitement; strategy and wisdom formed in solitude", shadow: "isolation; cutting off every outside insight" },
  "Wheel of Fortune": { energy: "a turning point and shift in cycles; fortune in motion; riding a change in the tide", shadow: "passivity; waiting on luck instead of readiness" },
  "Justice": { energy: "balance, fairness, and clear cause-and-effect; honest accounting; choices weighed with integrity", shadow: "imbalance catching up; consequences of past shortcuts" },
  "The Hanged Man": { energy: "a deliberate pause that reveals a new angle; surrender that brings insight; suspension before the next move", shadow: "stagnation; waiting that becomes avoidance" },
  "Death": { energy: "the close of one cycle clearing space for another; transformation of your relationship to stability; release and renewal", shadow: "clinging to what is already finished" },
  "Temperance": { energy: "balanced blending and moderation; steady, measured pacing; harmony between effort and rest", shadow: "over-caution; diluting energy by never committing" },
  "The Devil": { energy: "facing attachment and what binds you; awareness of compulsion as the first step to freedom", shadow: "fixation, craving, and chains you forget are self-made" },
  "The Tower": { energy: "a sudden shift breaking an unstable foundation; truth revealed through disruption; rebuilding from level ground", shadow: "bracing against what must change; clinging to shaky ground" },
  "The Star": { energy: "renewed vision after a hard stretch; long-range hope taking shape; alignment with what feels truly meaningful", shadow: "floating in hope without grounding action" },
  "The Moon": { energy: "uncertain terrain; perception shifting; moving carefully through unclear signals", shadow: "illusion; misreading signals, rumor, or false promises" },
  "The Sun": { energy: "clarity and forward momentum; confidence becoming visible results; expansion through simplicity and truth", shadow: "overconfidence; losing balance in the glow" },
  "Judgement": { energy: "awakening and honest reassessment; answering a clear call; rising to a new level of responsibility", shadow: "self-judgment; replaying the past instead of moving" },
  "The World": { energy: "completion and wholeness; a cycle fulfilled; integration and well-earned arrival", shadow: "false finish; refusing to close what is already complete" },

  "Ace of Wands": { energy: "a spark of fresh drive and inspiration; raw potential ready to move; the seed of a new venture", shadow: "a spark that fizzles without follow-through" },
  "Two of Wands": { energy: "planning and surveying the horizon; weighing a bold next step; vision before commitment", shadow: "endless planning that never launches" },
  "Three of Wands": { energy: "expansion and looking outward; early efforts beginning to return; widening your reach", shadow: "delay; results slower than hoped" },
  "Four of Wands": { energy: "stable footing and a milestone reached; celebration of solid groundwork; harmony in what you've built", shadow: "complacency; resting too long on one win" },
  "Five of Wands": { energy: "competitive friction and scattered effort; many forces pulling at once; tension that sharpens you", shadow: "scattering yourself in needless friction; energy spent without aim" },
  "Six of Wands": { energy: "recognition and visible momentum; a victory acknowledged; confidence well-earned", shadow: "momentum riding on appearance over substance" },
  "Seven of Wands": { energy: "defending your ground; holding hard-won ground under pressure; conviction tested", shadow: "exhaustion from constant defense" },
  "Eight of Wands": { energy: "rapid movement and swift developments; momentum accelerating; things landing fast", shadow: "haste; moving faster than you can steer" },
  "Nine of Wands": { energy: "resilience near the finish; guarding what you've built; one more push despite fatigue", shadow: "weariness; defensiveness that won't let go" },
  "Ten of Wands": { energy: "carrying a heavy load toward completion; responsibility shouldered; the final stretch of effort", shadow: "overload; carrying more than is yours to carry" },
  "Page of Wands": { energy: "youthful curiosity and a new spark; eager exploration; the beginner's bold energy", shadow: "restlessness; enthusiasm without staying power" },
  "Knight of Wands": { energy: "bold, energetic pursuit; charging toward a goal; passion in motion", shadow: "recklessness; leaping before looking" },
  "Queen of Wands": { energy: "warm, confident magnetism; steady creative power; leading by presence", shadow: "overextension; burning the candle at both ends" },
  "King of Wands": { energy: "visionary leadership and clear direction; bold strategy realized; commanding your field", shadow: "domineering drive; impatience with the slow build" },

  "Ace of Cups": { energy: "an open, receptive new flow; fresh emotional and creative abundance; a full cup beginning to pour", shadow: "spilling energy before it can fill" },
  "Two of Cups": { energy: "mutual exchange and partnership; balanced give-and-take; a connection that multiplies value", shadow: "imbalance; one side giving more than the other" },
  "Three of Cups": { energy: "shared celebration and community; abundance enjoyed together; collaborative joy", shadow: "excess; festivity that drains rather than fills" },
  "Four of Cups": { energy: "reevaluation and quiet discontent; sensing something is missing; a pause to reconsider", shadow: "apathy; missing the opportunity in front of you" },
  "Five of Cups": { energy: "grief over a loss, with something still standing; mourning before recovery; what remains is real", shadow: "fixating on what's gone; blind to what remains" },
  "Six of Cups": { energy: "nostalgia and returning to roots; comfort in what's familiar; goodwill from the past", shadow: "living in the past; old patterns repeating" },
  "Seven of Cups": { energy: "many options and vivid imagination; a wealth of possibility; dreaming the field wide open", shadow: "illusion; too many choices, none grounded" },
  "Eight of Cups": { energy: "walking away to seek something deeper; leaving the merely-adequate behind; a meaningful departure", shadow: "leaving too soon; abandoning what isn't finished" },
  "Nine of Cups": { energy: "contentment and wishes fulfilled; satisfaction in what you've gathered; quiet pride", shadow: "complacency; mistaking comfort for completion" },
  "Ten of Cups": { energy: "lasting fulfillment and harmony; abundance shared across your circle; a settled wholeness", shadow: "idealizing the picture; expecting permanence without tending it" },
  "Page of Cups": { energy: "a tender new idea or message; intuitive, creative openings; gentle fresh feeling", shadow: "over-sensitivity; fantasy over substance" },
  "Knight of Cups": { energy: "following inspiration and a heartfelt offer; pursuing a meaningful vision; romance of the ideal", shadow: "chasing a mirage; promise without follow-through" },
  "Queen of Cups": { energy: "deep intuition and emotional steadiness; nurturing what matters; wisdom of the heart", shadow: "absorbing others' weight; boundaries dissolving" },
  "King of Cups": { energy: "calm mastery of emotion; balanced, compassionate command; steadiness under pressure", shadow: "suppressed feeling; calm that hides turbulence" },

  "Ace of Swords": { energy: "a breakthrough of clarity and truth; a sharp new insight; the cut that reveals the path", shadow: "harsh clarity; cutting before understanding" },
  "Two of Swords": { energy: "a deferred decision held in balance; weighing two paths; stillness before choosing", shadow: "avoidance; refusing to see in order not to choose" },
  "Three of Swords": { energy: "a painful but clarifying truth; the ache that precedes healing; release through honesty", shadow: "dwelling in the wound; pain prolonged" },
  "Four of Swords": { energy: "rest and recovery; deliberate pause to regather; stillness that restores", shadow: "stagnation; resting past the point of readiness" },
  "Five of Swords": { energy: "a hollow win and the cost of conflict; learning what's worth the fight; tension after a clash", shadow: "needing to win small; losing the larger ground in the process" },
  "Six of Swords": { energy: "a transition toward calmer water; leaving difficulty behind; passage to a steadier place", shadow: "carrying old baggage into the new" },
  "Seven of Swords": { energy: "strategy, discretion, and clever maneuvering; a quiet, independent approach", shadow: "evasion; cutting corners or self-deception" },
  "Eight of Swords": { energy: "feeling boxed in by your own perception; restriction that loosens once seen clearly", shadow: "self-imposed limits; mistaking a story for a cage" },
  "Nine of Swords": { energy: "anxiety and overthinking in the dark; worry magnified by night; fear larger than fact", shadow: "spiraling dread; suffering the imagined" },
  "Ten of Swords": { energy: "a definitive bottom and ending; the worst already passed; the only way left is up", shadow: "melodrama; refusing to see the dawn after" },
  "Page of Swords": { energy: "alert curiosity and gathering information; sharp new perspective; vigilant learning", shadow: "scattered thinking; words ahead of footing" },
  "Knight of Swords": { energy: "decisive, fast-moving resolve; charging at a clear target; bold mental drive", shadow: "rash haste; force without consideration" },
  "Queen of Swords": { energy: "clear, objective judgment; cutting through noise with honesty; independent discernment", shadow: "retreating into coldness; analysis that shuts out warmth" },
  "King of Swords": { energy: "authoritative clarity and sound strategy; principled decision-making; truth as compass", shadow: "rigid logic; ruling without heart" },

  "Ace of Pentacles": { energy: "a grounded new opportunity taking root; tangible potential offered; a solid, real beginning", shadow: "potential left unplanted; opportunity ignored" },
  "Two of Pentacles": { energy: "juggling priorities with agility; flexible balance amid flux; adapting as things move", shadow: "overstretch; too many balls in the air" },
  "Three of Pentacles": { energy: "skilled collaboration and craftsmanship; building value with others; competence recognized", shadow: "friction in teamwork; effort without coordination" },
  "Four of Pentacles": { energy: "stability and careful holding; securing your foundation; conserving what you've gathered", shadow: "clenching too tightly; stability hardening into stagnation" },
  "Five of Pentacles": { energy: "a lean stretch and felt scarcity; hardship that points toward overlooked support; endurance", shadow: "isolation in struggle; missing the help nearby" },
  "Six of Pentacles": { energy: "balanced give-and-take and fair flow; generosity returning; equilibrium restored", shadow: "strings attached; imbalance dressed as fairness" },
  "Seven of Pentacles": { energy: "patient cultivation and the long view; assessing slow growth; trusting the season", shadow: "impatience; pulling up roots too early" },
  "Eight of Pentacles": { energy: "diligent mastery through repetition; refining your craft; steady, focused effort", shadow: "grind without meaning; perfectionism stalling progress" },
  "Nine of Pentacles": { energy: "self-reliant abundance and refinement; enjoying the fruits of discipline; grounded independence", shadow: "isolation in success; comfort that closes you off" },
  "Ten of Pentacles": { energy: "lasting, generational stability; legacy and rooted stability; abundance built to endure", shadow: "clinging to legacy; tradition over vitality" },
  "Page of Pentacles": { energy: "studious new growth and practical curiosity; learning a real skill; planting for the long term", shadow: "all study, no action; promise unrealized" },
  "Knight of Pentacles": { energy: "steady, methodical progress; reliable persistence; the slow build that lasts", shadow: "over-caution; stalling in routine" },
  "Queen of Pentacles": { energy: "grounded nurturing and practical abundance; resourceful care; stability that nourishes others", shadow: "over-giving; neglecting your own ground" },
  "King of Pentacles": { energy: "grounded prosperity; enduring stability and stewardship of what you've built; the steady hand that sustains", shadow: "gripping for control; forgetting that abundance needs flow" }
};

// ════════════════════════════════════════════════════════════════
//  FORTUNE_SEED — general-life "fortune energy" seeds for all 78 cards.
//  Format: { energy, shadow } keyword-style phrases (NOT finished prose).
//  Reference seeds the AI expands into a flowing general-life reading.
//  Korean source: tarotDB _ (+ /// life areas), abstracted.
//  Tone: life, destiny, growth, relationships, timing — warm and reflective.
// ════════════════════════════════════════════════════════════════
const FORTUNE_SEED = {
  "The Fool": { energy: "infinite open road ahead; courage to take the first step; the universe favoring your leap into the new", shadow: "naive haste; stepping off the edge without looking" },
  "The Magician": { energy: "everything you need is already in hand; will and skill aligning to manifest; a moment of true capability", shadow: "talent spent on illusion; manipulation over honesty" },
  "The High Priestess": { energy: "something important is not being said yet; a situation where key facts stay private for now; watching before acting", shadow: "being kept out of the loop; a decision made without full information" },
  "The Empress": { energy: "abundance, nurture, and creative flourishing; life blooming around you; warmth and fertile growth", shadow: "smothering; comfort tipping into stagnation" },
  "The Emperor": { energy: "structure, authority, and solid ground; building order from chaos; protective stability", shadow: "rigidity; control that becomes domination" },
  "The Hierophant": { energy: "tradition, mentorship, and shared belief; guidance from established wisdom; belonging", shadow: "dogma; conforming against your own truth" },
  "The Lovers": { energy: "union, harmony, and a values-defining choice; deep connection; alignment of heart and path", shadow: "torn loyalties; a choice avoided too long" },
  "The Chariot": { energy: "triumphant forward drive; willpower steering opposing forces; victory through focus", shadow: "control by force; momentum with no destination" },
  "Strength": { energy: "gentle courage and inner power; taming difficulty with patience; quiet, unshakable resolve", shadow: "self-doubt; raw force where softness was needed" },
  "The Hermit": { energy: "stepping back from the crowd to figure something out alone; a deliberate period of distance; working it out privately", shadow: "isolating too long; cutting off people who could help" },
  "Wheel of Fortune": { energy: "fate turning and cycles shifting; a lucky pivot; change arriving on its own current", shadow: "clinging to a turning wheel; resisting inevitable change" },
  "Justice": { energy: "truth, fairness, and karmic balance; clear cause and effect; accountability settled", shadow: "consequences arriving; old imbalances coming due" },
  "The Hanged Man": { energy: "a forced wait where nothing moves yet; a situation on hold; seeing it from a new angle while stuck", shadow: "stalled with no end in sight; giving up leverage for nothing" },
  "Death": { energy: "an ending that frees you; profound transformation; the necessary close before rebirth", shadow: "clutching the past; fearing a change already underway" },
  "Temperance": { energy: "two sides slowly finding a workable middle; steady adjustment; patience paying off", shadow: "one side giving too much; a fragile compromise that may not hold" },
  "The Devil": { energy: "facing your attachments and shadow; awareness of what binds you; the door to liberation", shadow: "bondage to craving, fear, or unhealthy ties" },
  "The Tower": { energy: "a sudden upheaval clearing false ground; fate's lightning; truth that frees through collapse", shadow: "resisting the fall; rebuilding the same flawed tower" },
  "The Star": { energy: "hope, renewal, and gentle healing after hardship; faith restored; a guiding light", shadow: "wishful drifting; hope untethered from action" },
  "The Moon": { energy: "mixed signals and unclear information; things not adding up yet; waiting for the picture to clear", shadow: "being misled; acting on a wrong read of the situation" },
  "The Sun": { energy: "radiant joy and success; clarity and vitality; a blessed season where life opens fully", shadow: "blinding optimism; burning out in the glare" },
  "Judgement": { energy: "awakening, reckoning, and a clear call to rise; rebirth into a higher chapter", shadow: "harsh self-judgment; ignoring the call to change" },
  "The World": { energy: "completion, wholeness, and arrival; a cycle fulfilled; integration and well-earned peace", shadow: "refusing to close a finished chapter; fear of the next" },

  "Ace of Wands": { energy: "a spark of new passion and possibility; raw creative fire; an inspired fresh start", shadow: "a spark that never catches; false starts" },
  "Two of Wands": { energy: "planning a bold horizon; standing at the threshold of a bigger world; vision forming", shadow: "fear of leaving comfort; planning that never moves" },
  "Three of Wands": { energy: "expansion and ships coming in; early efforts beginning to return; broadened outlook", shadow: "delay; waiting longer than hoped" },
  "Four of Wands": { energy: "celebration, homecoming, and stable joy; a milestone shared; harmony and belonging", shadow: "instability beneath the surface; rushed celebration" },
  "Five of Wands": { energy: "lively competition and clashing energies; growth through friction; spirited challenge", shadow: "needless conflict; chaos draining everyone" },
  "Six of Wands": { energy: "public recognition and well-earned victory; confidence rewarded; a moment in the sun", shadow: "ego inflated by praise; fearing the fall from grace" },
  "Seven of Wands": { energy: "standing your ground with conviction; defending what you've built; courage under challenge", shadow: "constant defensiveness; exhaustion from never relenting" },
  "Eight of Wands": { energy: "swift movement and rapid news; events accelerating; alignment falling into place fast", shadow: "haste; chaos from too much at once" },
  "Nine of Wands": { energy: "resilience and one last stand; guarding your progress; weary but unbroken persistence", shadow: "paranoia; defensiveness that pushes help away" },
  "Ten of Wands": { energy: "carrying a heavy burden toward the finish; responsibility shouldered; near completion", shadow: "overload; refusing to set anything down" },
  "Page of Wands": { energy: "youthful enthusiasm and a bold new spark; eager discovery; the courage of a beginner", shadow: "restlessness; passion without direction" },
  "Knight of Wands": { energy: "adventurous, passionate momentum; charging toward what excites you; daring action", shadow: "recklessness; burning out as fast as you ignite" },
  "Queen of Wands": { energy: "warm confidence and magnetic vitality; leading with presence; courageous self-expression", shadow: "overextension; jealousy or scattered fire" },
  "King of Wands": { energy: "visionary leadership and bold clarity; inspiring others toward a goal; commanding vision", shadow: "impatience; ruling by impulse over wisdom" },

  "Ace of Cups": { energy: "an overflowing new feeling; love and creativity opening; the heart filling from a fresh source", shadow: "emotion blocked or spilling before it can fill" },
  "Two of Cups": { energy: "deep mutual connection; partnership in balance; two hearts meeting as equals", shadow: "imbalance; a bond that drains rather than fills" },
  "Three of Cups": { energy: "joyful community and shared celebration; friendship and belonging; abundance among others", shadow: "excess; festivity masking what's unspoken" },
  "Four of Cups": { energy: "losing interest in what is on offer; wanting something different; turning down an option", shadow: "missing a good chance because of boredom or distraction" },
  "Five of Cups": { energy: "grief honored, with hope still standing; mourning before recovery; what remains matters", shadow: "drowning in loss; blind to what's still here" },
  "Six of Cups": { energy: "nostalgia, innocence, and returning to roots; comfort in the familiar; old kindness returning", shadow: "living in the past; refusing to grow up" },
  "Seven of Cups": { energy: "rich imagination and many possibilities; dreaming the field wide open; vivid choice", shadow: "illusion; lost among options, none grounded" },
  "Eight of Cups": { energy: "walking away to seek something deeper; leaving the hollow behind; a meaningful departure", shadow: "leaving too soon; abandoning what wasn't finished" },
  "Nine of Cups": { energy: "contentment and wishes coming true; emotional satisfaction; quiet, earned happiness", shadow: "complacency; comfort mistaken for fulfillment" },
  "Ten of Cups": { energy: "lasting harmony and emotional fulfillment; a contented home and circle; wholeness shared", shadow: "idealizing the picture; cracks left untended" },
  "Page of Cups": { energy: "a tender new feeling or message; intuitive, creative beginnings; openhearted wonder", shadow: "over-sensitivity; living in fantasy" },
  "Knight of Cups": { energy: "following the heart toward a vision; a romantic, idealistic quest; an inspired offer", shadow: "chasing a mirage; promise without grounding" },
  "Queen of Cups": { energy: "deep intuition and compassionate care; emotional steadiness; nurturing wisdom", shadow: "absorbing others' pain; boundaries dissolving" },
  "King of Cups": { energy: "calm emotional mastery; compassionate, balanced steadiness; grace under pressure", shadow: "suppressed feeling; calm hiding turbulence" },

  "Ace of Swords": { energy: "a breakthrough of truth and clarity; a decisive new insight; the mind cutting clean", shadow: "harsh words; clarity that wounds before it heals" },
  "Two of Swords": { energy: "a difficult choice held in balance; weighing two paths in stillness; pause before deciding", shadow: "avoidance; refusing to see in order not to choose" },
  "Three of Swords": { energy: "a painful truth that ultimately heals; heartbreak acknowledged; release through honesty", shadow: "dwelling in the wound; pain held longer than needed" },
  "Four of Swords": { energy: "rest, recovery, and quiet restoration; a needed retreat; stillness that heals", shadow: "stagnation; resting past the point of return" },
  "Five of Swords": { energy: "a hollow victory and its lessons; conflict's true cost; choosing battles wisely", shadow: "winning at others' expense; pride over peace" },
  "Six of Swords": { energy: "moving toward calmer waters; transition away from hardship; passage to steadier ground", shadow: "carrying old grief into the new shore" },
  "Seven of Swords": { energy: "strategy, cunning, and an independent path; clever maneuvering; quiet resourcefulness", shadow: "deception, evasion, or self-deceit" },
  "Eight of Swords": { energy: "feeling trapped by your own mind; restriction that loosens once seen clearly", shadow: "self-imposed prison; mistaking a story for chains" },
  "Nine of Swords": { energy: "anxiety and the long dark night; fears magnified by silence; worry larger than fact", shadow: "spiraling dread; suffering only the imagined" },
  "Ten of Swords": { energy: "a painful ending, and the dawn that follows; rock bottom passed; the only way is up", shadow: "melodrama; refusing to see the sunrise" },
  "Page of Swords": { energy: "alert curiosity and a sharp new outlook; vigilant learning; truth-seeking energy", shadow: "scattered thoughts; words running ahead of footing" },
  "Knight of Swords": { energy: "decisive, fast-charging resolve; bold pursuit of a clear aim; mental drive in motion", shadow: "rash haste; cutting before thinking" },
  "Queen of Swords": { energy: "clear, honest judgment; independent discernment; cutting through illusion with grace", shadow: "coldness; isolation behind a sharp guard" },
  "King of Swords": { energy: "authoritative truth and sound judgment; principled clarity; wisdom as compass", shadow: "cold logic; ruling without compassion" },

  "Ace of Pentacles": { energy: "a grounded new opportunity rooting; tangible potential offered; a solid, real beginning", shadow: "potential unplanted; a gift left unopened" },
  "Two of Pentacles": { energy: "juggling life's demands with grace; flexible balance amid change; adapting in motion", shadow: "overstretched; dropping what matters most" },
  "Three of Pentacles": { energy: "skilled teamwork and craftsmanship; building something real with others; competence seen", shadow: "friction in collaboration; effort uncoordinated" },
  "Four of Pentacles": { energy: "stability and careful keeping; securing your foundation; holding steady", shadow: "clenching too tightly; stability closing into stagnation" },
  "Five of Pentacles": { energy: "a hard stretch with help nearby; hardship pointing to overlooked support; endurance", shadow: "isolation in struggle; missing the open door" },
  "Six of Pentacles": { energy: "generosity and fair exchange; balance of giving and receiving; support flowing both ways", shadow: "strings attached; imbalance dressed as kindness" },
  "Seven of Pentacles": { energy: "patient cultivation and the long view; pausing to assess slow growth; trusting the season", shadow: "impatience; pulling up roots too soon" },
  "Eight of Pentacles": { energy: "devoted mastery through practice; refining your craft; steady, meaningful effort", shadow: "grind without purpose; perfectionism stalling joy" },
  "Nine of Pentacles": { energy: "self-reliant abundance and refinement; enjoying the fruits of discipline; grounded grace", shadow: "isolation in success; comfort that closes you off" },
  "Ten of Pentacles": { energy: "lasting legacy and rooted stability; family, home, and enduring foundations; wholeness built to last", shadow: "clinging to legacy; tradition over living vitality" },
  "Page of Pentacles": { energy: "studious new growth and practical curiosity; learning a real skill; planting for the future", shadow: "all study and no action; promise unrealized" },
  "Knight of Pentacles": { energy: "steady, reliable progress; methodical persistence; the slow build that endures", shadow: "over-caution; stuck in routine" },
  "Queen of Pentacles": { energy: "grounded nurture and practical warmth; resourceful care; stability that nourishes others", shadow: "over-giving; neglecting your own needs" },
  "King of Pentacles": { energy: "grounded prosperity and steady provision; enduring stability and stewardship; the hand that sustains", shadow: "gripping for control; comfort hardening into excess" }
};



// Layer-2 lockdown: scrub any financial wording the AI might slip into a
// Wealth Energy reading. Word-boundary, case-insensitive, whole-word swaps to
// neutral symbolic language. This is a safety net behind the clean seeds and
// the strict system prompt.
const _WEALTH_SCRUB = [
  [/\bstocks?\b/gi, 'energies'],
  [/\bshares?\b/gi, 'portions'],
  [/\bequit(?:y|ies)\b/gi, 'balance'],
  [/\bsecurit(?:y|ies)\b/gi, 'stability'],
  [/\bportfolios?\b/gi, 'collection of pursuits'],
  [/\btickers?\b/gi, 'focus'],
  [/\btrad(?:e|es|ing|er)\b/gi, 'movement'],
  [/\binvest(?:ing|ment|ments|or|ors)?\b/gi, 'commitment'],
  [/\bbuy(?:ing)?\b/gi, 'embracing'],
  [/\bsell(?:ing)?\b/gi, 'releasing'],
  [/\bprofits?\b/gi, 'rewards'],
  [/\bdividends?\b/gi, 'returns of energy'],
  [/\bcrypto(?:currency|currencies)?\b/gi, 'ventures'],
  [/\bbitcoin\b/gi, 'ventures'],
  [/\bstop[- ]?loss\b/gi, 'a moment to step back'],
  [/\bprice targets?\b/gi, 'aspiration'],
  [/\bmarket\b/gi, 'current'],
  [/\bbullish\b/gi, 'expansive'],
  [/\bbearish\b/gi, 'contracting'],
  [/\bbrokers?\b/gi, 'guides'],
  [/[-+]?\d+(?:\.\d+)?\s*%/g, 'a meaningful degree'],
  [/\$\s?\d[\d,]*(?:\.\d+)?/g, 'resources'],
];
function sanitizeWealthText(text) {
  let out = text;
  for (const [rx, repl] of _WEALTH_SCRUB) out = out.replace(rx, repl);
  return out;
}

// ── LOVE subtype: English classifier (ported from the Korean keyword engine) ──
// Detects the kind of love question so the AI can tailor the reading instead of
// giving a generic answer. Order matters: most specific / highest-value first.
function detectLoveSubtype(prompt) {
  const p = (prompt || '').toLowerCase();
  const hasEx = /\bex\b|ex-|my ex|former (partner|boyfriend|girlfriend)/.test(p);

  // INTENT first (sentence patterns), not bare entity words.
  if (/\b(marry|marriage|married|wedding|propose|proposal|engaged|engagement|spouse|husband|wife|settle down|the one)\b/.test(p)) return 'marriage';

  // Self-reflection / emotional processing
  if (/\b(why (am|do) i|why can'?t i|how do i (move on|let go|get over)|still (thinking|hung up|stuck) (about|on)|can'?t stop thinking|process (my|these) (feelings|emotions)|heal from)\b/.test(p)) return 'reflection';

  // Reunion — past/ex + actual reunion intent (not the bare word "ex")
  if ((hasEx || /back together|rekindle|second chance/.test(p)) &&
      /\b(come back|back together|reunite|rekindle|second chance|get (them|him|her) back|return|start over|reconcile)\b/.test(p)) return 'reunion';

  if (/\b(break ?up|broke ?up|breaking up|divorce|split up|end (it|things|the relationship)|should i leave|walk away|over between)\b/.test(p)) return 'breakup';

  if (/\b(text|texting|call|message|reach out|contact|reply|respond|should i (text|message|call|reach)|no contact|stopped talking|ghost(ed|ing)?|hear from)\b/.test(p)) return 'contact';

  if (/\b(crush|one[- ]sided|do(es)? (he|she|they) like me|confess|tell them how i feel|unrequited|secret(ly)? (love|like)|feelings for someone|wait for (someone|him|her|them)|someone who is (currently )?(with|taken|seeing|married)|person who is (with|taken)|already (taken|in a relationship)|longing for)\b/.test(p)) return 'crush';

  if (/\b(situationship|talking stage|are we (dating|together|official)|where (do we|is this) (stand|going)|just talking|undefined|what are we)\b/.test(p)) return 'thumb';

  if (/(what (is|are|'?s) (he|she|they).{0,24}(thinking|feeling)|how (do|does) (he|she|they) feel|(true|real) feelings|on (his|her|their) mind|inner heart|thinking about me)/.test(p)) return 'mindread';

  if (/\b(compatible|compatibility|do we (work|match|fit)|are we (right|good) (for|together)|our (chemistry|connection)|long[- ]term (match|fit)|right (for|person))\b/.test(p)) return 'compatibility';

  // bare "ex" with no clear intent -> reflection, not reunion
  if (hasEx) return 'reflection';

  return 'general';
}

// Subtype-specific instructions for the AI (ported & adapted to English).
// Each: what the reading MUST cover + a guardrail (never predict fixed events).
const LOVE_DIRECTIVE = {
  marriage:      `This is a MARRIAGE / commitment question. The reading must cover: (1) the deeper alignment a commitment needs (essence over formality), (2) how well the two people's values and visions of the future match, (3) facing any doubts through honest conversation. Favor "commitment decision / shared foundation" language over mere "compatibility." Do not reduce it to simple attraction.`,
  breakup:       `This is a BREAKUP / letting-go question. The reading must cover: (1) whether the ending feels natural or forced, (2) the possibility of recovery once emotions settle, (3) the need for clarity in the decision to part. Do NOT predict a "new love is coming." Stay with the process of closure itself.`,
  reunion:       `This is a REUNION question (getting back with someone). The reading must cover: (1) the lingering energy of the old relationship (positive and negative), (2) what would need to change for reconciliation, (3) the distance and growth that time has created. Do NOT predict "they'll come back soon." Focus on the conditions for reunion.`,
  crush:         `This is a CRUSH / one-sided-feelings question. The reading must cover: (1) the other person's level of awareness and where their feelings flow, (2) timing for confessing vs. continuing to observe, (3) restoring balance to a one-sided dynamic. Avoid giving a "definite answer"; be careful and humble about reading the other's heart.`,
  thumb:         `This is a SITUATIONSHIP / undefined-stage question. The reading must cover: (1) whether the two are drawing closer or drifting apart, (2) the signals that would move things to the next stage, (3) actions that would bring clarity to the ambiguity. Do NOT declare a "confirmed relationship." Center the flow and its direction.`,
  mindread:      `This is a "what are they feeling" question. The reading must cover: (1) the other person's current emotional flow (shown vs. hidden), (2) the direction of feelings they aren't expressing, (3) what could be confirmed through real communication. Do NOT make flat declarations like "this person is X." Read it as a flow.`,
  contact:       `This is a CONTACT / communication question (texting, reaching out, silence). The reading must cover: (1) how natural the flow of contact is, (2) the timing of reaching out first vs. waiting, (3) whether the way of communicating needs to change. Do NOT predict "they'll text today" or fix a moment in time.`,
  compatibility: `This is a COMPATIBILITY question between two people. The reading must cover: (1) each person's energy and what draws them together, (2) the friction points where differences create tension, (3) the direction the relationship can grow if they meet each other halfway.`,
  reflection:    `This is a SELF-REFLECTION question about the querent's own feelings (e.g. why they still think about someone, how to move on). Center the querent, but DO NOT reduce the whole reading to "your own growth journey." Read what the cards say about the relationship dynamic that produced this lingering feeling (what was unfinished, where the need wasn't met, what was avoided), then connect that to the querent's inner state. Cover: (1) what the lingering feeling is really about — name the relational truth, not just inner work, (2) what part of the querent is asking for attention, (3) a grounded next step. Do NOT predict the other person's actions. Avoid generic self-help cadence.`,
  general:       `This is a general love / relationship question. Read the emotional arc between the querent and the other person with warmth, addressing connection, communication, and where the energy is moving.`
};

// Universal self-reflection detector — works across ALL domains (love, fortune, stock, decision).
// Real users ask introspective "why do I / am I / what keeps me" questions far more than
// formulaic ones. These need a querent-centered but CONCRETE answer, not generic self-help.
function isSelfReflectionQuestion(prompt) {
  const p = (prompt || '').toLowerCase();
  return /\b(why (do|am|can'?t|does) i|why does .{0,30} affect me|am i (ignoring|seeking|being|making|seeing|seeing this|avoiding|chasing|settling|sabotaging)|what (keeps|makes|holds) me|what (emotional |subconscious |hidden |inner )?(wound|belief|fear|pattern|habit)\b|what .{0,30}(sabotage|sabotages|holds me back|limits me|limits my)|what happens if i (stop|keep|leave|stay)|do i (really|actually|truly)|am i .{0,30}(or|from) )\b/.test(p);
}

// Concrete-reflection guidance appended for self-reflection questions in any domain.
const REFLECTION_GUIDANCE =
  ` SELF-REFLECTION MODE: This is an introspective question about the querent's own pattern, fear, or behavior. Center the querent — but follow these rules strictly, or the reading becomes cheap coaching. ` +
  `BEHAVIOR-FIRST ORDER (critical): Never name a psychological trait before describing the observable behavior. For each point: (1) what the person repeatedly DOES, (2) what consequence follows, (3) only THEN the underlying pattern. Behavior first, interpretation second. ` +
  `BAD (forbidden): "You fear success." / "You seek validation." / "You have an attachment problem." — these are diagnoses with no behavior. ` +
  `GOOD (required): "You delay decisions until you feel certain. Opportunities pass while you wait. The pattern isn't fear of success — it's treating uncertainty as danger." — behavior, then consequence, then pattern. ` +
  `KEEP THE CARD STRUCTURE: Do NOT abandon the cards for a therapy monologue. Map the three cards: PAST card = how this pattern formed / an early version of it; PRESENT card = how the pattern operates right now (what they do today); FUTURE card = where it leads if it continues, AND what shifts if they change the one concrete behavior. ` +
  `SHOW THE CYCLE: When revealing a pattern, trace it as a concrete loop — external signal → the querent's interpretation → their reaction. Example: "They reply late → you read it as distance → you wait harder instead of asking." Make the loop visible with real actions, not feelings. ` +
  `Do NOT use generic self-help ("honor your worth", "trust the journey", "true security comes from within", "your subconscious believes..."). ` +
  `End with ONE concrete behavioral change to try — not an abstract affirmation. Example: "Start asking for a clear answer instead of reading into silence" — not "learn to value yourself". `;

function buildSystemPromptEN(domain, subjectName, relationshipState, loveSubtype, oracleStyle, prompt) {
  const subject = subjectName || 'this asset';
  const isReflectionQ = isSelfReflectionQuestion(prompt);
  const relationshipEngineInstruction = relationshipState
    ? `Relationship context (if relevant): type=${relationshipState.relationshipType}, emotional intensity=${relationshipState.emotionalIntensity}.`
    : '';

  const baseInstruction =
    `You are not explaining tarot cards. You are explaining the user's life. Cards are only evidence. The reading must focus on the person's situation, not on the cards themselves. ` +
    `You are ZEUS, an oracle who reads with calm authority. ` +
    `Speak in clear, vivid, compressed English — like an experienced tarot reader describing what is unfolding around the querent, not a therapist analyzing their psychology. ` +
    `Be specific and grounded, never vague or decorative. ` +
    `Focus on observable behaviors, actions, patterns, and likely outcomes. Do NOT explain behavior through psychological diagnosis — describe what people DO, not what they FEEL or FEAR inside. ` +
    `Interpret the cards as concrete situations first. Only discuss emotions when they directly explain a visible situation. ` +
    `Prefer concrete interpretation over emotional atmosphere. ` +
    `Each paragraph should reveal something new about the person's situation rather than repeating the same feeling in different words. ` +
    `Avoid excessive use of: healing, gentle, soft, tender, warmth, journey, energy, allow, embrace, trust, inner, authentic, wisdom, grounded, clarity, opening, connection, landscape, attachment, passion, perspective, process, center, depth, residue, foundation, terrain, realm, weight, empower, wellbeing, motives, resistance, avoidance. ` +
    `Do NOT use therapy language or psychological labels. Avoid: "inner landscape", "emotional center", "deep passion", "internal process", "perspective shift", "healing journey", "personal growth", "self-worth", "emotional wounds", "inner child", "emotional intelligence", "attachment pattern", "emotional processing", "inner transformation", "fear of commitment", "immaturity", "attachment style", "trauma response". ` +
    `Do not output JSON or headers — write flowing prose. ` +
    `Avoid repeatedly framing the reading around "certainty", "clarity", "ambiguity", "uncertainty", or "not knowing" — these have become overused abstractions. Use observable situations, actions, and exchanges instead. ` +
    `Every paragraph must include at least one observable behavior, event, or interaction — not only emotional or conceptual language. Write "they pull back after getting close" not "you feel uncertainty". ` +
    `Honor the structured metrics already computed; expand on them with insight, never contradict them. ` +
    ORACLE_UNIVERSAL_RULES +
    (oracleStyle && ORACLE_STYLE_PROMPT[oracleStyle]
      ? `\n${ORACLE_STYLE_PROMPT[oracleStyle]} Commit to this one voice for the whole reading — do not blend voices. `
      : '');

  if (domain === 'stock') {
    return baseInstruction +
      `This is a "Wealth Energy / Inner Abundance" reading — a SYMBOLIC reflection on the querent's effort, timing, and momentum around what they are building. ` +
      `It is NOT financial or investment advice. Do NOT name or evaluate any specific stock, crypto, ticker, or security. ` +
      `Do NOT give buy/sell/hold instructions, price targets, entry/exit points, percentages, or guarantees. ` +
      `You MAY discuss: work, effort, results, opportunity, timing, confidence, preparedness, momentum, stability, and risk. ` +
      (isReflectionQ
        ? `This question is introspective (e.g. "am I acting from fear or strategy", "what habit sabotages me", "do I chase validation"). You MAY address the querent's decision-making pattern, hesitation, fear-vs-strategy, or what quietly undermines their progress — that is what they asked. But describe it as a CONCRETE behavioral pattern (what they tend to do, when, and the cost), NOT as abstract psychology or a "subconscious belief" lecture. ` + REFLECTION_GUIDANCE
        : `Do NOT turn this into a psychology or self-worth reading. Do NOT discuss self-worth, emotional security, inner value, or personal healing. ` +
          `Focus on symbolic momentum and practical conditions — what is building, what is stalling, what timing favors — NOT on the person's inner emotional state. `) +
      `Describe observable conditions: is effort paying off, is momentum building or fading, is the timing ripe or early, what is steady and what is shaky. ` +
      `Each seed has an "energy" (the strength) and a "shadow" (the risk). Give the energy at least as much weight as the shadow — do NOT spend more than one paragraph on shadow/warning. Do not let the whole reading become one repeated caution. ` +
      `Offer reflection with soft direction, never commands. ` +
      `Always remind the reader this is symbolic guidance for self-reflection, and that real financial decisions should be made with qualified professionals. ` +
      relationshipEngineInstruction;
  }
  if (domain === 'love') {
    const directive = LOVE_DIRECTIVE[loveSubtype] || LOVE_DIRECTIVE.general;
    const isReflection = loveSubtype === 'reflection';
    const focusRules = isReflection
      ? // SELF-REFLECTION question: querent IS the subject, but behavior-first + card structure.
        `This is a SELF-REFLECTION question — the querent asks about their OWN pattern in love, not another person's behavior. ` +
        `Map the cards to the pattern: PAST card = how this relationship pattern formed; PRESENT card = how it operates now (what they actually do — e.g. read hope into silence, ignore early signals); FUTURE card = where it leads if unchanged, and what shifts if they change one concrete behavior. ` +
        REFLECTION_GUIDANCE
      : // RELATIONAL question: focus on the other person and the dynamic.
        `Every paragraph must answer the reader's real question: what is the OTHER person doing, where is the connection going, is it warming or cooling. ` +
        `SUBJECT RULE (most important for focus): Most sentences must have "the other person" or "the connection/relationship" as their grammatical subject. Sentences whose subject is "you/the querent" must be the MINORITY. Do NOT write "you are left to interpret the silence" or "your anxiety fills the void" — write "the other person has gone quiet" or "the silence is being left unexplained". Aim for roughly: other person 40%, the relationship 40%, the querent 20%. ` +
        `Do NOT make the querent's anxiety, need for reassurance, fear of uncertainty, insecurity, longing, or doubt the primary subject. These may appear briefly but must NEVER dominate. The reader wants to know about the other person and the relationship — not to be psychoanalyzed. ` +
        `PRESENT CARD — go deepest here: when a card shows a feeling or stance (e.g. calm, distance, interest), do NOT stop at naming it. Pin down WHAT KIND it is for this relationship: is the other person's calm a sign of real interest, comfortable friendship, mild fondness, or quiet certainty? The reader needs to know which. Name it. ` +
        `FUTURE CARD — keep it about the RELATIONSHIP'S direction, not the querent's inner work. Even a reversed or blocked card should read as "what will happen between them / what one person will do", NOT "the querent needs to reflect / look inward / understand themselves". Never turn the future into a self-development lesson. ` +
        `A love reading should PRIMARILY focus on: (1) the other person's state and behavior, (2) the dynamic between the two people, (3) the likely direction of the connection. `;
    return baseInstruction +
      `This is a relationship/love reading. ` +
      `CARD-TO-RELATIONSHIP RULE (most important): For EACH card, do two things in one breath — (1) read what the card shows, then (2) immediately translate it into what is happening in THIS relationship. Never stop at the card's textbook meaning. A card explanation alone is a failure. ` +
      `Example — Eight of Cups: do NOT write only "a quiet withdrawal, seeking deeper fulfillment" (that is a card definition). Instead write what it means HERE: "one person is quietly stepping back — the closeness that was there is cooling, and they are starting to look elsewhere for what they're not getting." ` +
      `Example — Seven of Cups in future: not "many possibilities, some illusory" (textbook), but "the path ahead isn't one clear direction — several options stay open, but not all are real. What is imagined and what is actually being built may turn out to be very different." ` +
      focusRules +
      `Do NOT convert the reading into a lesson about the querent's worth or validation. Personal growth, self-worth, healing, validation, or inner lessons may ONLY appear if a card strongly demands it — NEVER as the dominant theme. ` +
      `Describe what each person is actually doing, avoiding, or pursuing. Address attraction, avoidance, mixed signals, communication, timing, who moves toward and who pulls back. ` +
      `Speak with directness, prioritizing clarity over comfort. Be honest about red flags without being harsh. ` +
      `Do NOT act as a therapist. PREFER observable behavior: withdraws, hesitates, avoids definition, keeps distance, moves closer, opens up, shows effort, holds back, commits when comfortable. ` +
      `Do NOT use: attachment style, fear of commitment, trauma response, inner child, healing journey, emotional processing, psychological wounds, internal resistance, unspoken anxieties, immaturity. ` +
      `Do NOT use filler phrases like "a similar pattern appears again here". Do NOT end every reading on "what is unspoken / hidden / avoided" — vary the ending with a concrete read of where this is going. ` +
      `SELF-CHECK before finalizing: Did each paragraph translate the card into a real statement about the relationship, or did it stop at the card's generic meaning? If any paragraph is only a card definition, rewrite it to say what is happening between these two people. ` +
      `This is reflective guidance, not a guarantee — let the reader decide for themselves. ` +
      `\n\nQUESTION TYPE — tailor the reading accordingly: ${directive} ` +
      relationshipEngineInstruction;
  }
  if (domain === 'decision') {
    return baseInstruction +
      `This is a decision reading — a choice the querent is weighing (a job, a move, a commitment, a relationship). ` +
      `Interpret the three cards (past / present / future) as the trajectory of the decision. ` +
      `Always cover three things concretely: (1) what SUPPORTS the option or path, (2) what CHALLENGES or works against it, (3) the likely OUTCOME if the current course continues. ` +
      (isReflectionQ
        ? `This question is introspective (e.g. "why do I hesitate", "am I deciding from fear or strategy"). You MAY address the querent's own decision pattern — but as a CONCRETE behavioral pattern (what they do, when, the cost), NOT abstract psychology.` + REFLECTION_GUIDANCE
        : `Avoid psychological interpretation — do not analyze the querent's inner state, fears, or growth. Discuss the practical situation and what each direction favors. `) +
      `Give grounded, practical guidance. ` +
      `ALWAYS end with a directional lean. Do NOT leave the reading completely unresolved. ` +
      `Examples: "The energy leans toward waiting." / "The energy leans toward moving forward." / "The energy leans toward letting this pass." ` +
      `The reader came to understand which direction has more energy behind it — give them that. ` +
      relationshipEngineInstruction;
  }
  return baseInstruction +
    `This is a FORTUNE / general life reading — about daily life, career, health, family, environment, and the querent's overall situation. ` +
    `It is NOT a financial/wealth reading (that is the separate stock/Inner Abundance domain). ` +
    `Avoid finance vocabulary entirely: do NOT use words like "financial", "wealth", "money", "investment", "resources" (as in money), "ventures", "abundance" (as wealth). ` +
    `Interpret PENTACLES primarily as energy, stability, embodiment, daily life rhythm, craftsmanship, or practical grounding — NOT as money or material — unless the question is explicitly financial. ` +
    `PRIORITY — spend most of the reading explaining the user's real-life situation, not explaining the cards. Do NOT spend more than one paragraph on card imagery. ` +
    (isReflectionQ
      ? `This question is introspective (e.g. "why do I keep doing X", "what pattern holds me back"). You MAY center the querent's own pattern — but describe it as CONCRETE recognizable behavior (what they do, when, the cost), NOT abstract inner-work language.` + REFLECTION_GUIDANCE
      : `Always answer these three questions clearly: (1) what is actually happening in this person's life right now, (2) why it is happening, (3) what the person is likely to experience next. ` +
        `Focus on: events, circumstances, daily life, career rhythm, timing, practical obstacles, external influences, and people around the querent. ` +
        `Do NOT discuss: inner landscape, inner process, emotional center, deeper knowing, personal growth, healing journey, self-discovery, or inner transformation. ` +
        `For each card, describe people, situations, opportunities, conflicts, delays, decisions, and environmental changes — BEFORE discussing emotions. ` +
        `Describe what is happening around the person — not only what is happening inside them. `) +
    `The reading should feel like an experienced tarot reader describing what is unfolding — not a therapist analyzing psychology. ` +
    `Weave in the moon phase and numerology where natural. ` +
    `Offer guidance that helps the reader decide for themselves. ` +
    relationshipEngineInstruction;
}

/* ════════════════════════════════════════
   WORKER (single export default)
════════════════════════════════════════ */
/* ════════════════════════════════════════
   PREMIUM GATING
   Free tier gets a teaser: summary fields only.
   Paid tier (verified token) gets full layers + finalOracle + AI reading.
════════════════════════════════════════ */
function buildFreeMetrics(metrics) {
  // Keep only the non-premium "teaser" fields; drop the 5-layer analysis
  // and the long final oracle text.
  const {
    domain, queryType, subjectName,
    trend, action, riskLevel,
    totalScore, riskScore, volatilityScore,
    cardNarrative, flowSummary,
    blocked
  } = metrics;
  return {
    domain: domain || queryType,
    subjectName,
    trend, action, riskLevel,
    totalScore, riskScore, volatilityScore,
    // a short, non-premium glimpse of the cards
    cardNarrative: Array.isArray(cardNarrative) ? cardNarrative : undefined,
    flowSummary,
    blocked: !!blocked,
    _locked: true,
    _teaser: 'Unlock the full reading to reveal the 5-layer decision analysis and your complete oracle.'
  };
}

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);

    // ---- Simple payment / access verification ----
    // ════════════════════════════════════════
    //  PAYMENT ENDPOINTS (aligned to frontend contract)
    // ════════════════════════════════════════

    // 1) Create checkout session.
    //    Frontend expects { url, test_mode }. If real Stripe is configured
    //    (STRIPE_SECRET_KEY + a real price id), return a hosted checkout url.
    //    Otherwise return { test_mode: true } so the frontend falls back to /unlock-test.
    if (url.pathname === '/create-checkout-session' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const plan = body && body.plan;
        if (!isValidPlan(plan)) {
          return new Response(JSON.stringify({ ok: false, error: 'Invalid plan' }),
            { status: 400, headers: corsHeaders() });
        }

        const priceId = env && env[`STRIPE_PRICE_${plan.toUpperCase()}`];
        const stripeKey = env && env.STRIPE_SECRET_KEY;

        // Real Stripe path (only when fully configured with a non-placeholder price id)
        if (stripeKey && priceId && !String(priceId).includes('TODO')) {
          const origin = url.origin;
          const isSubscription = (plan === 'monthly' || plan === 'yearly');
          const form = new URLSearchParams();
          form.set('mode', isSubscription ? 'subscription' : 'payment');
          form.set('line_items[0][price]', priceId);
          form.set('line_items[0][quantity]', '1');
          form.set('success_url', `${origin}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`);
          form.set('cancel_url', `${origin}/?canceled=1`);
          form.set('metadata[plan]', plan);

          const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${stripeKey}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: form.toString()
          });
          const session = await stripeRes.json();
          if (!stripeRes.ok) {
            return new Response(JSON.stringify({ ok: false, error: session?.error?.message || 'Stripe error', test_mode: true }),
              { status: 200, headers: corsHeaders() });
          }
          return new Response(JSON.stringify({ ok: true, url: session.url, test_mode: false }),
            { status: 200, headers: corsHeaders() });
        }

        // Test mode — Stripe not configured yet (price_TODO_*)
        return new Response(JSON.stringify({ ok: true, test_mode: true }),
          { status: 200, headers: corsHeaders() });
      } catch (err) {
        // Any failure still routes the frontend into test mode gracefully
        return new Response(JSON.stringify({ ok: false, test_mode: true, error: err.message }),
          { status: 200, headers: corsHeaders() });
      }
    }

    // 2) Test-mode unlock — issues a real signed token without payment.
    //    Frontend expects { ok: true, token }.
    if (url.pathname === '/unlock-test' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const plan = (body && body.plan) || 'trial';
        if (!isValidPlan(plan)) {
          return new Response(JSON.stringify({ ok: false, error: 'Invalid plan' }),
            { status: 400, headers: corsHeaders() });
        }
        const token = await issueToken(env, plan);
        return new Response(JSON.stringify({ ok: true, token, plan, test_mode: true }),
          { status: 200, headers: corsHeaders() });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }),
          { status: 500, headers: corsHeaders() });
      }
    }

    // 3) Verify a completed Stripe payment by session id.
    //    Frontend expects { ok: true, token, plan }.
    if (url.pathname === '/verify-payment' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const sessionId = body && body.sessionId;
        if (!sessionId) {
          return new Response(JSON.stringify({ ok: false, error: 'Missing sessionId' }),
            { status: 400, headers: corsHeaders() });
        }

        const stripeKey = env && env.STRIPE_SECRET_KEY;
        if (!stripeKey) {
          return new Response(JSON.stringify({ ok: false, error: 'Stripe not configured' }),
            { status: 503, headers: corsHeaders() });
        }

        const sRes = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
          headers: { 'Authorization': `Bearer ${stripeKey}` }
        });
        const session = await sRes.json();
        if (!sRes.ok) {
          return new Response(JSON.stringify({ ok: false, error: session?.error?.message || 'Stripe lookup failed' }),
            { status: 502, headers: corsHeaders() });
        }

        const paid = session.payment_status === 'paid' || session.status === 'complete';
        const plan = (session.metadata && session.metadata.plan) || 'monthly';
        if (!paid) {
          return new Response(JSON.stringify({ ok: false, error: 'Payment not completed' }),
            { status: 402, headers: corsHeaders() });
        }
        const token = await issueToken(env, isValidPlan(plan) ? plan : 'monthly');
        return new Response(JSON.stringify({ ok: true, token, plan }),
          { status: 200, headers: corsHeaders() });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }),
          { status: 500, headers: corsHeaders() });
      }
    }

    // ---- Main oracle endpoint (SSE stream) ----
    if (url.pathname === '/oracle' && request.method === 'POST') {
      // Rate limit the expensive (Gemini-backed) endpoint: 30 requests / minute per IP.
      // No-op if KV isn't bound yet.
      const rl = await checkRateLimit(env, request, 30, 60);
      if (!rl.ok) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please slow down.' }),
          { status: 429, headers: { ...corsHeaders(), 'Retry-After': String(rl.retryAfter || 60) } });
      }
      let body;
      try {
        body = await request.json();
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }),
          { status: 400, headers: corsHeaders() });
      }

      const prompt = (body.prompt || '').toString();
      const cardsCSV = (body.cards || '').toString();
      const reversedCSV = (body.reversed || '').toString();
      const isLeverage = body.leverage === true;

      // ── ZEUS SHIELD EN (security layer) ──────────────────────────────
      // Runs BEFORE crisis check and Gemini call.
      // Blocks: SYSTEM_LOCK / prompt injection / concurrency abuse /
      //         adaptive cooldown / global daily budget ceiling.
      // Plan limits are handled separately by checkDailyLimit (not duplicated).
      // Fail-open if KV unbound — never blocks legitimate users.
      const tokenStrForShield = (request.headers.get('Authorization') || '').replace('Bearer ', '').trim()
                              || (body.token || '').toString();
      const shieldPayload = tokenStrForShield ? await verifyToken(env, tokenStrForShield) : null;
      const shieldJti = shieldPayload ? shieldPayload.jti : null;
      let _shieldData = null;
      const shieldResult = await handleZeusShieldEN(request, env, shieldJti, prompt);
      if (shieldResult instanceof Response) return shieldResult;
      if (shieldResult && shieldResult.success) _shieldData = shieldResult;

      // ── LAYER 3 (safety, highest priority): crisis-signal detection ──
      // If the question contains clear crisis language, do NOT run a reading.
      // Route to real help instead. This overrides everything else.
      // Sent as an SSE stream (data: ...) so the frontend's stream parser reads it.
      if (detectCrisisSignal(prompt)) {
        const enc = new TextEncoder();
        const crisisStream = new ReadableStream({
          start(controller) {
            controller.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'crisis', message: CRISIS_RESPONSE })}\n\n`));
            controller.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'done' })}\n\n`));
            controller.close();
          }
        });
        return new Response(crisisStream, {
          status: 200,
          headers: { ...corsHeaders(), 'Content-Type': 'text/event-stream; charset=utf-8' }
        });
      }

      // ---- Server-side premium gate ----
      // Trust a verified signed token, NOT the client's `paid` claim.
      // Accept token from Authorization: Bearer <token> or body.token.
      const authHeader = request.headers.get('Authorization') || '';
      const bearer = authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.slice(7).trim() : '';
      const tokenStr = bearer || (body.token || body.sessionToken || '').toString();
      const tokenPayload = tokenStr ? await verifyToken(env, tokenStr) : null;
      const paid = !!tokenPayload; // server-verified; body.paid is ignored

      if (!cardsCSV) {
        return new Response(JSON.stringify({ error: 'No cards provided' }),
          { status: 400, headers: corsHeaders() });
      }

      // 1. Classify + score
      //    Trust the domain the frontend sends (love | fortune | decision | stock).
      //    Fall back to keyword classification only if it's missing/invalid.
      const VALID_DOMAINS = ['love', 'fortune', 'decision', 'stock'];
      const requestedDomain = (body.domain || '').toString().toLowerCase();
      const domain = VALID_DOMAINS.includes(requestedDomain)
        ? requestedDomain
        : classifyDomainEN(prompt);
      const intent = domain === 'stock' ? detectStockIntentEN(prompt) : 'buy';
      const scoreType = domain === 'stock' ? 'stock' : (domain === 'love' ? 'love' : 'fortune');
      const sc = calcCardScores(cardsCSV, reversedCSV, scoreType);
      const subject = extractSubjectEN(prompt);
      const relationshipState = analyzeRelationship(sc.cleanCards);

      // ── LAYER 1 (cost control): daily deep-reading limit ──
      // A paid token gets a full AI ("deep") reading, capped per day by plan.
      // Free users get a teaser (no AI call), so no deep-limit applies to them.
      // When the deep cap is hit, return a gentle cooldown instead of an AI call.
      let dependencyNote = null;
      if (paid && tokenPayload && tokenPayload.jti) {
        const limitCheck = await checkDailyLimit(env, tokenPayload.jti, tokenPayload.plan, 'deep');
        if (!limitCheck.allowed) {
          const enc = new TextEncoder();
          const cdStream = new ReadableStream({
            start(controller) {
              controller.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'cooldown', message: limitCheck.message })}\n\n`));
              controller.enqueue(enc.encode(`data: ${JSON.stringify({ _type: 'done' })}\n\n`));
              controller.close();
            }
          });
          return new Response(cdStream, {
            status: 200,
            headers: { ...corsHeaders(), 'Content-Type': 'text/event-stream; charset=utf-8' }
          });
        }
        // ── LAYER 2 (wellbeing): emotional-dependency pattern (non-blocking) ──
        // If the user keeps returning to the same question/domain, append a gentle note.
        dependencyNote = detectDependencyPattern(body.prevContext, domain, prompt);
      }

      // 2. Build context + run engine
      const ctx = {
        totalScore: sc.totalScore,
        riskScore: sc.riskScore,
        cleanCards: sc.cleanCards,
        reversedFlags: sc.reversedFlags,
        synergies: sc.synergies,
        isLeverage, domain, intent, prompt
      };
      const metrics = mainEngine(ctx);
      metrics.subjectName = subject || metrics.subjectName || 'this reading';

      // 3. Stream: metrics first, then Gemini tokens
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const send = (obj) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
          try {
            // Premium gate: paid users (verified token) get full metrics with
            // layers + finalOracle; free users get a stripped teaser and no AI reading.
            if (!paid) {
              send({ _type: 'metrics', data: buildFreeMetrics(metrics) });
              const teaser = `Your cards point to a ${metrics.trend} flow. ` +
                `Unlock the full reading to reveal your complete oracle and the 5-layer decision analysis.`;
              send({ _type: 'token', text: teaser });
              send({ _type: 'locked', reason: 'premium_required' });
              send({ _type: 'done' });
              controller.close();
              return;
            }

            send({ _type: 'metrics', data: metrics });

            const loveSubtype = domain === 'love' ? detectLoveSubtype(prompt) : null;
            const _emotion = mapEmotion(sc.cleanCards, sc.totalScore, sc.reversedFlags);
            const oracleStyle = pickOracleStyle(_emotion, sc.cleanCards);

            // Layer 2-Lite: prevContext carries last reading's lightweight state (domain, lens, verdict, card, ts).
            // Used for (a) lens cooldown — don't pick same lens twice in a row,
            // and (b) subtle continuity hint to AI when same domain reappears within 7 days.
            const prevContext = (body && body.prevContext && typeof body.prevContext === 'object') ? body.prevContext : null;
            const prevLens = prevContext && typeof prevContext.lastLens === 'string' ? prevContext.lastLens : null;
            const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
            const sameSession = !!(prevContext && prevContext.ts && (Date.now() - prevContext.ts < oneWeekMs)
                                   && prevContext.lastDomain === domain);

            const lens = pickInterpretationLens(prompt, sc.cleanCards, _emotion, prevLens);

            // Symbolic gravity — compute per-card weight, classify spread tier.
            const gravityProfile = calculateGravityProfile(sc.cleanCards, sc.reversedFlags, prompt);
            const gravityPromptBlock = buildGravityPromptBlock(gravityProfile);

            // LENS APPLICATION (research-aligned: selective, native-first):
            // - NATIVE PRIORITY is ALWAYS injected (cards keep own meaning, archetypes protected).
            // - The lens itself is applied only as a secondary thread, and ONLY when the
            //   spread has enough emotional weight (gravity subtle/dominant). On flat/balanced
            //   spreads, skip the lens entirely so the reading follows the cards, not a theme.
            //   This directly prevents "every question becomes a psychology reading."
            const applyLens = (gravityProfile.tier === 'subtle' || gravityProfile.tier === 'dominant')
                              || (_emotion && _emotion.tension >= 0.5);
            const lensPromptBlock = applyLens ? (LENS_PROMPT[lens] || '') : '';
            const effectiveLens = applyLens ? lens : 'none';

            // Subtle continuity hint — only when same-domain repeat visit within 7 days.
            let continuityHint = '';
            if (sameSession && prevContext.lastVerdict && lens !== prevLens) {
              continuityHint = `\nCONTINUITY HINT (use subtly, never name): The querent has been reflecting in this domain recently (last reading verdict: ${prevContext.lastVerdict}). You may let the reading feel quietly connected to an ongoing situation, but NEVER reference a previous reading directly and NEVER use filler phrases like "a similar pattern appears again". Just read these cards on their own terms.`;
            }

            // Lexical cooldown — discourage (not ban) repeating overused abstractions
            // from the recent reading, to keep language fresh across consecutive readings.
            let lexicalHint = '';
            if (prevContext && Array.isArray(prevContext.lexicalEchoes) && prevContext.lexicalEchoes.length) {
              const echoes = prevContext.lexicalEchoes.filter(w => typeof w === 'string').slice(0, 5);
              if (echoes.length) {
                lexicalHint = `\nLEXICAL FRESHNESS: Avoid repeating these recently overused emotional abstractions unless truly necessary: ${echoes.join(', ')}. Prefer fresh, concrete symbolic phrasing instead.`;
              }
            }

            metrics.oracleStyle = oracleStyle;
            metrics.emotion = _emotion;
            metrics.lens = effectiveLens;            // expose to client (now reflects whether lens actually applied)
            metrics.gravityTier = gravityProfile.tier;
            const systemPrompt = buildSystemPromptEN(domain, subject, relationshipState, loveSubtype, oracleStyle, prompt)
                               + `\n${LENS_NATIVE_PRIORITY}`
                               + (lensPromptBlock ? `\n\n${lensPromptBlock}` : '')
                               + gravityPromptBlock
                               + continuityHint
                               + lexicalHint;

            // For the Wealth Energy (stock) domain, feed the AI the symbolic
            // energy/shadow seeds for the drawn cards — never trade metrics.
            let seedBlock = '';
            if (domain === 'stock') {
              const lines = sc.cleanCards.map((c, i) => {
                const seed = WEALTH_SEED[c];
                const role = ['Past', 'Present', 'Future'][i] || 'Card';
                if (!seed) return `${role} (${c}): general abundance energy`;
                const rev = sc.reversedFlags[i] ? ' [reversed — the shadow side is emphasized]' : '';
                return `${role} (${c})${rev}: energy = ${seed.energy}; shadow = ${seed.shadow}`;
              });
              seedBlock = `Wealth energy seeds for each card (expand these into a flowing symbolic reading; do NOT list them verbatim):\n${lines.join('\n')}\n`;
            } else if (domain === 'fortune' || domain === 'decision') {
              const lines = sc.cleanCards.map((c, i) => {
                const seed = FORTUNE_SEED[c];
                const role = ['Past', 'Present', 'Future'][i] || 'Card';
                if (!seed) return `${role} (${c}): general life energy`;
                const rev = sc.reversedFlags[i] ? ' [reversed — the shadow side is emphasized]' : '';
                return `${role} (${c})${rev}: energy = ${seed.energy}; shadow = ${seed.shadow}`;
              });
              seedBlock = `Life energy seeds for each card (weave these into a flowing reading; do NOT list them verbatim):\n${lines.join('\n')}\n`;
            }

            const userPrompt =
              `Cards (past, present, future): ${sc.cleanCards.join(', ')}\n` +
              `Reversed flags: ${sc.reversedFlags.join(', ')}\n` +
              `Question: ${prompt}\n` +
              (domain === 'stock'
                ? `Overall energy: ${metrics.trend}.\n${seedBlock}`
                : (domain === 'fortune' || domain === 'decision')
                  ? `Overall flow: ${metrics.trend}.\n${seedBlock}`
                  : `Computed flow: ${metrics.trend} | action: ${metrics.action} | risk: ${metrics.riskLevel}\n`) +
              (domain === 'fortune'
                ? `Relationship signal: ${relationshipState.relationshipType} (intensity ${relationshipState.emotionalIntensity}, attachment ${relationshipState.attachment}, communication ${relationshipState.communication}, reconciliation ${relationshipState.reconciliation}).\n`
                : '') +
              (domain === 'love' && loveSubtype
                ? `Detected question type: ${loveSubtype}.\n`
                : '') +
              `Write the reading now.`;

            const apiKey = env.GEMINI_API_KEY;
            // Log prompt sizes to detect token bloat
            console.log(`[ZEUS] systemPrompt: ${systemPrompt.length} chars, userPrompt: ${userPrompt.length} chars, total: ${systemPrompt.length + userPrompt.length} chars`);
            console.log('userPrompt:', userPrompt);
            if (!apiKey) {
              send({ _type: 'token', text: metrics.finalOracle || 'Reading energy computed; AI narration unavailable (no API key).' });
              send({ _type: 'done' });
              controller.close();
              return;
            }

            const geminiUrl =
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;
            const geminiBody = JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
                generationConfig: { temperature: 0.85, maxOutputTokens: 8192 },
                safetySettings: [
                  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
                ]
              });
            // Retry on transient Gemini errors (503 overload, 429 rate, 500 internal).
            let gemResp;
            const RETRYABLE = [429, 500, 502, 503, 504];
            for (let attempt = 0; attempt < 3; attempt++) {
              gemResp = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: geminiBody
              });
              if (gemResp.ok && gemResp.body) break;
              if (!RETRYABLE.includes(gemResp.status) || attempt === 2) break;
              console.log('Gemini retry:', gemResp.status, 'attempt', attempt + 1);
              await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
            }

            if (!gemResp.ok || !gemResp.body) {
              const errText = await gemResp.text().catch(() => '');
              console.log('Gemini status:', gemResp.status, 'body:', errText.slice(0, 200));
              // Release concurrency lock immediately (don't rely on finally during stream close)
              try { const _kv = getKV(env); if (_kv && _shieldData && _shieldData.concurrentKey) await _kv.delete(_shieldData.concurrentKey); } catch (_) {}
              send({ _type: 'token', text: metrics.finalOracle || 'AI narration unavailable.' });
              send({ _type: 'error', message: `Gemini error ${gemResp.status}: ${errText.slice(0, 200)}` });
              send({ _type: 'done' });
              controller.close();
              return;
            }

            const reader = gemResp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop() || '';
              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith('data:')) continue;
                const payload = trimmed.slice(5).trim();
                if (!payload || payload === '[DONE]') continue;
                try {
                  const json = JSON.parse(payload);
                  const candidate = json?.candidates?.[0];
                  if (!candidate) console.log('NO_CANDIDATE:', JSON.stringify(json).slice(0,1000));
                  if (candidate) console.log('CANDIDATE_KEYS:', Object.keys(candidate).join(','));
                  const parts = candidate?.content?.parts || [];
                  if (parts.length === 0 && candidate) console.log('EMPTY_CANDIDATE:', JSON.stringify(candidate).slice(0,1000));
                  const finishReason = candidate?.finishReason;
                  if (finishReason && finishReason !== 'STOP') console.log('Gemini finishReason:', finishReason);
                  for (const part of parts) {
                    if (part.text) {
                      const safeText = domain === 'stock'
                        ? sanitizeWealthText(part.text) : part.text;
                      console.log('token chunk:', safeText.length, 'chars');
                      send({ _type: 'token', text: safeText });
                    }
                  }
                } catch (e) {
                  // partial JSON chunk — ignore, will be completed in next read
                }
              }
            }

            if (dependencyNote) {
              send({ _type: 'dependency_note', text: dependencyNote });
            }
            send({ _type: 'done' });
            // ── Shield commit: Gemini succeeded → record usage ──
            await commitShieldEN(env, _shieldData);
            controller.close();
          } catch (err) {
            // ── Shield rollback: Gemini failed → don't penalise user ──
            await rollbackShieldEN(env, _shieldData);
            try { send({ _type: 'error', message: err.message }); } catch (_) {}
            try { controller.close(); } catch (_) {}
          } finally {
            // Always release concurrency lock — prevent stuck lock on any exit path
            const kv = getKV(env);
            if (kv && _shieldData && _shieldData.concurrentKey) {
              try { await kv.delete(_shieldData.concurrentKey); } catch (_) {}
            }
          }
        }
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders(),
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    // ---- Admin: revoke a token by jti (refund / abuse handling) ----
    //   POST /revoke { jti }  with header  x-admin-key: <env.ADMIN_KEY>
    //   Requires KV bound + ADMIN_KEY set. Used by your refund webhook/dashboard.
    if (url.pathname === '/revoke' && request.method === 'POST') {
      const adminKey = env && env.ADMIN_KEY;
      const provided = request.headers.get('x-admin-key') || '';
      if (!adminKey || provided !== adminKey) {
        return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }),
          { status: 401, headers: corsHeaders() });
      }
      if (!getKV(env)) {
        return new Response(JSON.stringify({ ok: false, error: 'KV not bound — cannot revoke' }),
          { status: 503, headers: corsHeaders() });
      }
      const body = await request.json().catch(() => ({}));
      const jti = body && body.jti;
      if (!jti) {
        return new Response(JSON.stringify({ ok: false, error: 'Missing jti' }),
          { status: 400, headers: corsHeaders() });
      }
      // Keep the revocation entry ~1 year (longer than any token lifetime).
      const done = await revokeToken(env, jti, 60 * 60 * 24 * 366);
      return new Response(JSON.stringify({ ok: done }),
        { status: done ? 200 : 500, headers: corsHeaders() });
    }

    // ---- Health / config check ----
    // ---- Dev: reset daily limits (delete all daily_deep KV keys) ----
    if (url.pathname === '/dev-reset' && request.method === 'POST') {
      const kv = getKV(env);
      if (!kv) return new Response(JSON.stringify({ ok: false, error: 'KV not bound' }), { status: 500, headers: corsHeaders() });
      try {
        const list = await kv.list({ prefix: 'daily_deep:' });
        const keys = list.keys.map(k => k.name);
        await Promise.all(keys.map(k => kv.delete(k)));
        // Also delete active_en keys
        const active = await kv.list({ prefix: 'active_en:' });
        await Promise.all(active.keys.map(k => kv.delete(k.name)));
        return new Response(JSON.stringify({ ok: true, deleted: keys.length + active.keys.length, keys }), { status: 200, headers: corsHeaders() });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: corsHeaders() });
      }
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        ok: true,
        service: 'ZEUS AI ORACLE — EN',
        config: {
          token_secret: !!(env && env.TOKEN_SECRET),
          gemini: !!(env && env.GEMINI_API_KEY),
          stripe: !!(env && env.STRIPE_SECRET_KEY),
          kv_bound: !!getKV(env),
          admin_key: !!(env && env.ADMIN_KEY)
        }
      }), { status: 200, headers: corsHeaders() });
    }

    // ---- Fallback ----
    return new Response(JSON.stringify({ ok: true, service: 'ZEUS AI ORACLE — EN', endpoints: ['/oracle', '/create-checkout-session', '/unlock-test', '/verify-payment', '/revoke', '/health'] }),
      { status: 200, headers: corsHeaders() });
  }
};
