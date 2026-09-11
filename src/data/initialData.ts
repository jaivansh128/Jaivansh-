import { Player, LeagueMatch } from '../types';

export const DEFAULT_PLAYERS: Player[] = [
  { id: 'p1', name: 'Jaivansh' },
  { id: 'p2', name: 'Vihan' },
  { id: 'p3', name: 'Rudr' },
  { id: 'p4', name: 'Kiyan' },
];

export const INITIAL_LEAGUE_MATCHES: LeagueMatch[] = [
  { id: 1, matchNumber: 1, p1Id: 'p1', p2Id: 'p2', p1Score: null, p2Score: null },
  { id: 2, matchNumber: 2, p1Id: 'p3', p2Id: 'p4', p1Score: null, p2Score: null },
  { id: 3, matchNumber: 3, p1Id: 'p1', p2Id: 'p3', p1Score: null, p2Score: null },
  { id: 4, matchNumber: 4, p1Id: 'p2', p2Id: 'p4', p1Score: null, p2Score: null },
  { id: 5, matchNumber: 5, p1Id: 'p1', p2Id: 'p4', p1Score: null, p2Score: null },
  { id: 6, matchNumber: 6, p1Id: 'p2', p2Id: 'p3', p1Score: null, p2Score: null },
];
