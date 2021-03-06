
import { Achievement, AchievementTypes } from '../achievement';

export class Levelable extends Achievement {
  static achievementData(player) {
    const tier = Math.floor(player.level/10);
    if(tier === 0) return [];

    const rewards = [{
      type: 'stats',
      luk: tier,
      xp: tier
    }];

    if(tier >= 10) {
      rewards.push({ type: 'title', title: 'Centennial', deathMessage: '%player was so old, this was probably coming.' });
    }

    if(tier >= 15) {
      rewards.push({ type: 'petattr', petattr: 'an old person' });
    }

    if(tier >= 20) {
      rewards.push({ type: 'title', title: 'Bicentennial', deathMessage: '%player should have wasted away a long time ago!' });
    }

    if(tier >= 25) {
      rewards.push({ type: 'petattr', petattr: 'a really old person' });
    }

    if(tier > 100) {
      rewards.push({ type: 'title', title: 'Milennial', deathMessage: '%player oversaw many generations before finally crumbling into dust.' });
    }

    return [{
      tier,
      name: 'Levelable',
      desc: `Gain +${tier} LUK and +${tier} Bonus XP (added every time XP is gained) for being level ${(tier*10).toLocaleString()}.`,
      type: AchievementTypes.PROGRESS,
      rewards
    }];
  }
}