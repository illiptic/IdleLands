
import * as _ from 'lodash';

const teleports = require('../../assets/maps/content/teleports.json');

class Settings {

  allTeleports: any[];
  timeframeSeconds = 5;
  maxLevel = 200;
  xpPerStep = 5;

  ilpConversionRate = 20000;

  pvpBattleRange = 1000;
  minBattleLevel = 5;
  minPartyLevel = 10;
  maxPartyMembers = 4;

  merchantMultiplier = 3;

  saveSteps = 10;
  achievementSteps = 60;

  ascensionLevelBoost = 50;
  ascensionXpCurve = 20;

  guild = {
    cost: 100000000
  };

  reductionDefaults = {
    itemFindRange: 12,
    itemFindRangeMultiplier: 0.5,
    itemValueMultiplier: 0.1,
    merchantCostReductionMultiplier: 0.0,
    merchantItemGeneratorBonus: 5
  };

  validGenders = ['male', 'female', 'not a bear', 'glowcloud', 'astronomical entity'];

  validPetAttributes = [
    'a top hat',
    'a monocle',
    'a fedora',
    'a bag of chips',
    'a giant keychain',
    'a rubber duck',
    'a glowing leek',
    'a YBox controller',
    'a Gandum minifig',
    'a pocket watch',
    'a cumberbund',
    'a funky tie',
    'a doily',
    'a polka-dot pillowcase',
    'a giant stack of sticky notes',
    'a miniature replica of the worlds biggest roller-coaster',
    'a spork with a knife on the other side',
    'a shiny medallion',
    'a used drinking straw',
    'a popping filter',
    'a giant rock used to stop doors dead in their tracks',
    'a tab formerly attached to a Dosa Can'
  ];

  maxChoices = 10;

  chatMessageMaxLength = 500;

  holidays = {
    valentine: {
      start: new Date('Feb 1'),
      end:   new Date('Feb 28')
    },
    leprechaun: {
      start: new Date('Mar 1'),
      end:   new Date('Mar 31')
    },
    eggs: {
      start: new Date('Apr 1'),
      end:   new Date('Apr 30')
    },
    anniversary: {
      start: new Date('Jun 1'),
      end:   new Date('Jun 30')
    },
    fireworks: {
      start: new Date('Jul 1'),
      end:   new Date('Jul 31')
    },
    school: {
      start: new Date('Sep 1'),
      end:   new Date('Sep 30')
    },
    hallows: {
      start: new Date('Oct 1'),
      end:   new Date('Oct 31')
    },
    turkeys: {
      start: new Date('Nov 1'),
      end:   new Date('Nov 31')
    },
    winter: {
      start: new Date('Dec 1'),
      end:   new Date('Dec 31')
    }
  };

  externalChat = 'irc';

  chatConfig = {
    irc: {
      server: 'irc.freenode.net',
      nick: 'idlelandschat',
      channel: '##idlebot'
    }
  };

  gidMap = {
    1: 'StairsDown',
    2: 'StairsUp',
    3: 'BrickWall',
    4: 'Grass',
    5: 'Water',
    6: 'Lava',
    7: 'Tile',
    8: 'Ice',
    9: 'Forest',
    10: 'Sand',
    11: 'Swamp',
    12: 'BlueNPC',
    13: 'RedNPC',
    14: 'GreenNPC',
    15: 'QuestionMark',
    16: 'Tree',
    17: 'Mountain',
    18: 'Door',
    19: 'Dirt',
    20: 'FighterTrainer',
    21: 'MageTrainer',
    22: 'ClericTrainer',
    23: 'JesterTrainer',
    24: 'RogueTrainer',
    25: 'GeneralistTrainer',
    26: 'Boss',
    27: 'Chest',
    28: 'PurpleTeleport',
    29: 'RedTeleport',
    30: 'YellowTeleport',
    31: 'GreenTeleport',
    32: 'BlueTeleport',
    33: 'Cloud',
    34: 'Wood',
    35: 'Hole',
    36: 'Gravel',
    37: 'Mushroom',
    38: 'StoneWall',
    39: 'Box',
    40: 'LadderUp',
    41: 'LadderDown',
    42: 'RopeUp',
    43: 'RopeDown',
    44: 'Table',
    45: 'Pot',
    46: 'Barrel',
    47: 'Bed',
    48: 'Sign',
    49: 'Carpet',
    50: 'CrumblingBrick',
    51: 'Skeleton',
    52: 'Snow',
    53: 'Fence',
    54: 'Dead Tree',
    55: 'Palm Tree',
    56: 'Cactus',
    57: 'Pillar',
    58: 'StoneDoor',
    59: 'Chair',
    60: 'GoldPile',
    61: 'Bloodstain',
    62: 'FenceGate',
    63: 'Glowcloud',
    64: 'ArcherTrainer',
    65: 'PirateTrainer',
    66: 'MagicalMonsterTrainer',
    67: 'MonsterTrainer',
    68: 'BarbarianTrainer',
    69: 'BardTrainer',
    70: 'SandwichArtistTrainer',
    71: 'NecromancerTrainer',
    72: 'BitomancerTrainer',
    73: 'NotABear',
    74: 'AstronomicalEntity',
    75: 'TownCrier',
    76: 'LootSack',
    77: 'LootSackWithSword',
    78: 'EmptyLootSack',
    79: 'Tombstone',
    80: 'Astral',
    81: 'NightSky',
    82: 'Acid',
    83: 'TreeStump',
    84: 'AntiShrine',
    85: 'Shrine',
    86: 'Merchant',
    87: 'JailDoor',
    88: 'StoneJailDoor'
  };

  revGidMap: any = {};

  locToTeleport(name) {
    return _.find(this.allTeleports, { name });
  }

  constructor() {
    this.allTeleports = _(teleports)
      .values()
      .map(entry => _.map(entry, (loc, key) => {
        loc.name = key;
        return loc;
      }))
      .flattenDeep()
      .value();

    this.revGidMap = _.invert(this.gidMap);
  }
}

export const SETTINGS = new Settings();
