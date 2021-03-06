
import * as _ from 'lodash';
import { Event } from '../event';

import { MessageCategories } from '../../../shared/adventure-log';

export const WEIGHT = 6;
const MIN_GOLD = 5000;
const INCOME_PERCENT = 10;

// Get the opportunity to gamble away your gold
export class Gambling extends Event {
  static WEIGHT = WEIGHT;

  static operateOn(player) {

    if(player.gold < MIN_GOLD * INCOME_PERCENT) return;
    const cost = this.chance.integer({ min: MIN_GOLD, max: player.gold / INCOME_PERCENT });

    const id = Event.chance.guid();
    const multiplier = this.chance.floating({ fixed: 2, min: 1.3, max: 2 });
    const odds = this.chance.integer({ min: 10, max: 50 });

    const message = `Would you like to gamble ${cost.toLocaleString()} gold at a ${multiplier}x rate with ${odds}% chance to win?`;
    const extraData = { multiplier, cost, odds };

    player.addChoice({ id, message, extraData, event: 'Gambling', choices: ['Yes', 'No', 'Double Down'] });

    return [player];
  }

  static makeChoice(player, id, response) {
    if(response === 'No') return;

    const choice = _.find(player.choices, { id });
    let { cost, multiplier, odds } = choice.extraData;

    const isDoubleDown = response === 'Double Down';
    if(isDoubleDown) {
      cost *= 2;
      multiplier *= 2;
      odds /= 2;
    }

    if(player.gold < cost || _.isNaN(cost) || cost < 0) return Event.feedback(player, 'You do not have enough gold!');

    if(isDoubleDown) {
      player.$statistics.incrementStat('Character.Gamble.DoubleDown');
    }

    let message = '';

    if(Event.chance.bool({ likelihood: odds })) {
      const winnings = Math.round(cost * multiplier);
      player.gainGold(winnings, false);
      player.$statistics.incrementStat('Character.Gold.Gamble.Win', winnings);
      player.$statistics.incrementStat('Character.Gamble.WinTimes');
      if(isDoubleDown) {
        player.$statistics.incrementStat('Character.Gamble.WinTimesDoubleDown');
      }
      message = `%player got lucky and bet ${cost.toLocaleString()} gold against the odds of ${odds}%${isDoubleDown ? ' (Double Down)': ''}. %She came out ahead with ${winnings.toLocaleString()} gold!`;
    } else {
      player.gainGold(-cost, false);
      player.$statistics.incrementStat('Character.Gold.Gamble.Lose', cost);
      player.$statistics.incrementStat('Character.Gamble.LoseTimes');
      if(isDoubleDown) {
        player.$statistics.incrementStat('Character.Gamble.LoseTimesDoubleDown');
      }
      message = `%player felt lucky and bet ${cost.toLocaleString()} gold against the odds of ${odds}${isDoubleDown ? ' (Double Down)': ''}%. %She lost it all at the table.`;
    }

    message = this._parseText(message, player);

    this.emitMessage({ affected: [player], eventText: message, category: MessageCategories.GOLD });
  }
}

