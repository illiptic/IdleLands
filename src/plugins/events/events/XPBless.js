
import { Event } from '../event';
import { MessageCategories } from '../../../shared/adventure-log';

import { XPBlessParty } from './XPBlessParty';

export const WEIGHT = 108;

// Gain 1-3% XP
export class XPBless extends Event {
  static WEIGHT = WEIGHT;

  static operateOn(player) {
    if(player.party && Event.chance.bool({ likelihood: 70 })) {
      XPBlessParty.operateOn(player);
      return player.party.players;
    }

    let percent = Event.chance.floating({ fixed: 5, min: 0.01, max: 0.03 });

    const baseXp = Math.floor(player._xp.maximum * percent);
    const xpMod = player.gainXp(baseXp);
    const eventText = this.eventText('blessXp', player, { xp: xpMod });

    // recalculate for the modified value
    percent = xpMod/player._xp.maximum;

    this.emitMessage({ affected: [player], eventText: `${eventText} [+${xpMod.toLocaleString()} xp, ~${(percent*100).toFixed(2)}%]`, category: MessageCategories.XP });

    return [player];
  }
}