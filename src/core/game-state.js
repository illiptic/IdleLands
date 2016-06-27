
import _ from 'lodash';
import constitute from 'constitute';
import { World } from './world/world';
import { Logger } from '../shared/logger';

import { PlayerLoad } from '../plugins/players/player.load';

const UPDATE_KEYS = ['x', 'y', 'map', 'gender', 'professionName', 'level', 'name', 'title'];

class GameStateInternal {
  constructor() {
    this.players = [];
    this.PlayerLoad = constitute(PlayerLoad);

    Logger.info('GameState', 'Creating world.');
    this.world = new World();
  }

  getPlayer(playerName) {
    return _.find(this.players, { name: playerName });
  }

  addPlayer(playerName) {
    return new Promise(async resolve => {
      if(this.getPlayer(playerName)) return resolve(false);
      const player = await this.retrievePlayer(playerName);

      // double check because async takes time
      if(this.getPlayer(playerName)) return resolve(false);

      this.players.push(player);
      resolve(player);
    });
  }

  delPlayer(playerName) {
    const remPlayer = _.find(this.players, { name: playerName });
    if(!remPlayer) return;
    this.players = _.without(this.players, remPlayer);

    remPlayer.isOnline = false;
    remPlayer.save();
  }

  getPlayers() {
    return this.players;
  }

  getPlayerNameSimple(playerName, keys) {
    return this.getPlayerSimple(this.retrievePlayer(playerName), keys);
  }

  getPlayerSimple(player, keys = UPDATE_KEYS) {
    keys.push('isMuted', 'isMod');
    return _.pick(player, keys);
  }

  getPlayersSimple() {
    return _.map(this.players, p => this.getPlayerSimple(p));
  }

  retrievePlayer(playerName) {
    const playerObject = _.find(this.players, { name: playerName });
    if(playerObject) return playerObject;

    return this.PlayerLoad.loadPlayer(playerName);
  }
}

export const GameState = new GameStateInternal();